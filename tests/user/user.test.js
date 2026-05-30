import request from "supertest";
import app from "../../src/app.js";
import { createUser } from "../utils/apiTestHelpers.js";
import { randomEmail } from "../utils/random.js";

describe("USER APIs", () => {
  let createdUser;
  let duplicateEmail;

  beforeAll(async () => {
    duplicateEmail = randomEmail();
    createdUser = await createUser({ email: duplicateEmail, first_name: "Bhushan", last_name: "Test" });
  });

  test("USER_01 Create valid user", async () => {
    expect(createdUser.id).toBeDefined();
  });

  test("USER_02 Create user missing first_name", async () => {
    const response = await request(app).post("/api/users").send({
      email: randomEmail(),
      password: "123456",
    });
    expect(response.status).toBe(400);
  });

  test("USER_03 Create user missing email", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Test",
      password: "123456",
    });
    expect(response.status).toBe(400);
  });

  test("USER_04 Create user missing password", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Test",
      email: randomEmail(),
    });
    expect(response.status).toBe(400);
  });

  test("USER_05 Create duplicate email user", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Bhushan",
      email: duplicateEmail,
      password: "123456",
    });
    expect(response.status).toBe(400);
  });

  test("USER_06 Create user empty body", async () => {
    const response = await request(app).post("/api/users").send({});
    expect(response.status).toBe(400);
  });

  test("USER_07 Verify password hashing", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Hash",
      email: randomEmail(),
      password: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.body.data.password_hash).toBeUndefined();
  });

  test("USER_08 Verify password hash hidden", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Hide",
      email: randomEmail(),
      password: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.body.data.password_hash).toBeUndefined();
  });

  test("USER_09 Verify full_name generated", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: "Bhushan",
      last_name: "Jatgade",
      email: randomEmail(),
      password: "123456",
    });
    expect(response.body.data.full_name).toBe("Bhushan Jatgade");
  });

  test("USER_10 Get users list", async () => {
    const response = await request(app).get("/api/users/all");
    expect(response.status).toBe(200);
  });

  test("USER_11 Get user by valid id", async () => {
    const response = await request(app).get(`/api/users/${createdUser.id}`);
    expect(response.status).toBe(200);
  });
});
