import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import BasePage from "../../page_objects/base-page";
import WindowHandler from "../../support/window-handler";

Given("I go to the Home page", function () {
    WindowHandler.navigateTo('/');
});

Given('I go to the Login page', () => {
    BasePage.goToLoginPage();
})

Then('I should see the user logged in as {string}', (userName: string) => {
    BasePage.isUserLoggedInAs(userName);
})

Given('I go to Product page', () => {
    BasePage.goToPage('Products');
})

When('I go to View Cart page', () => {
    BasePage.goToPage('Cart');
})
