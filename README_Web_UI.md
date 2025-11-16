# SauceDemo Web UI Tests

Automated tests for the SauceDemo web application using CodeceptJS with Playwright and Gherkin.

# Why this framework

I chose this setup because it makes tests easier to maintain and understand. The Page Object Model keeps locators separate from test logic so when UI changes you only update one place. CodeceptJS gives you simpler syntax than raw Playwright which is nice when writing lots of tests.

Gherkin scenarios are readable even for non-technical people which helps with collaboration. TypeScript catches errors early during development. Allure generates good reports with screenshots.

Basically, I wanted something that works well and doesn't require too much maintenance.

## Why one framework for both API and Web UI tests?

Using CodeceptJS for both API and Web UI tests instead of separate frameworks:

**Pros:**

- Single setup and configuration - less overhead
- Shared helpers, utilities, and test data
- One reporting system (Allure) for all tests
- Team only needs to learn one framework
- Easier to maintain dependencies
- Can combine API and UI in same scenario if needed (e.g., API setup, UI verification)
- **Consistent BDD approach** - Both API and Web UI tests use Gherkin feature files

**Cons:**

- Web UI tests load Playwright even when running API-only tests (solved with conditional helper loading)
- Slightly heavier than pure API framework like Supertest

The trade-off is worth it for smaller projects. For larger projects with separate API/UI teams, separate frameworks might make more sense. Here, keeping everything in one place is simpler and more practical.

# What's covered

Basic e-commerce stuff:

- Login/logout flows
- Browsing products and sorting them
- Cart operations (add/remove items)
- Complete checkout process

12 scenarios total. 11 pass, 1 fails on purpose because it tests a bug with the problem_user account.

# How tests are organized

Split into 4 feature files:

authentication.feature - login stuff (2 scenarios)
shopping_cart.feature - cart operations, 5 scenarios including the bug test
product_catalog.feature - product browsing and sorting (3 scenarios)
checkout.feature - purchase flow (2 scenarios)

# Tech stack

- Node.js 24.4.1
- CodeceptJS 3.7.5
- Playwright (Chromium)
- TypeScript
- Gherkin/Cucumber
- Allure Report

# Folder structure

```
Web_UI/
├── features/                   # Gherkin feature files
│   ├── authentication.feature
│   ├── shopping_cart.feature
│   ├── product_catalog.feature
│   └── checkout.feature
├── pages/                      # Page Object Model classes
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutInfoPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
└── steps/                      # Step definitions (split by feature)
    ├── BaseSteps.ts            # Shared steps (login, navigation)
    ├── AuthenticationSteps.ts  # Authentication-specific steps
    ├── ShoppingCartSteps.ts    # Cart operations
    ├── ProductCatalogSteps.ts  # Product browsing/sorting
    └── CheckoutSteps.ts        # Checkout flow

output/                         # Screenshots and test artifacts
allure-report/                  # Generated HTML report (after running allure:generate)
codecept.conf.ts                # Main configuration
```

# Setup

After cloning the project from GitHub, run these commands:

```bash
npm install
npx playwright install
```

It is necessary to have Node.js 18 or newer on your local machine.

# Running tests

Regular mode with browser visible:

```bash
npm run test:web
```

Headless mode (runs faster):

```bash
npm run test:web:headless
```

Run specific feature file:

```bash
npx codeceptjs run Web_UI/features/authentication.feature
npx codeceptjs run Web_UI/features/shopping_cart.feature
npx codeceptjs run Web_UI/features/product_catalog.feature
npx codeceptjs run Web_UI/features/checkout.feature
```

Single scenario by specific tag:

```bash
npx codeceptjs run --grep "@standard-login"
npx codeceptjs run --grep "@locked-out"
npx codeceptjs run --grep "@add-items"
npx codeceptjs run --grep "@remove-items"
npx codeceptjs run --grep "@remove-specific-item"
npx codeceptjs run --grep "@verify-count"
npx codeceptjs run --grep "@problem-user"
npx codeceptjs run --grep "@sort-name"
npx codeceptjs run --grep "@sort-price"
npx codeceptjs run --grep "@product-details"
npx codeceptjs run --grep "@complete-purchase"
npx codeceptjs run --grep "@verify-order"
```

By feature tag:

```bash
npx codeceptjs run --grep "@authentication"
npx codeceptjs run --grep "@cart"
npx codeceptjs run --grep "@products"
npx codeceptjs run --grep "@checkout"
```

For debugging with detailed output:

```bash
npx codeceptjs run --steps --verbose
```

# Allure reports

Generate HTML report after running tests:

```bash
npm run allure:generate
npm run allure:serve
```

Or generate and open in one command:

```bash
npm run allure:generate && npm run allure:serve
```

**Note:** After viewing the report, the Allure server will keep running. To continue using the terminal, you need to shut it down:

- Press `Ctrl+C` on Windows or `control+C` on Mac in the terminal where Allure is running
- Or close the terminal tab
- The message "Shutting down the allure server at http://127.0.0.1:xxxxx" will appear

This opens an HTML report in your browser with:

