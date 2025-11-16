import { setHeadlessWhen } from '@codeceptjs/configure';

setHeadlessWhen(process.env.HEADLESS === 'true');

export const config = {
  tests: './{tests,API_tests}/**/*.ts',
  output: './output',

  helpers: process.env.API_ONLY === 'true' ? {
    REST: {
      endpoint: 'https://reqres.in/api',
      onRequest: (request: any) => {
        request.headers = {
          ...request.headers,
          'Content-Type': 'application/json',
          'X-API-Key': 'reqres-free-v1',
        };
      },
    },
  } : {
    Playwright: {
      url: 'https://www.saucedemo.com',
      browser: 'chromium',
      show: true,
      waitForTimeout: 5000,
    },

    REST: {
      endpoint: 'https://reqres.in/api',
      onRequest: (request: any) => {
        request.headers = {
          ...request.headers,
          'Content-Type': 'application/json',
          'X-API-Key': 'reqres-free-v1',
        };
      },
    },
  },

  include: {
    I: './steps_file.ts',
    loginPage: './Web_UI/pages/LoginPage.ts',
    productsPage: './Web_UI/pages/ProductsPage.ts',
    cartPage: './Web_UI/pages/CartPage.ts',
    checkoutInfoPage: './Web_UI/pages/CheckoutInfoPage.ts',
    checkoutOverviewPage: './Web_UI/pages/CheckoutOverviewPage.ts',
    checkoutCompletePage: './Web_UI/pages/CheckoutCompletePage.ts',
  },

  gherkin: {
    features: [
      './Web_UI/features/**/*.feature',
      './API_Tests/features/**/*.feature'
    ],
    steps: [
      './Web_UI/steps/BaseSteps.ts',
      './Web_UI/steps/AuthenticationSteps.ts',
      './Web_UI/steps/ShoppingCartSteps.ts',
      './Web_UI/steps/ProductCatalogSteps.ts',
      './Web_UI/steps/CheckoutSteps.ts',
      './API_Tests/steps/ApiSteps.ts'
    ],
  },

  plugins: {
    screenshotOnFail: { enabled: true },
    retryFailedStep: { enabled: true },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy'
    }
  },

  mocha: {},
  name: 'playwright-bdd-codeceptjs-framework',
};
