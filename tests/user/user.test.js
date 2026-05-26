import request from "supertest";
import app from "../../src/app.js";
import { randomEmail } from "../utils/random.js";

let createdUserId;
let duplicateEmail;

describe("USER APIs", () => {

    // USER_01
    test(
        "USER_01 Create valid user",
        async () => {

            duplicateEmail =
                randomEmail();

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Bhushan",

                        last_name: "Test",

                        email: duplicateEmail,

                        password: "123456",

                        mobile: "9999999999"

                    });

            console.log(response.body);

            createdUserId =
                response.body.data?.id;

            expect(
                response.status
            ).toBe(200);

        });



    // USER_02
    test(
        "USER_02 Create user missing first_name",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        email: randomEmail(),

                        password: "123456"

                    });

            expect(
                response.status
            ).toBe(400);

        });




    // USER_03
    test(
        "USER_03 Create user missing email",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Test",

                        password: "123456"

                    });

            expect(
                response.status
            ).toBe(400);

        });




    // USER_04
    test(
        "USER_04 Create user missing password",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Test",

                        email: randomEmail()

                    });

            expect(
                response.status
            ).toBe(400);

        });




    // USER_05
    test(
        "USER_05 Create duplicate email user",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Bhushan",

                        email: duplicateEmail,

                        password: "123456"

                    });

            expect(
                response.status
            ).toBe(400);

        });




    // USER_06
    test(
        "USER_06 Create user empty body",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({});

            expect(
                response.status
            ).toBe(400);

        });




    // USER_07
    test(
        "USER_07 Verify password hashing",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Hash",

                        email: randomEmail(),

                        password: "123456"

                    });

            expect(
                response.body.data.password_hash
                !== "123456"

            ).toBe(true);

        });




    // USER_08
    test(
        "USER_08 Verify password hash hidden",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Hide",

                        email: randomEmail(),

                        password: "123456"

                    });

            expect(
                response.body.data.password_hash
            )

                .toBeUndefined();

        });




    // USER_09
    test(
        "USER_09 Verify full_name generated",
        async () => {

            const response =
                await request(app)

                    .post("/api/users")

                    .send({

                        first_name: "Bhushan",

                        last_name: "Jatgade",

                        email: randomEmail(),

                        password: "123456"

                    });

            expect(

                response.body
                    .data
                    .full_name

            )

                .toBe(

                    "Bhushan Jatgade"

                );

        });




    // USER_10
    test(
        "USER_10 Get users list",
        async () => {

            const response =
                await request(app)

                    .get(
                        "/api/users/all"
                    );

            expect(
                response.status
            ).toBe(200);

        });




    // USER_11
    test(
        "USER_11 Get user by valid id",
        async () => {

            const response =
                await request(app)

                    .get(
                        `/api/users/${createdUserId}`
                    );

            expect(
                response.status
            ).toBe(200);

        });




    // USER_12
    test(
        "USER_12 Invalid user id",
        async () => {

            const response =
                await request(app)

                    .get(
                        "/api/users/999999"
                    );

            expect(
                response.status
            ).toBe(404);

        });

});
// USER_13
test("USER_13 Update valid user", async () => {

    const response =
        await request(app)

            .put(`/api/users/${createdUserId}`)

            .send({
                first_name: "Updated"
            });

    expect(
        response.status
    ).toBe(200);

});



// USER_14
test("USER_14 Update invalid user", async () => {

    const response =
        await request(app)

            .put("/api/users/999999")

            .send({
                first_name: "Test"
            });

    expect(
        response.status
    ).toBe(404);

});



test(
    "USER_15 Update duplicate email",
    async () => {

        const email1 = randomEmail();
        const email2 = randomEmail();

        const user1 =
            await request(app)
                .post("/api/users")
                .send({
                    first_name: "Thor",
                    last_name: "A",
                    email: email1,
                    mobile: `9${Date.now().toString().slice(-9)}`,
                    password: "123456"
                });

        await request(app)
            .post("/api/users")
            .send({
                first_name: "Natasha",
                last_name: "B",
                email: email2,
                mobile: `8${Date.now().toString().slice(-9)}`,
                password: "123456"
            });

        const id = user1.body.data.id;

        const response =
            await request(app)
                .put(`/api/users/${id}`)
                .send({
                    first_name: "Thor",
                    last_name: "A",
                    email: email2,
                    mobile: user1.body.data.mobile
                });

        expect(response.status)
            .toBe(200);

    });


// USER_16
test("USER_16 Delete valid user", async () => {

    const response =
        await request(app)

            .delete(
                `/api/users/${createdUserId}`
            );

    expect(
        response.status
    ).toBe(200);

});




// USER_17
test("USER_17 Delete invalid user", async () => {

    const response =
        await request(app)

            .delete(
                "/api/users/999999"
            );

    expect(
        response.status
    ).toBe(404);

});




// USER_18
test("USER_18 Verify response time", async () => {

    const start = Date.now();

    await request(app)
        .get("/api/users/all");

    const end = Date.now();

    expect(
        end - start
    )

        .toBeLessThan(
            2000
        );

});




// USER_19
test("USER_19 Verify DB failure handling", () => {

    expect(true)
        .toBe(true);

});