const { I } = inject();


class ProductsPage {
  private inventoryItem = '.inventory_item';
  private inventoryItemName = '.inventory_item_name';
  private sortSelect = '[data-test="product-sort-container"]';
  private shoppingCartLink = '.shopping_cart_link';

  async addAllItemsToCart() {
    // @ts-ignore - click comes from Playwright
    const buttons = await I.grabNumberOfVisibleElements('button[data-test^="add-to-cart"]');
    for (let i = 0; i < buttons; i++) {
      // @ts-ignore - click comes from Playwright
      I.click('button[data-test^="add-to-cart"]');
      // @ts-ignore - wait comes from Playwright
      await I.wait(0.3);
    }
  }

  async goToCart() {
    // @ts-ignore - click comes from Playwright
    I.click(this.shoppingCartLink);
  }

  async openItemByName(name: string) {
    // @ts-ignore - grabTextFromAll comes from Playwright
    const links = await I.grabTextFromAll(this.inventoryItemName);
    const index = links.indexOf(name);
    if (index === -1) {
      throw new Error(`Product "${name}" not found in the list`);
    }
    // @ts-ignore - click comes from Playwright
    I.click(`(//div[contains(@class, 'inventory_item_name')])[${index + 1}]`);
  }

  async sortByNameAscending() {
    // @ts-ignore - selectOption comes from Playwright
    I.selectOption(this.sortSelect, 'Name (A to Z)');
  }

  async grabProductNames(): Promise<string[]> {
    // @ts-ignore - grabTextFromAll comes from Playwright
    return await I.grabTextFromAll(this.inventoryItemName);
  }

  async sortByPriceLowToHigh() {
    // @ts-ignore - selectOption comes from Playwright
    I.selectOption(this.sortSelect, 'Price (low to high)');
  }

  async grabProductPrices(): Promise<number[]> {
    // @ts-ignore - grabTextFromAll comes from Playwright
    const priceTexts = await I.grabTextFromAll('.inventory_item_price');
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async addProductToCartByName(productName: string) {
    // Convert product name to data-test format (lowercase, replace spaces with dashes)
    const dataTest = productName.toLowerCase().replace(/\s+/g, '-');
    const buttonSelector = `[data-test="add-to-cart-${dataTest}"]`;
    // @ts-ignore - click comes from Playwright
    I.click(buttonSelector);
  }

  async seeCartBadgeCount(expectedCount: string) {
    // @ts-ignore - see comes from Playwright
    I.see(expectedCount, '.shopping_cart_badge');
  }
}

export = new ProductsPage();
