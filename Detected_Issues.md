# Detected Issues

## Issue #1: Cart Item Name Not Displayed for Problem User
Scenario: Problem user adds item from product detail page

**Severity**: High  
**Status**: Open  
**Reproducibility**: 100%

### Summary

When logged in as `problem_user`, product names are not displayed in the shopping cart after adding items. The `.inventory_item_name` element is missing from the cart page.

### Environment

- Application: https://www.saucedemo.com
- Browser: Chromium 141.0.7390.37
- Test Framework: CodeceptJS 3.7.5 with Playwright
- User Account: problem_user

Feature file: `Web_UI/features/problem_user.feature`

### Steps to Reproduce

1. Login at https://www.saucedemo.com
   - Username: problem_user
   - Password: secret_sauce
2. Click "Sauce Labs Backpack" from product list
3. Click "Add to cart" button
4. Click shopping cart icon
5. Check cart page

### Expected Result

Shopping cart displays the added product with name "Sauce Labs Backpack" visible.

### Actual Result

- Cart page loads but it is empty, therefore product name is not displayed
- Element `.inventory_item_name` not found
- Test fails: `Element ".inventory_item_name" was not found by text|CSS|XPath`
- User can still proceed to checkout with invisible product

### Test Output

```
Problem user adds item from product detail page @web @problem-user @cart @scenario12 @bug
  ✖ FAILED in 2873ms

FAILURES:
  Element ".inventory_item_name" was not found by text|CSS|XPath

Scenario Steps:
  ✖ I.see("Sauce Labs Backpack", ".inventory_item_name") at CartPage.seeItemWithName
  ✔ I.click(".shopping_cart_link") at ProductsPage.goToCart
  ✔ I.click("button[data-test^="add-to-cart"]")
  ✔ I.click("(//div[contains(@class, 'inventory_item_name')])[1]")
  ✔ I.grabTextFromAll(".inventory_item_name")
  ✔ I.click("#login-button")
  ✔ I.fillField("#password", "secret_sauce")
  ✔ I.fillField("#user-name", "problem_user")
  ✔ I.amOnPage("/")
```

Screenshot: `output/Problem_user_adds_item_from_product_detail_page_@web_@problem-user_@cart_@scenario12_@bug.failed.png`

### Impact

- Users with problem_user account cannot verify cart contents
- Blocks checkout flow verification
- Test automation fails for this user type

### Notes

- Issue is specific to problem_user account only
- Same test passes with standard_user
- This appears to be intentional - problem_user is designed to demonstrate bugs
- Test is tagged with @bug in feature file
- Overall test pass rate: 11/13 (85%) - two problem_user scenarios expected to fail

### Additional Observations

- Adding product directly by clicking "Add to cart" button from the products list page - product is added normally
- The application does not prevent access to the checkout process (click on the "Checkout" button is still possible) with an empty cart


## Issue #2: Last Name Field Does Not Accept Input for Problem User
  Scenario: Problem user checkout with field validation

**Severity**: Critical  
**Status**: Open  
**Reproducibility**: 100%

### Summary

When logged in as `problem_user`, the Last Name field on the checkout information page does not accept any input. This prevents the user from completing the checkout form and proceeding to the overview page.

### Environment

- Application: https://www.saucedemo.com
- Browser: Chromium 141.0.7390.37
- Test Framework: CodeceptJS 3.7.5 with Playwright
- User Account: problem_user

Feature file: `Web_UI/features/problem_user.feature`

### Steps to Reproduce

1. Login at https://www.saucedemo.com
   - Username: problem_user
   - Password: secret_sauce
2. Add "Sauce Labs Backpack" to cart from products list
3. Add "Sauce Labs Bike Light" to cart from products list
4. Click shopping cart icon
5. Click "Checkout" button
6. Fill checkout information:
   - First Name: John
   - Last Name: Doe
   - Zip Code: 11000
7. Click "Continue" button
8. Check checkout overview page

### Expected Result

User can fill in all checkout information fields (First Name, Last Name, Postal Code), click Continue, and proceed to the checkout overview page.

### Actual Result

- First Name field accepts input correctly
- **Last Name field does NOT accept any input** - field remains empty after attempting to type
- Postal Code field accepts input correctly
- Clicking "Continue" button does nothing (validation fails because Last Name is required)
- Cannot proceed to overview page due to missing Last Name

### Test Output

  1) Problem User Testing
       Problem user checkout with field validation @web @problem-user @checkout @checkout-info-validation @scenario13 @bug:
     
  Expected overview to contain Sauce Labs Backpack. Actual items: []
      at Actor.assertEqual (steps_file.ts:11:13)
      at MetaStep.run (node_modules/codeceptjs/lib/step/meta.js:85:21)
      at /Users/hristinastankovic/Downloads/codeceptjs-playwright-bdd-framework/Web_UI/steps/CheckoutSteps.ts:37:5

**Root Cause**: The test expects to reach the overview page and verify products, but it never gets there because the Last Name field doesn't accept input, preventing form submission.

Screenshot: `output/Problem_user_checkout_with_field_validation_@web_@problem-user_@checkout_@checkout-info-validation_@.failed.png`

### Impact

- **Critical blocker** for checkout flow with problem_user account
- User cannot complete checkout information form
- Last Name field is completely non-functional
- Prevents reaching checkout overview page
- Makes entire checkout process impossible for this user
- Test automation cannot verify checkout flow for problem_user

### Notes

- Issue is specific to problem_user account only
- Same test passes with standard_user
- This appears to be intentional - problem_user is designed to demonstrate bugs
- Test is tagged with @bug in feature file
- **Only Last Name field is affected** - First Name and Postal Code fields work correctly
- Products are successfully added to cart (badge shows correct count)
- Issue occurs at checkout information page, before reaching overview
- Bug is in the form input handling, not in the overview page display

### Recommendation

This is a known issue with the problem_user test account. Use standard_user for checkout flow testing. The problem_user account exists specifically to demonstrate application bugs and is marked accordingly in the test suite.
