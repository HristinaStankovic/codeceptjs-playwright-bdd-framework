/// <reference types='codeceptjs' />
const { I }: { I: CodeceptJS.I } = inject();
import productsPage from '../pages/ProductsPage';

// Product catalog-specific steps

When('Open product {string}', async (name: string) => {
  await productsPage.openItemByName(name);
});

When('Add product to the cart from product page', () => {
  // @ts-ignore - click comes from Playwright
  I.click('button[data-test^="add-to-cart"]');
});

When('Sort products by name', async () => {
  await productsPage.sortByNameAscending();
});

Then('Products should be sorted alphabetically', async () => {
  const names = await productsPage.grabProductNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  // @ts-ignore - say comes from steps_file
  I.say(`Actual: ${names}`);
  // @ts-ignore - say comes from steps_file
  I.say(`Sorted: ${sorted}`);
  // @ts-ignore - assertDeepEqual comes from steps_file
  I.assertDeepEqual(names, sorted, 'Products are sorted alphabetically');
});

When('Sort products by price low to high', async () => {
  await productsPage.sortByPriceLowToHigh();
});

Then('Products should be sorted by price ascending', async () => {
  const prices = await productsPage.grabProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  // @ts-ignore - say comes from steps_file
  I.say(`Actual prices: ${prices}`);
  // @ts-ignore - say comes from steps_file
  I.say(`Sorted prices: ${sorted}`);
  // @ts-ignore - assertDeepEqual comes from steps_file
  I.assertDeepEqual(prices, sorted, 'Products are sorted by price ascending');
});
