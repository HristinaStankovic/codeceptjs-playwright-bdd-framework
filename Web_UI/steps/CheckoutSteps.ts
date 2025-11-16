/// <reference types='codeceptjs' />
const { I }: { I: CodeceptJS.I } = inject();
import cartPage from '../pages/CartPage';
import checkoutInfoPage from '../pages/CheckoutInfoPage';
import checkoutOverviewPage from '../pages/CheckoutOverviewPage';
import checkoutCompletePage from '../pages/CheckoutCompletePage';
import { removedItemName, expectedOverviewItems } from './ShoppingCartSteps';

// Checkout-specific steps

When('Proceed to checkout with valid data', async () => {
  await cartPage.proceedToCheckout();
  await checkoutInfoPage.fillCheckoutInfo('Hristina', 'Stankovic', '11000');
});

Then('Only non-removed items should be visible in the overview', async () => {
  const overviewNames = await checkoutOverviewPage.grabItemNames();
  await checkoutOverviewPage.seeItemsCount(expectedOverviewItems.length);
  expectedOverviewItems.forEach(name => {
    // @ts-ignore - assertEqual comes from steps_file
    I.assertEqual(true, overviewNames.includes(name), `Expected overview to contain ${name}`);
  });
  if (removedItemName) {
    // @ts-ignore - assertEqual comes from steps_file
    I.assertEqual(false, overviewNames.includes(removedItemName), `Expected overview NOT to contain removed item ${removedItemName}`);
  }
});

Then('Order confirmation should be visible', async () => {
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.seeOrderConfirmation();
});

Then('{string} should be visible in the overview', async (itemName: string) => {
  const overviewNames = await checkoutOverviewPage.grabItemNames();
  // @ts-ignore - assertEqual comes from steps_file
  I.assertEqual(true, overviewNames.includes(itemName), `Expected overview to contain ${itemName}. Actual items: ${JSON.stringify(overviewNames)}`);
});

When('Fill checkout information with {string}, {string}, and {string}', async (firstName: string, lastName: string, postalCode: string) => {
  await checkoutInfoPage.fillCheckoutInfoWithoutContinue(firstName, lastName, postalCode);
});

Then('Checkout information should be {string}, {string}, and {string}', async (firstName: string, lastName: string, postalCode: string) => {
  await checkoutInfoPage.verifyFieldValues(firstName, lastName, postalCode);
});

When('Click Continue button on checkout info page', async () => {
  await checkoutInfoPage.clickContinue();
});
