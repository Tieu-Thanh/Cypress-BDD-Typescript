import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../page_objects/login-page";
import JsonUtil from "../../utility/json-util";
import { CredentialsDto } from "../../data_objects/credentials-dto";


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

Given('I log in by an account', (dataTable) => {
    const accountData = dataTable.rowsHash();
    const dataKey = accountData['account'];
    JsonUtil.readJsonFile<CredentialsDto>("credentials.json").then((credentials) => {
        loginPage.login(credentials[dataKey]);
    });
});

