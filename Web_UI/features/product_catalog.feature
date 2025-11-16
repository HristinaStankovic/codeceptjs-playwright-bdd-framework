Feature: Product Catalog and Sorting

    Background:
        Given User is logged in as "standard_user"

    @web @products @sorting @sort-name @scenario3
    Scenario: Sort products by name alphabetically
        When Sort products by name
        Then Products should be sorted alphabetically

    @web @products @sorting @sort-price @scenario6
    Scenario: Sort products by price low to high
        When Sort products by price low to high
        Then Products should be sorted by price ascending

    @web @products @product-details @scenario2
    Scenario: View product details and add to cart
        When Open product "Sauce Labs Backpack"
        And Add product to the cart from product page
        And Go to the cart
        Then "Sauce Labs Backpack" should be visible in the cart
