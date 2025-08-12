import request from "supertest";
import app from "../../index.js";
const body = {
  username: `adam${Math.random().toFixed(8).toString()}`,
  password: "adam123",
};
describe("users controller test", () => {
  describe("test sign up", () => {
    it("should return 201 response and an access and refresh token", async () => {
      const response = await request(app).post("/users/signup").send(body);

      const responseBody = response.body;
      const responseCookies = response.headers["set-cookie"];

      expect(response.status).toBe(201);

      expect(responseBody).toHaveProperty("accessToken");
      expect(responseCookies.some((c) => c.includes("refreshToken"))).toBe(
        true
      );
    });
    it("should return 409 duplication error", async () => {
      const badResponse = await request(app).post("/users/signup").send(body);
      expect(badResponse.status).toBe(409);
    });
  });
  describe("test log in ", () => {
    it("should login successfully", async () => {
      const response = await request(app).post("/users/login").send(body);

      const responseBody = response.body;
      const responseCookies = response.headers["set-cookie"];

      expect(response.status).toBe(200);

      expect(responseBody).toHaveProperty("accessToken");
      expect(responseCookies.some((c) => c.includes("refreshToken"))).toBe(
        true
      );
    });
    it("should return 401 unauthorized error", async () => {
      const badResponse = await request(app)
        .post("/users/login")
        .send({ ...body, password: "invalid" });
      expect(badResponse.status).toBe(401);
    });
  });
  describe("test signout", () => {
    it("should sigout successfully", async () => {
      const response = await request(app).get("/users/signout");
      expect(response.status).toBe(200);
    });
  });
});
