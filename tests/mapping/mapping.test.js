import request from "supertest";
import app from "../../src/app.js";
import { randomEmail } from "../utils/random.js";

let mappingId;
let userId;
let instituteId;
let roleId;

describe("MAPPING APIs",()=>{

beforeAll(async()=>{

// Create User
const user=
await request(app)

.post("/api/users")

.send({
first_name:"Map",
last_name:"User",
email:randomEmail(),
mobile:`9${Date.now().toString().slice(-9)}`,
password:"123456"
});

userId=
user.body.data.id;


// Create Institute
const institute=
await request(app)

.post("/api/institutes")

.send({
tenant_id:1,
name:`Institute_${Date.now()}`,
city:"Nagpur",
state:"MH",
type:"College",
subtype:"Engineering"
});

instituteId=
institute.body.data.id;


// Create Role
const role=
await request(app)

.post("/api/roles")

.send({
name:"Mapping Role",
code:`ROLE_${Date.now()}`,
icon:"admin"
});

roleId=
role.body.data.id;

});




// MAP_01
test(
"MAP_01 Create valid mapping",
async()=>{

const response=
await request(app)

.post("/api/mappings")

.send({

tenant_id:1,
user_id:userId,
institute_id:instituteId,
role_id:roleId

});

console.log(response.body);

mappingId=
response.body.data?.id;

expect(
response.status
).toBe(201);

});




// MAP_02
test(
"MAP_02 Missing tenant_id",
async()=>{

const response=
await request(app)

.post("/api/mappings")

.send({

user_id:userId,
institute_id:instituteId,
role_id:roleId

});

expect(
response.status
).toBe(400);

});




// MAP_03
test(
"MAP_03 Missing user_id",
async()=>{

const response=
await request(app)

.post("/api/mappings")

.send({

tenant_id:1,
institute_id:instituteId,
role_id:roleId

});

expect(
response.status
).toBe(400);

});




// MAP_04
test(
"MAP_04 Missing institute_id",
async()=>{

const response=
await request(app)

.post("/api/mappings")

.send({

tenant_id:1,
user_id:userId,
role_id:roleId

});

expect(
response.status
).toBe(400);

});




// MAP_05
test(
"MAP_05 Missing role_id",
async()=>{

const response=
await request(app)

.post("/api/mappings")

.send({

tenant_id:1,
user_id:userId,
institute_id:instituteId

});

expect(
response.status
).toBe(400);

});




// MAP_06
test(
"MAP_06 Empty body",
async()=>{

const response=
await request(app)

.post("/api/mappings")
.send({});

expect(
response.status
).toBe(400);

});




// MAP_07
test(
"MAP_07 Get mappings list",
async()=>{

const response=
await request(app)

.get(
"/api/mappings/all"
);

expect(
response.status
).toBe(200);

});




// MAP_08
test(
"MAP_08 Get mapping valid id",
async()=>{

const response=
await request(app)

.get(
`/api/mappings/${mappingId}`
);

expect(
response.status
).toBe(200);

});




// MAP_09
test(
"MAP_09 Invalid mapping id",
async()=>{

const response=
await request(app)

.get(
"/api/mappings/999999"
);

expect(
response.status
).toBe(404);

});




// MAP_10
test(
"MAP_10 Update valid mapping",
async()=>{

const response=
await request(app)

.put(
`/api/mappings/${mappingId}`
)

.send({

tenant_id:1,
user_id:userId,
institute_id:instituteId,
role_id:roleId

});

expect(
response.status
).toBe(200);

});




// MAP_11
test(
"MAP_11 Delete valid mapping",
async()=>{

const response=
await request(app)

.delete(
`/api/mappings/${mappingId}`
);

expect(
response.status
).toBe(200);

});

});