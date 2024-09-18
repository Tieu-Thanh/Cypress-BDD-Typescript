@skip
Feature: User Registration

  Background:
    Given I go to the Home page
    And I go to the Login page

  @Successful
  Scenario Outline: Successful registration with all information
    When I enter the name "<name>" and email address "<email>"
    And I click on the Signup button
    And I fill in the registration form with all valid "<data>"
    And I click on the Create Account button
    Then I should see Account Created page
    And I click on the Continue button
    Then I should be redirected to the homepage
    And I should see the user logged in as "<name>"

    Examples:
      | name         | email                  | data  |
      | Thinh Nguyen | thinh7.npp@example.com | user1 |
      | Linh Tran    | linhtran2@gmail.com    | user2 |

  @ExistingEmail
  Scenario Outline: Unsuccessfully registration when entering an existing email
    When I enter the name "<name>" and email address "<existing email>"
    And I click on the Signup button
    Then a warning message is shown

    Examples:
      | name     | existing email         |
      | Thinh NP | thinh7.npp@example.com |
