# Test Scenarios - Web UI

Detailed description of test scenarios for the SauceDemo application.

## Organization

Tests are divided into 5 feature files by functionality. Total of 13 scenarios, 11 pass, 2 fail (problem_user bugs).

## Authentication (2 scenarios)

### Scenario 1: Standard user login

ID: TC-AUTH-001
Tag: @web @authentication @standard-login @scenario1
Status: Passes

Verifies that a user with valid credentials can log in.

Steps:

1. Open login page
2. Enter username: standard_user
3. Enter password: secret_sauce
4. Click Login button
5. Verify products page is displayed

Expected: User logs in and sees product list.

Implementation:

gherkin
Given User is on the SauceDemo login page
When User is logged in as "standard_user"
Then User should see the products page

### Scenario 2: Locked out user

ID: TC-AUTH-002  
Tag: @web @authentication @locked-out @scenario2  
Status: Passes

Verifies that a locked out user cannot access the application.

Steps:

1. Open login page
2. Enter username: locked_out_user
3. Enter password: secret_sauce
4. Click Login
5. Verify error message: "Epic sadface: Sorry, this user has been locked out."

Expected: Login is rejected with appropriate message.

## Shopping Cart (4 scenarios)

### Scenario 6: Adding all products

ID: TC-CART-001  
Tag: @web @cart @add-items @scenario6  
Status: Passes

Adds all 6 products to cart and checks badge.

Steps:

1. Logged in as standard_user
2. Click "Add to cart" for each product
3. Verify badge shows "6"
4. Open cart
5. Verify all 6 products exist

Expected: All products are in cart, badge shows 6.

### Scenario 7: Removing all products

ID: TC-CART-002  
Tag: @web @cart @remove-items @scenario7  
Status: Passes

Steps:

1. Add all products
2. Open cart
3. Click "Remove" for each product
4. Verify cart has no badge
5. Verify empty cart

Expected: Cart is empty.

### Scenario 8: Removing specific product

ID: TC-CART-003  
Tag: @web @cart @remove-specific-item @scenario8  
Status: Passes

Removes "Sauce Labs Backpack" from cart while other products remain.

Steps:

1. Add all products (badge: 6)
2. Open cart
3. Remove "Sauce Labs Backpack"
4. Verify badge shows "5"
5. Verify other 5 products exist

Expected: Backpack is removed, other 5 are still in cart.

### Scenario 9: Badge validation

ID: TC-CART-004  
Tag: @web @cart @verify-count @scenario9  
Status: Passes

Verifies that badge updates accurately with each add/remove action.

Steps:

1. Badge not visible (empty cart)
2. Add first product → badge: "1"
3. Add second product → badge: "2"
4. Add third product → badge: "3"
5. Remove one → badge: "2"

Expected: Badge updates in real-time.

## Product Catalog (3 scenarios)

### Scenario 3: Sort by name

ID: TC-PROD-001  
Tag: @web @products @sort-name @scenario3  
Status: Passes

Sorts products by name A-Z.

Steps:

1. Logged in as standard_user
2. Select "Name (A to Z)" from dropdown
3. Read all product names
4. Verify alphabetical order

Expected order:

1. Sauce Labs Backpack
2. Sauce Labs Bike Light
3. Sauce Labs Bolt T-Shirt
4. Sauce Labs Fleece Jacket
5. Sauce Labs Onesie
6. Test.allTheThings() T-Shirt (Red)

Implementation: Compares name list with sorted list.

### Scenario 4: Sort by price

ID: TC-PROD-002  
Tag: @web @products @sort-price @scenario4  
Status: Passes

Sorts products by price from lowest to highest.

Steps:

1. Select "Price (low to high)"
2. Read all prices
3. Verify prices are sorted

Expected order:

1. $7.99 - Onesie
2. $9.99 - Bike Light
3. $15.99 - Bolt T-Shirt
4. $15.99 - Test.allTheThings T-Shirt
5. $29.99 - Backpack
6. $49.99 - Fleece Jacket

### Scenario 5: Product details page

ID: TC-PROD-003  
Tag: @web @products @product-details @scenario5  
Status: Passes

Opens product page and checks details.

Steps:

1. Click on product name "Sauce Labs Backpack"
2. Verify URL changed
3. Verify product name
4. Verify price: $29.99
5. Verify description exists
6. Verify image exists
7. Verify "Add to cart" button
8. Verify "Back to products" link

Expected: All product information is displayed.

