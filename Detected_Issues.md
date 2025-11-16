# Detected Issues

## Issue #1: Cart Item Name Not Displayed for Problem User

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

### Test Scenario

```gherkin
Feature: Shopping Cart Management

@web @cart @problem-user @scenario2 @bug
Scenario: Problem user adds item from product detail page
  Given User is logged in as "problem_user"
  When Open product "Sauce Labs Backpack"
  And Add product to the cart from product page
  And Go to the cart
  Then "Sauce Labs Backpack" should be visible in the cart
```

Feature file: `Web_UI/features/shopping_cart.feature`

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
Problem user adds item from product detail page @web @cart @problem-user @scenario2 @bug
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

Screenshot: `output/Problem_user_adds_item_from_product_detail_page_@web_@cart_@problem-user_@scenario2_@bug.failed.png`

### Impact

- Users with problem_user account cannot verify cart contents
- Blocks checkout flow verification
- Test automation fails for this user type

### Notes

- Issue is specific to problem_user account only
- Same test passes with standard_user
- This appears to be intentional - problem_user is designed to demonstrate bugs
- Test is tagged with @bug in feature file
- Overall test pass rate: 11/12 (92%)

### Additional Observations

- Adding product directly by clicking "Add to cart" button from the products list page - product is added normally
- Even when this bug occurs (empty cart), it is possible to click the "Checkout" button despite the cart being empty
- The application does not prevent access to the checkout process with an empty cart

### Test Results Summary

**Authentication** (2/2 passed)

- Standard user login
- Locked out user rejection

**Shopping Cart** (4/5 passed)

- Add all products
- Remove all items
- Remove specific item
- Verify cart badge count
- Problem user bug (FAILED - this issue)

**Product Catalog** (3/3 passed)

- Sort by name
- Sort by price
- View product details

**Checkout** (2/2 passed)

- Complete purchase flow
- Verify checkout overview

### Recommendation

This is a known issue with the problem_user test account. Use standard_user for normal testing. The problem_user account exists specifically to demonstrate application bugs and is marked accordingly in the test suite.
