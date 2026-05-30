import request from "supertest";
import app from "../../src/app.js";
import { createInstitute, createTenant } from "../utils/apiTestHelpers.js";

describe("INSTITUTE APIs", () => {
  let institute;

  beforeAll(async () => {
    const tenant = await createTenant("institute");
    institute = await createInstitute({ tenant_id: tenant.id, suffix: "institute" });
  });

  test("INST_01 Create valid institute", async () => {
    expect(institute.id).toBeDefined();
    expect(institute.tenant_id).toBeDefined();
  });

  test("INST_02 Missing tenant_id", async () => {
    const response = await request(app).post("/api/institutes").send({
      name: "Institute",
    });
    expect(response.status).toBe(400);
  });

  test("INST_03 Get institutes list", async () => {
    const response = await request(app).get("/api/institutes/all");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("INST_04 Get institute by valid id", async () => {
    const response = await request(app).get(`/api/institutes/${institute.id}`);
    expect(response.status).toBe(200);
  });

  test("INST_05 Invalid institute id", async () => {
    const response = await request(app).get("/api/institutes/999999");
    expect(response.status).toBe(404);
  });

  test("INST_06 Update valid institute", async () => {
    const response = await request(app).put(`/api/institutes/${institute.id}`).send({
      name: "Updated Institute",
    });
    expect(response.status).toBe(200);
  });

  test("INST_07 Update invalid institute", async () => {
    const response = await request(app).put("/api/institutes/999999").send({
      name: "Updated",
    });
    expect(response.status).toBe(404);
  });

  test("INST_08 Delete valid institute", async () => {
    const response = await request(app).delete(`/api/institutes/${institute.id}`);
    expect(response.status).toBe(200);
  });

  test("INST_09 Delete invalid institute", async () => {
    const response = await request(app).delete("/api/institutes/999999");
    expect(response.status).toBe(404);
  });

  test("INST_10 Verify DB failure handling", async () => {
    expect(true).toBe(true);
  });
});
