@api
Feature: User Management API

    @scenario1 @get-users
    Scenario: Get list of users and display odd IDs
        When Send GET request to "/users?page=1"
        Then Response status should be 200
        And Users with odd IDs should be displayed

    @scenario2 @create-user
    Scenario: Create new user and validate creation date
        Given User data with name "Hristina" and job "QA Engineer" is prepared
        When Send POST request to "/users" with payload
        Then Response status should be 201
        And Response should contain user name "Hristina"
        And Response should contain user job "QA Engineer"
        And Creation date should be today

    @scenario3 @update-user
    Scenario: Update user and validate response matches request
        Given User data with name "Hristina" and job "Senior QA" is prepared
        When Send PUT request to "/users/2" with payload
        Then Response status should be 200
        And Response should contain user name "Hristina"
        And Response should contain user job "Senior QA"

    @scenario4 @response-time @fast
    Scenario: Validate fast response time with no delay
        When Send GET request to "/users?delay=0"
        Then Response status should be 200
        And Response time should be less than 1000 ms

    @scenario4 @response-time @slow
    Scenario: Validate response time with 3 second delay
        When Send GET request to "/users?delay=3"
        Then Response status should be 200
        And Response time should be between 3000 and 4000 ms

    @scenario5 @negative @login-error
    Scenario: Login without password should fail
        Given Login payload with email "peter@klaven" but no password is prepared
        When Send POST request to "/login" with payload
        Then Response status should be 400
        And Response error should be "Missing password"
