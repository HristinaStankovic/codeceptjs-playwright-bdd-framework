Feature: Checkout Process

    Background:
        Given User is logged in as "standard_user"

    @web @checkout @complete-purchase @e2e
    Scenario: Complete end-to-end purchase flow
        When Add all products to the cart
        And Go to the cart
        And Remove the 3rd item from the cart
        And Proceed to checkout with valid data
        Then Only non-removed items should be visible in the overview
        And Order confirmation should be visible

    @web @checkout @verify-order
    Scenario: Verify items in checkout overview
        When Add product "Sauce Labs Backpack" to the cart
        And Add product "Sauce Labs Bike Light" to the cart
        And Go to the cart
        And Proceed to checkout with valid data
        Then "Sauce Labs Backpack" should be visible in the overview
        And "Sauce Labs Bike Light" should be visible in the overview
        And Order confirmation should be visible
