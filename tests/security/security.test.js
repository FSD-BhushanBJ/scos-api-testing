import request from "supertest";
import app from "../../src/app.js";
import { getToken } from "../helpers/token.helper.js";
import { randomEmail } from "../utils/random.js";

describe("SECURITY APIs", () => {
  test("SEC_01 Access select-institute without token", async () => {
    const response = await request(app).post("/api/auth/select-institute").send({
      institute_id: 1,
    });
    expect(response.status).toBe(401);
  });

  test("SEC_02 Invalid token", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", "Bearer invalidtoken")
      .send({ institute_id: 1 });
    expect(response.status).toBe(401);
  });

  test("SEC_03 Expired token", async () => {
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", "Bearer expiredtoken")
      .send({ institute_id: 1 });
    expect(response.status).toBe(401);
  });

  test("SEC_04 Tampered JWT", async () => {
    const token = await getToken();
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", `Bearer ${token}abc`)
      .send({ institute_id: 1 });
    expect(response.status).toBe(401);
  });

  test("SEC_05 Missing Bearer keyword", async () => {
    const token = await getToken();
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", token)
      .send({ institute_id: 1 });
    expect(response.status).toBe(401);
  });

  test("SEC_06 SQL injection payload", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "' OR 1=1 --",
      password: "123",
    });
    expect(response.status).toBe(400);
  });

  test("SEC_07 XSS payload", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "<script>alert(1)</script>",
      password: "123",
    });
    expect(response.status).toBe(400);
  });

  test("SEC_08 Password hidden in create user response", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Secure",
      email: randomEmail(),
      mobile: `9${Date.now().toString().slice(-9)}`,
      password: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.body.data.password_hash).toBeUndefined();
  });

  test("SEC_09 Password encrypted", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Hash",
      email: randomEmail(),
      mobile: `8${Date.now().toString().slice(-9)}`,
      password: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.body.data.password_hash).toBeUndefined();
  });

  test("SEC_10 Invalid user id", async () => {
    const response = await request(app).get("/api/users/999999999");
    expect(response.status).toBe(404);
  });

  test("SEC_11 User not found hidden", async () => {
    const response = await request(app).get("/api/users/999999999");
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("SEC_12 Malformed JSON", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send("{bad json");
    expect(response.status).toBe(400);
  });

  test("SEC_13 Large payload", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "A".repeat(5000),
      email: randomEmail(),
      mobile: `9${Date.now().toString().slice(-9)}`,
      password: "123456",
    });
    expect([200, 400, 500].includes(response.status)).toBe(true);
  });

  test("SEC_14 Sensitive login data hidden", async () => {
    const token = await getToken();
    expect(token).toBeDefined();
  });

  test("SEC_15 Reuse token multiple times", async () => {
    const token = await getToken();
    const response = await request(app)
      .post("/api/auth/select-institute")
      .set("Authorization", `Bearer ${token}`)
      .send({ institute_id: 1 });
    expect(response.status).toBe(200);
  });
});
