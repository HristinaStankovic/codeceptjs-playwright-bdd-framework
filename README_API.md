# ReqRes API Tests

API tests for the ReqRes REST API using CodeceptJS REST helper with full BDD/Gherkin implementation.

# Setup approach

Uses the same BDD approach as Web UI tests for consistency. All tests are written in Gherkin feature files with step definitions in TypeScript. This makes API tests readable by both technical and non-technical team members.

Configuration is centralized so you change the API key or base URL in one place. Tests are straightforward - no overcomplicated abstractions.

## Folder structure

```
API_tests/
├── features/
│   └── user_management.feature    # Gherkin scenarios for API endpoints
└── steps/
    └── ApiSteps.ts                # Step implementations for API tests
```

This mirrors the Web UI structure, making it easy to navigate and maintain both test suites.

## Why BDD/Gherkin for API tests?

API tests follow the same Gherkin/BDD approach as Web UI tests for several reasons:

**Benefits of consistent BDD approach:**

- Test scenarios are readable by everyone - developers, QA, Product Owners, Business Analysts
- Consistent structure across the entire project - same patterns for API and UI tests
- Easy to review test coverage - business logic is visible in feature files
- Step definitions are reusable across multiple scenarios
- Living documentation - feature files serve as up-to-date API documentation

**Example:**

```gherkin
Feature: User Management API

  @scenario1 @get-users
  Scenario: Get list of users and display odd IDs
    When I send GET request to "/users?page=1"
    Then response status should be 200
    And users with odd IDs should be displayed
```

This approach makes the test suite maintainable and accessible to the entire team.

# What's tested

Basic CRUD operations:

- GET requests to read data (including filtering odd IDs)
- POST to create users with date validation
- PUT to update users
- Error scenarios (like missing password)
- Response time validation with different delay parameters

All 6 tests are passing.

# API info

Base URL: https://reqres.in/api
Docs: https://reqres.in

Need an API key which gets added automatically to request headers.

# Tech stack

- Node.js 24.4.1
- CodeceptJS 3.7.5
- REST helper
- TypeScript
- Gherkin/Cucumber
- Allure Report

# Setup

After cloning the project from GitHub, run this command:

```bash
npm install
```

**Prerequisites:** Node.js 18 or newer.

# Config

In codecept.conf.ts the API key is set up to be added automatically:

typescript
REST: {
endpoint: 'https://reqres.in/api',
onRequest: (request) => {
request.headers = {
...request.headers,
'Content-Type': 'application/json',
'X-API-Key': 'reqres-free-v1',
};
},
}

# Running tests

All API tests:

```bash
npm run test:api
```

Single scenario by specific tag:

```bash
API_ONLY=true npx codeceptjs run --grep "@get-users"
API_ONLY=true npx codeceptjs run --grep "@create-user"
API_ONLY=true npx codeceptjs run --grep "@update-user"
API_ONLY=true npx codeceptjs run --grep "@response-time"
API_ONLY=true npx codeceptjs run --grep "@login-error"
```

With more details:

```bash
npx codeceptjs run --grep @api --steps --verbose
```

# Allure reports

Generate and view HTML report:

```bash
npm run allure:generate
npm run allure:serve
```

Or generate and open in one command:

```bash
npm run allure:generate && npm run allure:serve
```

**Note:** After viewing the report, the Allure server will keep running. To continue using the terminal, you need to shut it down:

- Press `Ctrl+C` or `control+C` on Mac in the terminal where Allure is running
- Or close the terminal tab
- The message "Shutting down the allure server at http://127.0.0.1:xxxxx" will appear

Shows:

- Test results
- Response times
- Request/response data
- History and trends
- Statistics

## Output accumulation

Test results accumulate in the `output/` folder locally, which allows you to track history across multiple test runs.

**To get fresh results only:**

```bash
npm run clean && npm run test:api
```

The `clean` command uses `rimraf` which works on all platforms (Windows, macOS, Linux). On macOS/Linux you could use `rm -rf`, but that doesn't work on Windows - `rimraf` solves this.

Or run tests, generate report, and open it in one go:

**Note:** Using `;` instead of `&&` after the test command ensures the report is generated even if any test fails. This way you can still see all test results in Allure.

```bash
npm run clean && npm run test:api; npm run allure:generate && npm run allure:serve
```

**To automate cleanup** (optional), modify package.json scripts:

```json
"test:api": "npm run clean && API_ONLY=true codeceptjs run --grep @api --steps"
```

Note: The `output/` folder is in `.gitignore`, so accumulated results stay local and don't get committed.

## Writing New Tests

Add scenarios to `API_tests/features/user_management.feature`:

```gherkin
@api @mytest
Scenario: Test description
  Given I have user data with name "John" and job "Developer"
  When I send POST request to "/users" with payload
  Then response status should be 201
```

If you need new step definitions, add them to `API_tests/steps/ApiSteps.ts`:

```typescript
When("I do something with {string}", async (param: string) => {
  // @ts-ignore
  const response = await I.sendGetRequest(`/endpoint/${param}`);
  // Store or validate response
});
```

Available REST methods in step definitions:

- `I.sendGetRequest(url, headers?)`
- `I.sendPostRequest(url, payload, headers?)`
- `I.sendPutRequest(url, payload, headers?)`
- `I.sendDeleteRequest(url, headers?)`
- `I.sendPatchRequest(url, payload, headers?)`

Response object structure:

```typescript
{
  status: number,     // HTTP status code
  data: any,          // Response body
  headers: object     // Response headers
}
```

## Step Definition Patterns

Common patterns used in `API_tests/steps/ApiSteps.ts`:

**Shared state between steps:**

```typescript
let apiPayload: any;
let apiResponse: any;
let responseStartTime: number;
```

**Given steps** - Prepare test data:

```typescript
Given(
  "I have user data with name {string} and job {string}",
  (name: string, job: string) => {
    apiPayload = { name, job };
  }
);
```

**When steps** - Perform API calls:

```typescript
When(
  "I send POST request to {string} with payload",
  async (endpoint: string) => {
    // @ts-ignore
    apiResponse = await I.sendPostRequest(endpoint, apiPayload);
  }
);
```

**Then steps** - Validate responses:

```typescript
Then("response status should be {int}", (expectedStatus: number) => {
  // @ts-ignore
  I.assertEqual(expectedStatus, apiResponse.status);
});
```

## Troubleshooting

401 Unauthorized  
Check if API key is correctly set in codecept.conf.ts

TypeScript errors  
Add @ts-ignore before REST method calls

Response time test fails  
Network might be slow, increase threshold

Connection timeout  
Check internet connection and API availability

## Response Examples

GET /users?page=1:

json
{
"page": 1,
"per_page": 6,
"total": 12,
"data": [
{
"id": 1,
"email": "george.bluth@reqres.in",
"first_name": "George",
"last_name": "Bluth"
}
]
}

POST /users:

json
{
"name": "Hristina",
"job": "QA Engineer",
"id": "123",
"createdAt": "2025-11-16T12:34:56.789Z"
}

Error response:

json
{
"error": "Missing password"
}

## Additional Documentation

- Test_Scenarios_API.md - detailed test scenarios
- ReqRes documentation: https://reqres.in
