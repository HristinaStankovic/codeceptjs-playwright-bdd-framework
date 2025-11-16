/// <reference types='codeceptjs' />
const { I }: { I: CodeceptJS.I } = inject();
import loginPage from '../pages/LoginPage';

// Shared steps used across multiple features

Given('User is logged in as {string}', async (role: string) => {
  await loginPage.loginAs(role as any);
});

Given('User is on the SauceDemo login page', async () => {
  await loginPage.open();
});

Then('Products page should be visible', async () => {
  // @ts-ignore - seeElement comes from Playwright
  I.seeElement('.inventory_list');
});
