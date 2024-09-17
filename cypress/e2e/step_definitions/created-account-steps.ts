import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreatedAccountPage from "../../page_objects/created-account-page";


var createdAccountPage = new CreatedAccountPage();
When('I click on the Continue button', () => {
    createdAccountPage.clickContinue();
})

Then('I should see Account Created page', () => {
    createdAccountPage.isTitleDisplayed();
})
