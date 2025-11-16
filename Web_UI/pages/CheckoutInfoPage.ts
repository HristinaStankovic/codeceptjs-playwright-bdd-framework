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

  async fillCheckoutInfoWithoutContinue(firstName: string, lastName: string, postalCode: string) {
    // @ts-ignore - fillField comes from Playwright
    I.fillField(this.firstName, firstName);
    // @ts-ignore - fillField comes from Playwright
    I.fillField(this.lastName, lastName);
    // @ts-ignore - fillField comes from Playwright
    I.fillField(this.postalCode, postalCode);
  }

  async verifyFieldValues(firstName: string, lastName: string, postalCode: string) {
    // @ts-ignore - grabValueFrom comes from Playwright
    const actualFirstName = await I.grabValueFrom(this.firstName);
    // @ts-ignore - grabValueFrom comes from Playwright
    const actualLastName = await I.grabValueFrom(this.lastName);
    // @ts-ignore - grabValueFrom comes from Playwright
    const actualPostalCode = await I.grabValueFrom(this.postalCode);
    
    // @ts-ignore - assertEqual comes from steps_file
    I.assertEqual(actualFirstName, firstName, `First name should be ${firstName}`);
    // @ts-ignore - assertEqual comes from steps_file
    I.assertEqual(actualLastName, lastName, `Last name should be ${lastName}`);
    // @ts-ignore - assertEqual comes from steps_file
    I.assertEqual(actualPostalCode, postalCode, `Postal code should be ${postalCode}`);
  }

  async clickContinue() {
    // @ts-ignore - click comes from Playwright
    I.click(this.continueButton);
  }
}

export default new CheckoutInfoPage();
