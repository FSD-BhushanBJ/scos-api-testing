# Exercise - 6 :- SCOS Backend API Automation Testing Framework

## Overview

SCOS Backend API Automation Testing Framework is a structured and scalable API testing project developed using Jest and SuperTest. The framework validates authentication flows, CRUD operations, business workflows, security scenarios, and response validations for backend APIs.

The framework follows a modular architecture and focuses on delivering reliable automated validation for multiple backend modules through positive, negative, integration, security, and flow-based test scenarios.

The project is designed to improve API quality, ensure application stability, reduce manual testing effort, and support continuous validation during development.

---
# Test Case Documentation

Detailed API test cases and execution scenarios used during automation testing:

Test Case Sheet:  
[https://docs.google.com/spreadsheets/d/12tmgKebzpmFQhjoaGY85iIC7Erp-8IMcKOVg7qWu1mk/edit?usp=sharing]

The test case document includes:

- Authentication Test Cases
- User Test Cases
- Institute Test Cases
- Role Test Cases
- Mapping Test Cases
- Security Test Cases
- Flow-Based User Scenarios
- API Chaining Scenarios
- Validation Test Cases
- Response Schema Validation
- Performance Test Cases

---

# Test Case Coverage Summary

| Module | Total Test Cases |
|----------|----------------|
| Authentication | 33 |
| User | 19 |
| Institute | 10 |
| Role | 9 |
| Mapping | 11 |
| Security | 15 |

Total Automated Test Cases: 97+


## Objectives

- Validate REST API functionality
- Verify authentication and authorization mechanisms
- Test complete CRUD operations
- Validate response schemas
- Test user journey flows
- Execute API chaining scenarios
- Verify business rules
- Perform security testing
- Validate application performance
- Ensure backend stability and reliability

---

## Technology Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| PostgreSQL | Database |
| Jest | Test Runner |
| SuperTest | API Testing Library |
| JWT | Authentication |
| dotenv | Environment Variables |

---

# Project Architecture

```text
exercise-two-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── institute.controller.js
│   │   ├── role.controller.js
│   │   └── mapping.controller.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── auth/
│   ├── user/
│   ├── institute/
│   ├── role/
│   ├── mapping/
│   ├── security/
│   ├── helpers/
│   └── setup/
│
├── package.json
├── jest.config.js
├── .env.example
└── README.md
```

---

# Implemented Modules

## Authentication Module

Authentication module validates:

- Login functionality
- Invalid credential handling
- Token generation
- JWT validation
- Institute selection
- User authorization
- Token validation
- API chaining
- Response schema validation
- Authentication workflow handling

---

## User Module

User module validates:

- User creation
- Required field validations
- Duplicate email validation
- Password encryption
- Password visibility restrictions
- Update functionality
- Delete functionality
- Database validations
- Error handling

---

## Institute Module

Institute module validates:

- Create institute
- Get institute list
- Get institute by ID
- Update institute
- Delete institute
- Invalid request handling
- Database validations

---

## Role Module

Role module validates:

- Role creation
- Get roles
- Update role
- Delete role
- Invalid role handling

---

## Mapping Module

Mapping module validates:

- Create mappings
- Required field validations
- Read mappings
- Update mappings
- Delete mappings

---

## Security Module

Security module validates:

- Unauthorized access
- Invalid JWT token
- Expired token handling
- Tampered JWT validation
- SQL Injection prevention
- XSS payload handling
- Sensitive data exposure
- Large payload validation
- Password encryption verification
- Request validation
- Authentication bypass attempts

---

# Flow-Based API Testing

Business workflow testing has been implemented for multiple user flows.

## Tony Flow

```text
Login
↓
Invalid Credentials
↓
Access Denied
```

## Steve Flow

```text
Login
↓
No Institute Assigned
↓
Access Restricted
```

## Bruce Flow

```text
Login
↓
Single Institute
↓
Single Role
↓
Dashboard Access
```

## Natasha Flow

```text
Login
↓
Multiple Institutes
↓
Multiple Roles
↓
Institute Selection
↓
Role Selection
↓
Dashboard Access
```

## Hawkeye Flow

```text
Login
↓
Single Institute
↓
Multiple Roles
↓
Role Selection
↓
Dashboard Access
```

## Thor Flow

```text
Login
↓
Multiple Institutes
↓
Single Role
↓
Institute Selection
↓
Dashboard Access
```

---

# API Chaining Implementation

Implemented API chaining workflow:

```text
User Login
↓
Generate JWT Token
↓
Access Protected API
↓
Select Institute
↓
Authorize User
↓
Dashboard Access
```

---

# Security Testing Coverage

The framework includes extensive security testing.

Implemented validations:

- SQL Injection Testing
- XSS Payload Validation
- JWT Token Tampering
- Invalid Authentication Handling
- Sensitive Data Exposure Validation
- Authorization Validation
- Access Restriction Testing

---

# Response Schema Validation

Response validation includes:

### Authentication Response

Validated fields:

- success
- message
- token
- user
- institutes

### User Response

Validated fields:

- id
- first_name
- last_name
- full_name
- email
- mobile

---

# Performance Validation

Performance validations include:

- Response time verification
- Repeated request handling
- API stability validation
- Request execution monitoring
- Error response validation

---

# Data Seeding Strategy

Test execution uses controlled seed data.

Seed data includes:

- User setup
- Institute setup
- Role mapping
- Institute-role mapping
- Cleanup handling

Implemented validation:

- Seed user creation
- Seed mapping validation
- Cleanup verification after execution

---

# Test Execution Commands

Install project dependencies:

```bash
npm install
```

Run complete test suite:

```bash
npm test
```

Run individual test suite:

Authentication:

```bash
npm test -- tests/auth/auth.test.js
```

User:

```bash
npm test -- tests/user/user.test.js
```

Institute:

```bash
npm test -- tests/institute/institute.test.js
```

Role:

```bash
npm test -- tests/role/role.test.js
```

Security:

```bash
npm test -- tests/security/security.test.js
```

Run specific testcase:

```bash
npm test -- -t "AUTH_01 Login with valid credentials"
```

Debug asynchronous execution:

```bash
npm test -- --detectOpenHandles
```

---

# Environment Configuration

Create:

```text
.env
```

Add:

```env
PORT=5000

DB_USER=postgres
DB_HOST=127.0.0.1
DB_NAME=scos_db
DB_PASSWORD=your_password
DB_PORT=5433

JWT_SECRET=your_secret_key
```

---

# Current Test Execution Status

| Module | Status |
|----------|----------|
| Authentication | Passed |
| User | Passed |
| Institute | Passed |
| Role | Passed |
| Mapping | Passed |
| Security | Passed |

---

# Key Highlights

✓ CRUD Testing  
✓ Authentication Testing  
✓ Authorization Testing  
✓ Flow-Based Testing  
✓ API Chaining  
✓ Security Testing  
✓ Response Validation  
✓ Performance Validation  
✓ Database Validation  
✓ Business Workflow Testing  
✓ Scalable Architecture  
✓ Modular Test Design  

---

# Author

Bhushan Jatgade

Full Stack Development | API Automation Testing | Backend Testing

---
