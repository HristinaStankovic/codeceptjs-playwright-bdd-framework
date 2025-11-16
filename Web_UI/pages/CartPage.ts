const { I } = inject();

class CartPage {
  private cartItem = '.cart_item';
  private cartItemName = '.inventory_item_name';
  private checkoutButton = '[data-test="checkout"]';

  async removeItemByIndex(index: number) {
    // @ts-ignore - click comes from Playwright
    I.click(`(//button[contains(@data-test,"remove")])[${index}]`);
  }

  async seeItemWithName(name: string) {
    // @ts-ignore - see comes from Playwright
    I.see(name, this.cartItemName);
  }

  async dontSeeItemWithName(name: string) {
    // @ts-ignore - dontSee comes from Playwright
    I.dontSee(name, this.cartItemName);
  }

  async grabItemNames(): Promise<string[]> {
    // @ts-ignore - grabTextFromAll comes from Playwright
    return await I.grabTextFromAll(this.cartItemName);
  }

  async proceedToCheckout() {
    // @ts-ignore - click comes from Playwright
    I.click(this.checkoutButton);
  }

  async removeAllItems() {
    // @ts-ignore - grabNumberOfVisibleElements comes from Playwright
    const count = await I.grabNumberOfVisibleElements('button[data-test^="remove"]');
    for (let i = 0; i < count; i++) {
      // @ts-ignore - click comes from Playwright
      I.click('button[data-test^="remove"]');
      // @ts-ignore - wait comes from Playwright
      await I.wait(0.2);
    }
  }

  async seeCartIsEmpty() {
    // @ts-ignore - dontSeeElement comes from Playwright
    I.dontSeeElement(this.cartItem);
    // @ts-ignore - see comes from Playwright
    I.see('Continue Shopping', '.cart_contents_container');
  }

  async getItemCount(): Promise<number> {
    // @ts-ignore - grabNumberOfVisibleElements comes from Playwright
    return await I.grabNumberOfVisibleElements(this.cartItem);
  }
}

export = new CartPage();
