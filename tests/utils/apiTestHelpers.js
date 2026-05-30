import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../src/app.js";
import { randomEmail } from "./random.js";

const TOKEN_SECRET = "secretkey123";

export const createTenant = async (suffix = Date.now()) => {
  const response = await request(app).post("/api/tenants").send({
    name: `Tenant_${suffix}`,
    code: `TENANT_${suffix}`,
  });

  expect(response.status).toBe(201);
  return response.body.data;
};

export const createInstitute = async ({
  tenant_id,
  suffix = Date.now(),
} = {}) => {
  const response = await request(app).post("/api/institutes").send({
    tenant_id,
    name: `Institute_${suffix}`,
    code: `INST_${suffix}`,
    city: "Nagpur",
    state: "Maharashtra",
    type: "College",
    subtype: "Engineering",
  });

  expect(response.status).toBe(201);
  return response.body.data;
};

export const createRole = async (suffix = Date.now()) => {
  const response = await request(app).post("/api/roles").send({
    name: `Role_${suffix}`,
    code: `ROLE_${suffix}`,
    description: "Auto generated role",
  });

  expect(response.status).toBe(201);
  return response.body.data;
};

export const createUser = async (overrides = {}) => {
  const payload = {
    first_name: "Test",
    last_name: "User",
    email: randomEmail(),
    mobile: `9${Date.now().toString().slice(-9)}`,
    password: "123456",
    ...overrides,
  };

  const response = await request(app).post("/api/users").send(payload);

  expect(response.status).toBe(200);
  return response.body.data;
};

export const createMapping = async ({
  tenant_id,
  user_id,
  institute_id,
  role_id,
}) => {
  const response = await request(app).post("/api/mappings").send({
    tenant_id,
    user_id,
    institute_id,
    role_id,
  });

  expect(response.status).toBe(201);
  return response.body.data;
};

export const decodeToken = (token) => jwt.verify(token, TOKEN_SECRET);

export const expectSuccess = (response) => {
  expect(response.status).toBeLessThan(400);
  expect(response.body.success).toBe(true);
};
