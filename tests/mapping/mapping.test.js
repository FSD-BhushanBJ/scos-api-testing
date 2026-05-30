import request from "supertest";
import app from "../../src/app.js";
import { createInstitute, createMapping, createRole, createTenant, createUser } from "../utils/apiTestHelpers.js";

describe("MAPPING APIs", () => {
  let mapping;
  let user;
  let institute;
  let role;
  let tenant;

  beforeAll(async () => {
    tenant = await createTenant("mapping");
    user = await createUser({ first_name: "Map", last_name: "User" });
    institute = await createInstitute({ tenant_id: tenant.id, suffix: "mapping" });
    role = await createRole("mapping");
    mapping = await createMapping({
      tenant_id: tenant.id,
      user_id: user.id,
      institute_id: institute.id,
      role_id: role.id,
    });
  });

  test("MAP_01 Create valid mapping", async () => {
    expect(mapping.id).toBeDefined();
  });

  test("MAP_02 Missing tenant_id", async () => {
    const response = await request(app).post("/api/mappings").send({
      user_id: user.id,
      institute_id: institute.id,
      role_id: role.id,
    });
    expect(response.status).toBe(400);
  });

  test("MAP_03 Missing user_id", async () => {
    const response = await request(app).post("/api/mappings").send({
      tenant_id: tenant.id,
      institute_id: institute.id,
      role_id: role.id,
    });
    expect(response.status).toBe(400);
  });

  test("MAP_04 Missing institute_id", async () => {
    const response = await request(app).post("/api/mappings").send({
      tenant_id: tenant.id,
      user_id: user.id,
      role_id: role.id,
    });
    expect(response.status).toBe(400);
  });

  test("MAP_05 Missing role_id", async () => {
    const response = await request(app).post("/api/mappings").send({
      tenant_id: tenant.id,
      user_id: user.id,
      institute_id: institute.id,
    });
    expect(response.status).toBe(400);
  });

  test("MAP_06 Empty body", async () => {
    const response = await request(app).post("/api/mappings").send({});
    expect(response.status).toBe(400);
  });

  test("MAP_07 Get mappings list", async () => {
    const response = await request(app).get("/api/mappings/all");
    expect(response.status).toBe(200);
  });

  test("MAP_08 Get mapping valid id", async () => {
    const response = await request(app).get(`/api/mappings/${mapping.id}`);
    expect(response.status).toBe(200);
  });

  test("MAP_09 Invalid mapping id", async () => {
    const response = await request(app).get("/api/mappings/999999");
    expect(response.status).toBe(404);
  });

  test("MAP_10 Update valid mapping", async () => {
    const response = await request(app).put(`/api/mappings/${mapping.id}`).send({
      tenant_id: tenant.id,
      user_id: user.id,
      institute_id: institute.id,
      role_id: role.id,
    });
    expect(response.status).toBe(200);
  });

  test("MAP_11 Delete valid mapping", async () => {
    const response = await request(app).delete(`/api/mappings/${mapping.id}`);
    expect(response.status).toBe(200);
  });
});
