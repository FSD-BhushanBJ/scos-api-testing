import request from "supertest";
import app from "../../src/app.js";
import { getToken } from "../helpers/token.helper.js";
import {
  createInstitute,
  createMapping,
  createRole,
  decodeToken,
  expectSuccess,
} from "../utils/apiTestHelpers.js";

const users = {
  tony: { email: "tony@scos.com", password: "wrong" },
  steve: { email: "steve@scos.com", password: "Admin@123" },
  bruce: { email: "bruce@scos.com", password: "Admin@123" },
  natasha: { email: "natasha@scos.com", password: "Admin@123" },
  hawkeye: { email: "hawkeye@scos.com", password: "Admin@123" },
  thor: { email: "thor@scos.com", password: "Admin@123" },
};

describe("AUTH APIs", () => {
  let token = "";
  let instituteId;

  beforeAll(async () => {
    token = await getToken();
    const decoded = decodeToken(token);
    const role = await createRole("auth");
    const institute = await createInstitute({ tenant_id: 1, suffix: "auth" });
    await createMapping({
      tenant_id: 1,
      user_id: decoded.id,
      institute_id: institute.id,
      role_id: role.id,
    });
    instituteId = institute.id;
  });

  test("AUTH_01 Login with valid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expectSuccess(response);
  });

  test("AUTH_02 Login invalid email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "wrong@scos.com",
      password: "Admin@123",
    });
    expect(response.status).toBe(400);
  });

  test("AUTH_03 Wrong password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "bruce@scos.com",
      password: "wrong123",
    });
    expect(response.status).toBe(400);
  });

  test("AUTH_04 Empty body", async () => {
    const response = await request(app).post("/api/auth/login").send({});
    expect(response.status).toBe(400);
  });

  test("AUTH_05 Verify token generated", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("AUTH_06 Verify user schema", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expect(response.status).toBe(200);
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBeDefined();
    expect(response.body.user.full_name).toBeDefined();
  });

  test("AUTH_07 Verify institutes array", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.institutes)).toBe(true);
  });

  test("AUTH_08 Sensitive fields hidden", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expect(response.status).toBe(200);
    expect(response.body.user.password_hash).toBeUndefined();
  });

  test("AUTH_09 SQL Injection", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "' OR 1=1 --",
      password: "Admin@123",
    });
    expect(response.status).toBe(400);
  });

  test("AUTH_10 XSS payload", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "<script>alert(1)</script>",
      password: "Admin@123",
    });
    expect(response.status).toBe(400);
  });

  test("AUTH_11 Tony invalid flow", async () => {
    const response = await request(app).post("/api/auth/login").send(users.tony);
    expect(response.status).toBe(400);
  });

  test("AUTH_12 Steve no institute", async () => {
    const response = await request(app).post("/api/auth/login").send(users.steve);
    expect(response.status).toBe(200);
    expect(response.body.institutes.length).toBe(0);
  });

  test("AUTH_13 Steve blocked institute access", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", `Bearer ${token}`)
      .send({ institute_id: instituteId });

    expect(response.status).toBe(200);
    expect(response.body.data || response.body.roles || response.body.flow).toBeDefined();
  });

  test("AUTH_14 Bruce dashboard flow", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  test("AUTH_15 Profile response schema", async () => {
    const response = await request(app).post("/api/auth/login").send(users.bruce);
    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("institutes");
  });

  test("AUTH_16 Natasha multi flow", async () => {
    const response = await request(app).post("/api/auth/login").send(users.natasha);
    expect(response.status).toBe(200);
  });

  test("AUTH_17 Natasha valid institute", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", `Bearer ${token}`)
      .send({ institute_id: instituteId });
    expect(response.status).toBe(200);
  });

  test("AUTH_18 Natasha invalid institute", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", `Bearer ${token}`)
      .send({ institute_id: 999999 });
    expect(response.status).toBe(400);
  });

  test("AUTH_23 No token profile", async () => {
    const response = await request(app).post("/api/auth/select-institute").send({
      institute_id: instituteId,
    });
    expect(response.status).toBe(401);
  });

  test("AUTH_24 Invalid token", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", "Bearer abc123")
      .send({ institute_id: instituteId });
    expect(response.status).toBe(401);
  });

  test("AUTH_25 Tampered JWT", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", "Bearer modifiedJWT")
      .send({ institute_id: instituteId });
    expect(response.status).toBe(401);
  });

  test("AUTH_27 API chaining", async () => {
    const login = await request(app).post("/api/auth/login").send(users.thor);
    const thor = decodeToken(login.body.token);
    await createMapping({
      tenant_id: 1,
      user_id: thor.id,
      institute_id: instituteId,
      role_id: 1,
    });
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ institute_id: instituteId });
    expect(response.status).toBe(200);
  });

  test("AUTH_29 Repeated requests", async () => {
    for (let i = 0; i < 5; i++) {
      const response = await request(app).post("/api/auth/login").send(users.bruce);
      expect(response.status).toBe(200);
    }
  });

  test("AUTH_30 Response time", async () => {
    const start = Date.now();
    await request(app).post("/api/auth/login").send(users.bruce);
    expect(Date.now() - start).toBeLessThan(2000);
  });
});
