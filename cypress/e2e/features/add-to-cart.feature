Feature: User add products in cart

  Background:
    Given I go to the Home page
    And I go to the Login page
    And I log in by an account
      | key     | value        |
      | account | credentials1 |
    And I go to Product page
    And my cart is empty

  @AddToCart
  Scenario Outline: Successful add products in cart
    When I hover on a random product and click Add to cart button
    And I click on Continue Shopping button
    And I hover on a random product and click Add to cart button
    And I click on Continue Shopping button
    And I go to View Cart page
    Then products are added to Cart properly
