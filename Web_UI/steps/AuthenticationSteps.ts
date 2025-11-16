/// <reference types='codeceptjs' />
import loginPage from '../pages/LoginPage';

// Authentication-specific steps

When('User tries to login as {string}', async (role: string) => {
  await loginPage.loginAs(role as any);
});

Then('Login error containing {string} should be visible', async (part: string) => {
  await loginPage.seeError(part);
});
