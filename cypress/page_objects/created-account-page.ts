import WebElement from "../support/web-element";
import BasePage from "./base-page";


export default class CreatedAccountPage extends BasePage{
    private _txtTitle = new WebElement("h2[data-qa='account-created']");
    private _btnContinue = new WebElement("a[data-qa='continue-button']");

    public isTitleDisplayed(){
        return cy.url().should('contain', 'account_created') && this._txtTitle.isExist();
    }

    public clickContinue(){
        this._btnContinue.click();
    }
}
