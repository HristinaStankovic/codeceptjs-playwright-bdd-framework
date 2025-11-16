Feature: Authentication

    Background:
        Given User is on the SauceDemo login page

    @web @authentication @standard-login
    Scenario: Standard user successfully logs in
        Given User is logged in as "standard_user"
        Then Products page should be visible

    @web @authentication @locked-out
    Scenario: Locked out user cannot login
        When User tries to login as "locked_out_user"
        Then Login error containing "locked out" should be visible
