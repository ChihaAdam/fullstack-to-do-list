describe("users controller test", () => {
  describe("test sign up", () => {
    const body = {
      username: `adam${Math.random().toFixed(8).toString()}`,
      password: "adam123",
    };
    it("should return 201 response and an access token  deleted", async () => {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      expect(response.status).toBe(201);
      expect(data).toHaveProperty("accessToken");
    });
    it("should login successfully", async () => {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toHaveProperty("accessToken");
    });
  });
});