- Pass/fail status for each test
- How long each test took
- Screenshots when tests fail
- History across multiple runs
- Various charts and stats

Report gets saved to allure-report/ folder.

## Output accumulation

Test results accumulate in the `output/` folder locally, which allows you to track history across multiple test runs. This is useful for seeing trends over time.

**To get fresh results only (web ui or headless mode):**

```bash
npm run clean && npm run test:web
```

```bash
npm run clean && npm run test:web:headless
```

The `clean` command uses `rimraf` which works on all platforms (Windows, macOS, Linux). On macOS/Linux you could use `rm -rf`, but that doesn't work on Windows - `rimraf` solves this.

Or run everything in one command - clean, test, generate report, and open it:

**Note:** Using `;` instead of `&&` after test commands ensures the report is generated even if some tests fail (like the known problem_user bug). This way you can still see all test results in Allure.

```bash
npm run clean && npm run test:web; npm run allure:generate && npm run allure:serve
```

For headless mode (faster):

```bash
npm run clean && npm run test:web:headless; npm run allure:generate && npm run allure:serve
```

For both API and Web tests:

API and Web UI testing, including Allure report:

```bash
npm run clean && npm run test:api; npm run test:web; npm run allure:generate && npm run allure:serve
```
API and Web testing in headless mode:

```bash
npm run clean && npm run test:api; npm run test:web:headless; npm run allure:generate && npm run allure:serve
```

**To automate cleanup** (optional), modify package.json scripts:

```json
"test:web": "npm run clean && codeceptjs run --grep @web --steps"
```

Note: The `output/` folder is in `.gitignore`, so accumulated results stay local and don't get committed.

# Config

Main configuration is in codecept.conf.ts. Browser can be changed:

typescript
browser: "chromium"; // or 'firefox', 'webkit'

For headless:

typescript
show: false;

# Writing New Tests

### Feature file

```gherkin
@web @mytest
Scenario: Test name
  Given User is logged in as "standard_user"
  When Some action
  Then Expected result
```

### Step definition

Step definitions are organized by feature in the `Web_UI/steps/` folder:

```typescript
// In Web_UI/steps/ShoppingCartSteps.ts
When("Add all products to the cart", async () => {
  await productsPage.addAllItemsToCart();
});
```

Each step file handles steps for its specific feature:

- `BaseSteps.ts` - shared steps used across features
- `AuthenticationSteps.ts` - login/auth steps
- `ShoppingCartSteps.ts` - cart operations
- `ProductCatalogSteps.ts` - product browsing
- `CheckoutSteps.ts` - purchase flow

### Page Object

Page Objects are in `Web_UI/pages/` folder:

```typescript
const { I } = inject();

class MyPage {
  private selector = ".my-element";

  async doSomething() {
    // @ts-ignore
    I.click(this.selector);
  }
}

export = new MyPage();
```

# Page Object Model

Each page has its own Page Object:

- LoginPage.ts - login form
- ProductsPage.ts - product list
- CartPage.ts - shopping cart
- CheckoutInfoPage.ts - checkout info form
- CheckoutOverviewPage.ts - order overview/review
- CheckoutCompletePage.ts - order confirmation

Locators are kept in Page Objects, not hardcoded in tests.

## Why 3 separate Checkout pages?

The checkout flow has 3 distinct pages with different URLs and responsibilities:

1. **CheckoutInfoPage** - collecting billing information (first-name, last-name, postal-code)
2. **CheckoutOverviewPage** - reviewing order details before purchase
3. **CheckoutCompletePage** - confirmation after successful order

Each page has its own URL, DOM structure, and set of actions. Keeping them separate:

- Makes it clear which page you're working with
- Easier to maintain when one page changes
- Each class has single responsibility
- Better aligns with the actual user flow

Alternative would be combining into one CheckoutPage class, but that would mix concerns and make the file larger and less focused.

# Custom Helper Methods

Defined in steps_file.ts:

typescript
I.say("Message"); // console output
I.assertEqual(expected, actual); // assertion
I.assertDeepEqual(obj1, obj2); // deep comparison
I.assert(condition, "message"); // custom assertion

# Output and Results

Screenshots are automatically taken when a test fails, saved in the output/ folder.

Console output shows how many tests passed:

OK | 11 passed, 1 failed // 45s

# Test Users

Available test accounts:

Username Password Note

---

standard_user secret_sauce Normal user  
 locked_out_user secret_sauce Blocked  
 problem_user secret_sauce Buggy - test fails
performance_glitch_user secret_sauce Slow

# Additional Documentation

- Test_Scenarios_Web_UI.md - detailed test scenarios
- Detected_Issues.md - documented bugs

# VS Code Integration

To enable "Go to Definition" (Cmd+Click) from feature files to step definitions:

1. Install the "Cucumber (Gherkin) Full Support" extension (already included)
2. Settings are configured in .vscode/settings.json to recognize step files
3. Cmd+Click on any step in a .feature file to jump to its definition

# Notes

- @ts-ignore is used due to ts-node issues with CodeceptJS types
- Problem user bug is known and expected
- Tests can be run in parallel but are not currently configured for it
- Step definitions are split by feature for better organization and maintainability