## Checkout (2 scenarios)

### Scenario 10: Complete purchase

ID: TC-CHECK-001  
Tag: @web @checkout @complete-purchase @e2e @scenario10  
Status: Passes

End-to-end purchase test.

Steps:

1. Logged in as standard_user
2. Add "Sauce Labs Backpack" to cart
3. Open cart
4. Click "Checkout"
5. Enter:
   - First Name: John
   - Last Name: Doe
   - Postal Code: 10000
6. Click "Continue"
7. Verify product in overview
8. Verify price
9. Verify payment info section
10. Verify shipping info section
11. Verify total (with tax)
12. Click "Finish"
13. Verify success message: "Thank you for your order!"

Expected: Complete checkout flow successfully finished.

Page Object flow:

- ProductsPage → CartPage → CheckoutInfoPage → CheckoutOverviewPage → CheckoutCompletePage

### Scenario 11: Validate overview page

ID: TC-CHECK-002  
Tag: @web @checkout @verify-order @scenario11  
Status: Passes

Verifies that overview page displays correct data before finalization.

Test data:

- Product: Sauce Labs Fleece Jacket
- Price: $49.99

Steps:

1. Add Fleece Jacket to cart
2. Open cart
3. Checkout
4. Fill in data (Jane Smith, 21000)
5. Continue
6. Verify product name
7. Verify product price
8. Verify quantity: 1
9. Verify subtotal: $49.99
10. Verify tax is displayed
11. Verify total = subtotal + tax
12. Verify payment and shipping sections

Expected: All data is correct.

Calculation example:

Item Total: $49.99
Tax: $4.00
Total: $53.99

## Problem User Testing (2 scenarios)

### Scenario 12: Problem user adds item from product detail page

ID: TC-PROBLEM-001  
Tag: @web @problem-user @cart @scenario12 @bug  
Status: Fails (known bug)

Tests cart functionality with problem_user account.

Steps:

1. Log in as problem_user
2. Click "Sauce Labs Backpack" product name
3. Click "Add to cart" on product detail page
4. Navigate to cart
5. Verify product is visible in cart

Expected: Product name "Sauce Labs Backpack" is displayed in cart.

Actual: Cart appears empty, product name is not displayed.

Note: This is a known bug with problem_user account. Adding products from the product detail page causes display issues. However, adding directly from the product list works correctly.

Related: See Detected_Issues.md for full bug report.

### Scenario 13: Problem user checkout with field validation

ID: TC-PROBLEM-002  
Tag: @web @problem-user @checkout @checkout-info-validation @scenario13 @bug  
Status: Expected to fail

Tests checkout flow with problem_user account including field validation.

Steps:

1. Log in as problem_user
2. Add "Sauce Labs Backpack" to cart
3. Add "Sauce Labs Bike Light" to cart
4. Navigate to cart
5. Proceed to checkout
6. Fill checkout information:
   - First Name: John
   - Last Name: Doe
   - Zip Code: 10000
7. Verify fields contain entered values
8. Click Continue button
9. Verify products in overview page
10. Verify order can be completed

Expected: Checkout process completes successfully.

Actual: May fail due to known issues with problem_user account.

Note: Problem user account has multiple intentional bugs. This scenario tests the full checkout flow including field validation before continuing.

## Statistics

### Overall

- Scenarios: 13
- Passed: 11
- Failed: 2 (known bugs with problem_user)
- Pass rate: 85%
- Average time: ~3-4 seconds per test

### By feature

| Feature         | Total | Passed | Failed | Pass % |
| --------------- | ----- | ------ | ------ | ------ |
| Authentication  | 2     | 2      | 0      | 100%   |
| Shopping Cart   | 5     | 4      | 1      | 80%    |
| Product Catalog | 3     | 3      | 0      | 100%   |
| Checkout        | 2     | 2      | 0      | 100%   |

### Known issues

- Problem user cart bug (TC-CART-005) - intentional bug in application

## Test Users

| Username                | Password     | Purpose           |
| ----------------------- | ------------ | ----------------- |
| standard_user           | secret_sauce | Normal tests      |
| locked_out_user         | secret_sauce | Negative tests    |
| problem_user            | secret_sauce | Bug tests         |
| performance_glitch_user | secret_sauce | Performance tests |

## Notes

Page Object pattern is used for all pages. Locators are kept in Page classes, not directly in step definitions.

For more details see README_Web_UI.md and Detected_Issues.md.
