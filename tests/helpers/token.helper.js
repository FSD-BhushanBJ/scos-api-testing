import request from "supertest";
import app from "../../src/app.js";


export async function getToken() {

  const response =
    await request(app)
      .post("/api/auth/login")
      .send({

        email:"natasha@scos.com",
        password:"Admin@123"

      });

  return response.body.token;

}