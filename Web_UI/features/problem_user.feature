Feature: Problem User Testing

    # Tests for problem_user account - known to have bugs
    # No Background - each scenario logs in as problem_user

    @web @problem-user @cart @scenario12 @bug
    Scenario: Problem user adds item from product detail page
        # Note: This test is expected to fail due to known bugs with problem_user account
        # The cart does not properly display product names for this user
        # See: Detected_Issues.md for full bug report
        Given User is logged in as "problem_user"
        When Open product "Sauce Labs Backpack"
        And Add product to the cart from product page
        And Go to the cart
        Then "Sauce Labs Backpack" should be visible in the cart

    @web @problem-user @checkout @checkout-info-validation @scenario13 @bug
    Scenario: Problem user checkout with field validation
        Given User is logged in as "problem_user"
        When Add product "Sauce Labs Backpack" to the cart
        And Add product "Sauce Labs Bike Light" to the cart
        And Go to the cart
        When Proceed to checkout with valid data
        Then "Sauce Labs Backpack" should be visible in the overview
        And "Sauce Labs Bike Light" should be visible in the overview
