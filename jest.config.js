export default {

testEnvironment:"node",

setupFilesAfterEnv:[
"./tests/setup/setup.js"
],

globalTeardown:
"./tests/setup/teardown.js"

};