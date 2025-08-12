import app from "../../index.js";
import request from "supertest";
import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../../config/env";

const generateUser = () => {
  return {
    username: `adam${Math.random().toFixed(8).toString()}`,
    password: "adam123",
  };
};
describe("refresh controller test", () => {
  describe("test refresh token", () => {
    it("should refresh token successfully", async () => {
      const user = generateUser();
      const loginResponse = await request(app).post("/users/signup").send(user);
      const responseCookies = loginResponse.headers["set-cookie"];
      const refreshTokenCookie = responseCookies.find((c) =>
        c.includes("refreshToken")
      );

      const response = await request(app)
        .get("/refresh")
        .set("Cookie", refreshTokenCookie);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
    });

    describe("test refresh token with invalid token", () => {
      it("should return 401 unauthorized error if refresh token is invalid", async () => {
        const invalidRefreshToken = "Bearer invalidtoken";

        const response = await request(app)
          .get("/refresh")
          .set("Cookie", `refreshToken=${invalidRefreshToken}`);

        expect(response.status).toBe(401);
      });
    });
    it("should return 401 unauthorized error if refresh token is not provided", async () => {
      const response = await request(app).get("/refresh");
      expect(response.status).toBe(401);
    });
    describe("test refresh token with expired token", () => {
      it("should return 401 unauthorized error if refresh token is expired", async () => {
        const user = generateUser();
        const loginResponse = await request(app)
          .post("/users/signup")
          .send(user);
        const responseCookies = loginResponse.headers["set-cookie"];
        const token = responseCookies
          .find((c) => c.includes("refreshToken"))
          .split("=")[1]
          .split(";")[0]
          .split("%20")[1];
        const id = jwt.decode(token, REFRESH_TOKEN_SECRET).id;
        const expiredRefreshToken =
          "Bearer " +
          jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: "1ms" });
        const response = await request(app)
          .get("/refresh")
          .set("Cookie", `refreshToken=${expiredRefreshToken}`);
        expect(response.status).toBe(401);
      });
    });
  });
});
