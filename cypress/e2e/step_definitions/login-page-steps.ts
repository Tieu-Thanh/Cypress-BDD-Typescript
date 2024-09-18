import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../page_objects/login-page";


const loginPage = new LoginPage();

When('I enter the name {string} and email address {string}', (name: string, email: string) => {
    loginPage.typeSignupName(name);
    loginPage.typeSignupEmail(email);
})

When('I click on the Signup button', () => {
    loginPage.clickSignup();
})

Then('a warning message is shown', () => {
    loginPage.isWarningMessageDisplayed();
})
