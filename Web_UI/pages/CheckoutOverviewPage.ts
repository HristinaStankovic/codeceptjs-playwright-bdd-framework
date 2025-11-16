const { I } = inject();

class CheckoutOverviewPage {
  private summaryItem = '.cart_item';
  private finishButton = '[data-test="finish"]';

  async grabItemNames(): Promise<string[]> {
    // @ts-ignore - grabTextFromAll comes from Playwright
    return await I.grabTextFromAll('.inventory_item_name');
  }

  async seeItemsCount(expected: number) {
    // @ts-ignore - grabNumberOfVisibleElements comes from Playwright
    const actual = await I.grabNumberOfVisibleElements(this.summaryItem);
    if (actual !== expected) {
      throw new Error(`Expected ${expected} items, but got ${actual}`);
    }
  }

  async finish() {
    // @ts-ignore - click comes from Playwright
    I.click(this.finishButton);
  }
}

export = new CheckoutOverviewPage();
