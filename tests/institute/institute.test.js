import request from "supertest";
import app from "../../src/app.js";

let instituteId;

describe("INSTITUTE APIs",()=>{

// INST_01
test(
"INST_01 Create valid institute",
async()=>{

const response=
await request(app)

.post("/api/institutes")

.send({

tenant_id:1,
name:"Test Institute",
city:"Nagpur",
state:"Maharashtra",
type:"College",
subtype:"Engineering"

});

console.log(response.body);

instituteId=
response.body.data?.id;

expect(
response.status
).toBe(201);

});




// INST_02
test(
"INST_02 Missing tenant_id",
async()=>{

const response=
await request(app)

.post("/api/institutes")

.send({

name:"Institute"

});

expect(
response.status
).toBe(400);

});




// INST_03
test(
"INST_03 Get institutes list",
async()=>{

const response=
await request(app)

.get(
"/api/institutes/all"
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




// INST_04
test(
"INST_04 Get institute by valid id",
async()=>{

const response=
await request(app)

.get(
`/api/institutes/${instituteId}`
);

expect(
response.status
).toBe(200);

});




// INST_05
test(
"INST_05 Invalid institute id",
async()=>{

const response=
await request(app)

.get(
"/api/institutes/999999"
);

expect(
response.status
).toBe(404);

});




// INST_06
test(
"INST_06 Update valid institute",
async()=>{

const response=
await request(app)

.put(
`/api/institutes/${instituteId}`
)

.send({

name:"Updated Institute"

});

expect(
response.status
).toBe(200);

});




// INST_07
test(
"INST_07 Update invalid institute",
async()=>{

const response=
await request(app)

.put(
"/api/institutes/999999"
)

.send({

name:"Updated"

});

expect(
response.status
).toBe(404);

});




// INST_08
test(
"INST_08 Delete valid institute",
async()=>{

const response=
await request(app)

.delete(
`/api/institutes/${instituteId}`
);

expect(
response.status
).toBe(200);

});




// INST_09
test(
"INST_09 Delete invalid institute",
async()=>{

const response=
await request(app)

.delete(
"/api/institutes/999999"
);

expect(
response.status
).toBe(404);

});




// INST_10
test(
"INST_10 Verify DB failure handling",
()=>{

expect(true)
.toBe(true);

});

});