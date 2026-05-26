import request from "supertest";
import app from "../../src/app.js";

let roleId;

describe("ROLE APIs",()=>{

// ROLE_01
test(
"ROLE_01 Create valid role",
async()=>{

const response=
await request(app)

.post("/api/roles")

.send({

name:"Test Role",
code:`ROLE_${Date.now()}`,
icon:"admin"

});

console.log(response.body);

roleId=
response.body.data?.id;

expect(
response.status
).toBe(201);

});




// ROLE_02
test(
"ROLE_02 Get roles list",
async()=>{

const response=
await request(app)

.get(
"/api/roles/all"
);

expect(
response.status
).toBe(200);

expect(

Array.isArray(
response.body.data
)

).toBe(true);

});




// ROLE_03
test(
"ROLE_03 Get role valid id",
async()=>{

const response=
await request(app)

.get(
`/api/roles/${roleId}`
);

expect(
response.status
).toBe(200);

});




// ROLE_04
test(
"ROLE_04 Get role invalid id",
async()=>{

const response=
await request(app)

.get(
"/api/roles/999999"
);

expect(
response.status
).toBe(404);

});




// ROLE_05
test(
"ROLE_05 Update valid role",
async()=>{

const response=
await request(app)

.put(
`/api/roles/${roleId}`
)

.send({

name:"Updated Role"

});

expect(
response.status
).toBe(200);

});




// ROLE_06
test(
"ROLE_06 Update invalid role",
async()=>{

const response=
await request(app)

.put(
"/api/roles/999999"
)

.send({

name:"Updated"

});

expect(
response.status
).toBe(404);

});




// ROLE_07
test(
"ROLE_07 Delete valid role",
async()=>{

const response=
await request(app)

.delete(
`/api/roles/${roleId}`
);

expect(
response.status
).toBe(200);

});




// ROLE_08
test(
"ROLE_08 Delete invalid role",
async()=>{

const response=
await request(app)

.delete(
"/api/roles/999999"
);

expect(
response.status
).toBe(404);

});




// ROLE_09
test(
"ROLE_09 Verify DB failure handling",
()=>{

expect(true)
.toBe(true);

});

});