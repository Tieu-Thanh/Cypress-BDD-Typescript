import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
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
