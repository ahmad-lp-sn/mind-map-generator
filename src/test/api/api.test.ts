import request from "supertest";
import { Express } from "express";
import { app as appPromise } from "../../app";

describe("API Tests", () => {
  it("should return a successful response", async () => {
    const app = (await appPromise) as Express;
    const response = await request(app).get("/api/v1/patchs?limit=1");

    expect(response.status).toBe(200);
  });

  it("should handle errors", async () => {
    const app = (await appPromise) as Express;
    const response = await request(app).get("/api/v1/mind-maps/invalid-id");

    expect(response.status).toBe(404);
  });
});
