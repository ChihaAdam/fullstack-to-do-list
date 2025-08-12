import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../index.js";

const generateUser = () => {
  return {
    username: `adam${Math.random().toFixed(8).toString()}`,
    password: "adam123",
  };
};
describe("todo controller test", () => {
  describe("test add todo", () => {
    it("should add todo successfully", async () => {
      const user = generateUser();
      const loginResponse = await request(app).post("/users/signup").send(user);
      const token = loginResponse.body.accessToken;
      const response = await request(app)
        .post("/todos")
        .set("Authorization", token)
        .send({ title: "Test Todo", description: "This is a test todo" });

      expect(response.status).toBe(201);
    });
  });
  describe("test get all todos", () => {
    it("should get all todos successfully", async () => {
      const user = generateUser();
      const loginResponse = await request(app).post("/users/signup").send(user);
      const token = loginResponse.body.accessToken;
      const response = await request(app)
        .get("/todos")
        .set("Authorization", token);

      expect(response.status).toBe(200);
      expect(response.body.todos).toBeInstanceOf(Array);
    });
  });
  describe("test search todo", () => {
    it("should search todo successfully", async () => {
      const user = generateUser();
      const loginResponse = await request(app).post("/users/signup").send(user);
      const token = loginResponse.body.accessToken;
      const response = await request(app)
        .get("/todos/search?searchTerm=Test")
        .set("Authorization", token);

      expect(response.status).toBe(200);
      expect(response.body.todos).toBeInstanceOf(Array);
    });
  });
  describe("test update todo", () => {
    it("should update todo successfully", async () => {
      const user = generateUser();
      const loginResponse = await request(app).post("/users/signup").send(user);
      const token = loginResponse.body.accessToken;
      const todoResponse = await request(app)
        .post("/todos")
        .set("Authorization", token)
        .send({ title: "Todo to Update", description: "Update this todo" });

      const todoId = todoResponse.body.id;
      const response = await request(app)
        .patch("/todos")
        .set("Authorization", token)
        .send({ id: todoId, updates: { title: "Updated Todo" } });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("todo updated successfully");
    });
  });
  describe("test delete todo", () => {
    it("should delete todo successfully", async () => {
      const user = generateUser();
      const loginResponse = await request(app).post("/users/signup").send(user);
      const token = loginResponse.body.accessToken;
      const todoResponse = await request(app)
        .post("/todos")
        .set("Authorization", token)
        .send({ title: "Todo to Delete", description: "Delete this todo" });

      const todoId = todoResponse.body.id;
      const response = await request(app)
        .delete("/todos" + `/${todoId}`)
        .set("Authorization", token);
      const deleted = await request(app)
        .get("/todos?searchTerm=Todo to Delete")
        .set("Authorization", token);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("todo deleted successfully");
      expect(deleted.body.todos).toHaveLength(0);
    });
  });
});
