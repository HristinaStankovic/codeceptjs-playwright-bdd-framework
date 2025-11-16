/// <reference types='codeceptjs' />
const { I }: { I: CodeceptJS.I } = inject();
import productsPage from '../pages/ProductsPage';
import cartPage from '../pages/CartPage';

// Shopping cart-specific steps

let removedItemName: string | null = null;
let expectedOverviewItems: string[] = [];

When('Add all products to the cart', async () => {
  await productsPage.addAllItemsToCart();
});

When('Go to the cart', async () => {
  await productsPage.goToCart();
});

When('Remove the {int}rd item from the cart', async (index: number) => {
  const names = await cartPage.grabItemNames();
  removedItemName = names[index - 1];
  expectedOverviewItems = names.filter((_, i) => i !== index - 1);
  await cartPage.removeItemByIndex(index);
});

When('Remove all items from the cart', async () => {
  await cartPage.removeAllItems();
});

Then('Cart should be empty', async () => {
  await cartPage.seeCartIsEmpty();
});

Then('Cart should contain all products', async () => {
  const itemCount = await cartPage.getItemCount();
  // @ts-ignore - assertEqual comes from steps_file
  I.assertEqual(itemCount, 6, 'Cart should contain all 6 products');
});

Then('{string} should be visible in the cart', async (name: string) => {
  await cartPage.seeItemWithName(name);
});

When('Add product {string} to the cart', async (productName: string) => {
  await productsPage.addProductToCartByName(productName);
});

Then('Cart badge should show {string} items', async (count: string) => {
  await productsPage.seeCartBadgeCount(count);
});

// Export state for checkout steps
export { removedItemName, expectedOverviewItems };
