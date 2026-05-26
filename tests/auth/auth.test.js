import request from "supertest";
import app from "../../src/app.js";
import { getToken } from "../helpers/token.helper.js";

const users = {

  tony: {
    email: "tony@scos.com",
    password: "wrong"
  },

  steve: {
    email: "steve@scos.com",
    password: "Admin@123"
  },

  bruce: {
    email: "bruce@scos.com",
    password: "Admin@123"
  },

  natasha: {
    email: "natasha@scos.com",
    password: "Admin@123"
  },

  hawkeye: {
    email: "hawkeye@scos.com",
    password: "Admin@123"
  },

  thor: {
    email: "thor@scos.com",
    password: "Admin@123"
  }

};

describe("AUTH APIs", () => {

  let token = "";

  beforeAll(async () => {

    token =
      await getToken();

  });


  // AUTH_01
  test("AUTH_01 Login with valid credentials", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send(users.bruce);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

  });


  // AUTH_02
  test("AUTH_02 Login invalid email", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send({
          email: "wrong@scos.com",
          password: "Admin@123"
        });

    expect(response.status)
      .toBe(400);

  });



  // AUTH_03
  test("AUTH_03 Wrong password", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send({
          email: "bruce@scos.com",
          password: "wrong123"
        });

    expect(response.status)
      .toBe(400);

  });



  // AUTH_04
  test("AUTH_04 Empty body", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send({});

    expect(
      [400, 500]
        .includes(response.status)
    )
      .toBe(true);

  });



  // AUTH_05
  test("AUTH_05 Verify token generated", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send(users.bruce);

    expect(
      response.body.token
    )
      .toBeDefined();

  });



  // AUTH_06
  test("AUTH_06 Verify user schema", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send(users.bruce);

    expect(
      response.body.user.id
    ).toBeDefined();

    expect(
      response.body.user.email
    ).toBeDefined();

    expect(
      response.body.user.full_name
    ).toBeDefined();

  });




  // AUTH_07
  test("AUTH_07 Verify institutes array", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send(users.bruce);

    expect(

      Array.isArray(
        response.body.institutes
      )

    ).toBe(true);

  });




  // AUTH_08
  test("AUTH_08 Sensitive fields hidden", async () => {

    const response =
      await request(app)
        .post("/api/auth/login")
        .send(users.bruce);

    expect(
      response.body.user.password_hash
    )
      .toBeUndefined();

  });




  // AUTH_09
  test("AUTH_09 SQL Injection", async () => {

    const response =
      await request(app)

        .post("/api/auth/login")

        .send({

          email: "' OR 1=1 --",
          password: "Admin@123"

        });

    expect(
      [400, 401]
        .includes(response.status)
    )
      .toBe(true);

  });




  // AUTH_10
  test("AUTH_10 XSS payload", async () => {

    const response =
      await request(app)

        .post("/api/auth/login")

        .send({

          email: "<script>alert(1)</script>",
          password: "Admin@123"

        });

    expect(
      [400, 401]
        .includes(response.status)
    )
      .toBe(true);

  });




  // AUTH_11
  test("AUTH_11 Tony invalid flow", async () => {

    const response =
      await request(app)

        .post("/api/auth/login")

        .send(users.tony);

    expect(response.status)
      .toBe(400);

  });




  // AUTH_12
  test("AUTH_12 Steve no institute", async () => {

    const response =
      await request(app)

        .post("/api/auth/login")

        .send(users.steve);

    expect(response.status)
      .toBe(200);

    expect(
      response.body.institutes.length
    )
      .toBe(0);

  });




  // AUTH_13
  test("AUTH_13 Steve blocked institute access", async () => {

    const response =
      await request(app)

        .post("/api/auth/select-institute")

        .set(
          "Authorization",
          `Bearer ${token}`
        )

        .send({
          institute_id: 1
        });

    console.log(response.status);
    console.log(response.body);

  });




  // AUTH_14
  test(
    "AUTH_14 Bruce dashboard flow",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send(users.bruce);

      expect(response.status)
        .toBe(200);

      expect(
        response.body.user
      )
        .toBeDefined();

      expect(
        response.body.token
      )
        .toBeDefined();

    });




  // AUTH_15
  test(
    "AUTH_15 Profile response schema",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send(users.bruce);

      expect(
        response.body
      )
        .toHaveProperty("success");

      expect(
        response.body
      )
        .toHaveProperty("token");

      expect(
        response.body
      )
        .toHaveProperty("user");

      expect(
        response.body
      )
        .toHaveProperty("institutes");

    });




  // AUTH_16
  test("AUTH_16 Natasha multi flow", async () => {

    const response =
      await request(app)

        .post("/api/auth/login")

        .send(users.natasha);

    expect(response.status)
      .toBe(200);

  });




  // AUTH_17
  test("AUTH_17 Natasha valid institute", async () => {

    const response =
      await request(app)

        .post("/api/auth/select-institute")

        .set(
          "Authorization",
          `Bearer ${token}`
        )

        .send({
          institute_id: 1
        });

    expect(response.status)
      .toBe(200);

  });




  // AUTH_18
  test("AUTH_18 Natasha invalid institute", async () => {

    const response =
      await request(app)

        .post("/api/auth/select-institute")

        .set(
          "Authorization",
          `Bearer ${token}`
        )

        .send({
          institute_id: 999999
        });

    expect(
      [400, 403]
        .includes(response.status)
    )
      .toBe(true);

  });




  // AUTH_23
  test(
    "AUTH_23 No token profile",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/select-institute")

          .send({
            institute_id: 1
          });

      expect(response.status)
        .toBe(401);

    });



  // AUTH_24
  test(
    "AUTH_24 Invalid token",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/select-institute")

          .set(
            "Authorization",
            "Bearer abc123"
          )

          .send({
            institute_id: 1
          });

      expect(response.status)
        .toBe(401);

    });




  // AUTH_25
  test(
    "AUTH_25 Tampered JWT",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/select-institute")

          .set(
            "Authorization",
            "Bearer modifiedJWT"
          )

          .send({
            institute_id: 1
          });

      expect(response.status)
        .toBe(401);

    });




  // AUTH_27
  test(
    "AUTH_27 API chaining",
    async () => {

      const login =
        await request(app)

          .post("/api/auth/login")

          .send(users.thor);

      const t =
        login.body.token;

      const response =
        await request(app)

          .post("/api/auth/select-institute")

          .set(
            "Authorization",
            `Bearer ${t}`
          )

          .send({
            institute_id: 1
          });

      expect(
        [200, 400]
          .includes(response.status)
      )
        .toBe(true);

    });




  // AUTH_29
  test("AUTH_29 Repeated requests", async () => {

    for (let i = 0; i < 5; i++) {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send(users.bruce);

      expect(response.status)
        .toBe(200);

    }

  });




  // AUTH_30
  test("AUTH_30 Response time", async () => {

    const start =
      Date.now();

    await request(app)

      .post("/api/auth/login")

      .send(users.bruce);

    const end =
      Date.now();

    expect(
      end - start
    )
      .toBeLessThan(2000);

  });

});