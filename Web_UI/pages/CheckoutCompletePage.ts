const { I } = inject();

class CheckoutCompletePage {
  private completeHeader = '.complete-header';

  async seeOrderConfirmation() {
    // @ts-ignore - see comes from Playwright
    I.see('Thank you for your order!', this.completeHeader);
  }
}

export = new CheckoutCompletePage();
