import request from "supertest";
import { describe,it,expect } from "vitest";
import app from "../../index.js";
const generateUser = () => {
  return {
    username: `adam${Math.random().toFixed(8).toString()}`,
    password: "adam123",
  };
};
describe("users controller test", () => {
  describe("test sign up", () => {
    it("should signup successfully", async () => {
      const response = await request(app)
        .post("/users/signup")
        .send(generateUser());

      const responseBody = response.body;
      const responseCookies = response.headers["set-cookie"];

      expect(response.status).toBe(201);

      expect(responseBody).toHaveProperty("accessToken");
      expect(responseCookies.some((c) => c.includes("refreshToken"))).toBe(
        true
      );
    });
    it("should return 409 duplication error", async () => {
      const duplicate = generateUser();
      await request(app).post("/users/signup").send(duplicate);
      const badResponse = await request(app)
        .post("/users/signup")
        .send(duplicate);
      expect(badResponse.status).toBe(409);
    });
  });
  describe("test log in ", () => {
    it("should login successfully", async () => {
      const user = generateUser();
      await request(app).post("/users/signup").send(user);
      const response = await request(app).post("/users/login").send(user);

      const responseBody = response.body;
      const responseCookies = response.headers["set-cookie"];

      expect(response.status).toBe(200);

      expect(responseBody).toHaveProperty("accessToken");
      expect(responseCookies.some((c) => c.includes("refreshToken"))).toBe(
        true
      );
    });
    it("should return 401 unauthorized error", async () => {
      const invalidUser = generateUser();
      const badResponse = await request(app)
        .post("/users/login")
        .send(invalidUser);
      expect(badResponse.status).toBe(401);
    });
  });
  describe("test signout", () => {
    it("should sigout successfully", async () => {
      const response = await request(app).get("/users/signout");
      expect(response.status).toBe(200);
    });
  });
  describe("delete user", () => {
    it("should delete successfully", async () => {
      const user = generateUser();
      const userCreated = await request(app).post("/users/signup").send(user);
      const response = await request(app).delete("/users").set('Authorization',userCreated.body.accessToken)
      expect(response.status).toBe(200)
    });
  });
  describe("update user info",()=>{
    it('should have another username and password',async ()=>{
      const oldUserInfo = generateUser()
      const newUserInfo = generateUser()
      const {body:{accessToken}}=await request(app).post('/users/signup').send(oldUserInfo)
      const response = (await request(app).patch('/users').set('Authorization',accessToken).send(newUserInfo))
      const badLogin = await request(app).post('/users/login').send(oldUserInfo)
      const goodLogin = await request(app).post('/users/login').send(newUserInfo)
      expect(response.status).toBe(200)
      expect(goodLogin.status).toBe(200)
      expect(badLogin.status).toBe(401)
    })
  })
});
