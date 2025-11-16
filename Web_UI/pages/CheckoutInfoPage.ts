/// <reference types='codeceptjs' />
const { I } = inject();

class CheckoutInfoPage {
  private firstName = '[data-test="firstName"]';
  private lastName = '[data-test="lastName"]';
  private postalCode = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    // @ts-ignore - fillField comes from Playwright
    I.fillField(this.firstName, firstName);
    // @ts-ignore - fillField comes from Playwright
    I.fillField(this.lastName, lastName);
    // @ts-ignore - fillField comes from Playwright
    I.fillField(this.postalCode, postalCode);
    // @ts-ignore - click comes from Playwright
    I.click(this.continueButton);
  }
}

export default new CheckoutInfoPage();
