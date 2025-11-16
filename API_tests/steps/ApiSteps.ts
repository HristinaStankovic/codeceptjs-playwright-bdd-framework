/// <reference types='codeceptjs' />
const { I }: { I: CodeceptJS.I } = inject();

// API-specific step definitions

// Shared state for scenarios
let apiPayload: any = {};
let apiResponse: any = null;
let responseStartTime: number = 0;

// Given steps

Given('User data with name {string} and job {string} is prepared', (name: string, job: string) => {
  apiPayload = { name, job };
});

Given('Login payload with email {string} but no password is prepared', (email: string) => {
  apiPayload = { email };
});

// When steps

When('Send GET request to {string}', async (endpoint: string) => {
  responseStartTime = Date.now();
  // @ts-ignore
  apiResponse = await I.sendGetRequest(endpoint);
});

When('Send POST request to {string} with payload', async (endpoint: string) => {
  // @ts-ignore
  apiResponse = await I.sendPostRequest(endpoint, apiPayload);
});

When('Send PUT request to {string} with payload', async (endpoint: string) => {
  // @ts-ignore
  apiResponse = await I.sendPutRequest(endpoint, apiPayload);
});

// Then steps

Then('Response status should be {int}', (expectedStatus: number) => {
  // @ts-ignore
  I.assertEqual(expectedStatus, apiResponse.status);
});

Then('Response should contain user name {string}', (expectedName: string) => {
  // @ts-ignore
  I.assertEqual(expectedName, apiResponse.data.name);
});

Then('Response should contain user job {string}', (expectedJob: string) => {
  // @ts-ignore
  I.assertEqual(expectedJob, apiResponse.data.job);
});

Then('Creation date should be today', () => {
  const createdAt = apiResponse.data.createdAt;
  const createdDate = new Date(createdAt);
  const today = new Date();
  const format = (d: Date) => d.toISOString().slice(0, 10);
  
  // @ts-ignore
  I.assertEqual(format(today), format(createdDate), 'Creation date should be today');
});

Then('Users with odd IDs should be displayed', () => {
  // @ts-ignore
  I.assertEqual(200, apiResponse.status);
  const data = apiResponse.data.data;
  const oddUsers = data.filter((u: any) => u.id % 2 === 1);
  
  // @ts-ignore
  I.say('Users with odd IDs:');
  oddUsers.forEach((u: any) => {
    // @ts-ignore
    I.say(`ID: ${u.id}, name: ${u.first_name} ${u.last_name}`);
  });
});

Then('Response time should be less than {int} ms', (maxTime: number) => {
  const elapsed = Date.now() - responseStartTime;
  // @ts-ignore
  I.say(`Response time: ${elapsed} ms`);
  // @ts-ignore
  I.assert(elapsed <= maxTime, `Expected response time <=${maxTime} ms but got ${elapsed} ms`);
});

Then('Response time should be between {int} and {int} ms', (minTime: number, maxTime: number) => {
  const elapsed = Date.now() - responseStartTime;
  // @ts-ignore
  I.say(`Response time: ${elapsed} ms`);
  // @ts-ignore
  I.assert(
    elapsed >= minTime && elapsed <= maxTime,
    `Expected response time between ${minTime}-${maxTime} ms but got ${elapsed} ms`
  );
});

Then('Response error should be {string}', (expectedError: string) => {
  // @ts-ignore
  I.assertEqual(expectedError, apiResponse.data.error);
});
