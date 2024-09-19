import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import SignupPage from "../../page_objects/signup-page";
import JsonUtil from "../../utility/json-util";
import { AccountDto } from "../../data_objects/account-dto";

var signupPage = new SignupPage();

When('I fill in the registration form with all valid {string}', (dataKey: string) => {
    JsonUtil.readJsonFile<AccountDto>("users.json").then((users) => {
        const data = users[dataKey];
        signupPage.fillRegistrationForm(data);
    });
})

When('I click on the Create Account button', () => {
    signupPage.clickCreateAccount();
})
