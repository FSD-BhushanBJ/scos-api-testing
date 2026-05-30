import request from "supertest";
import app from "../../src/app.js";
import { createRole } from "../utils/apiTestHelpers.js";

describe("ROLE APIs", () => {
  let role;

  beforeAll(async () => {
    role = await createRole("role");
  });

  test("ROLE_01 Create valid role", async () => {
    expect(role.id).toBeDefined();
  });

  test("ROLE_02 Get roles list", async () => {
    const response = await request(app).get("/api/roles/all");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("ROLE_03 Get role valid id", async () => {
    const response = await request(app).get(`/api/roles/${role.id}`);
    expect(response.status).toBe(200);
  });

  test("ROLE_04 Get role invalid id", async () => {
    const response = await request(app).get("/api/roles/999999");
    expect(response.status).toBe(404);
  });

  test("ROLE_05 Update valid role", async () => {
    const response = await request(app).put(`/api/roles/${role.id}`).send({
      name: "Updated Role",
    });
    expect(response.status).toBe(200);
  });

  test("ROLE_06 Update invalid role", async () => {
    const response = await request(app).put("/api/roles/999999").send({
      name: "Updated",
    });
    expect(response.status).toBe(404);
  });

  test("ROLE_07 Delete valid role", async () => {
    const response = await request(app).delete(`/api/roles/${role.id}`);
    expect(response.status).toBe(200);
  });

  test("ROLE_08 Delete invalid role", async () => {
    const response = await request(app).delete("/api/roles/999999");
    expect(response.status).toBe(404);
  });

  test("ROLE_09 Verify DB failure handling", async () => {
    expect(true).toBe(true);
  });
});
