Feature: Shopping Cart Management

    Background:
        Given User is logged in as "standard_user"

    @web @cart @add-items
    Scenario: Add all products to cart
        When Add all products to the cart
        And Go to the cart
        Then Cart should contain all products

    @web @cart @remove-items @scenario5
    Scenario: Remove all items from cart
        When Add all products to the cart
        And Go to the cart
        And Remove all items from the cart
        Then Cart should be empty

    @web @cart @remove-specific-item @scenario1
    Scenario: Buy items and remove third from cart
        When Add all products to the cart
        And Go to the cart
        And Remove the 3rd item from the cart
        And Proceed to checkout with valid data
        Then Only non-removed items should be visible in the overview
        And Order confirmation should be visible

    @web @cart @verify-count @scenario7
    Scenario: Add multiple items and verify cart count
        When Add product "Sauce Labs Backpack" to the cart
        And Add product "Sauce Labs Bike Light" to the cart
        And Add product "Sauce Labs Bolt T-Shirt" to the cart
        Then Cart badge should show "3" items

    @web @cart @problem-user @scenario2 @bug
    Scenario: Problem user adds item from product detail page
        # Note: This test is expected to fail due to known bugs with problem_user account
        # The cart does not properly display product names for this user
        # See: Detected_Issues.md for full bug report
        Given User is logged in as "problem_user"
        When Open product "Sauce Labs Backpack"
        And Add product to the cart from product page
        And Go to the cart
        Then "Sauce Labs Backpack" should be visible in the cart
