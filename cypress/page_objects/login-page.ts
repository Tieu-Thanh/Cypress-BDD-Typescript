import { CredentialsDto } from '../data_objects/credentials-dto';
import WebElement from '../support/web-element';
import BasePage from './base-page';

export default class LoginPage extends BasePage {

    private _txtField(selector: string): WebElement { return new WebElement(`//input[@data-qa='${selector}']`, true); }
    private _btnSubmit(selector: string): WebElement {
        return new WebElement(`button[data-qa='${selector}']`);
    }
    private _msgEmailExist = new WebElement(`//p[contains(text(), 'Email Address already exist!')]`, true);

    public typeSignupName(name: string) {
        this._txtField("signup-name").enter(name);
    }

    public typeSignupEmail(email: string) {
        this._txtField("signup-email").enter(email);
    }

    public typeLoginEmail(email: string) {
        this._txtField("login-email").enter(email);
    }

    public typeLoginPassword(password: string) {
        this._txtField("login-password").enter(password);
    }

    public clickSignup() {
        this._btnSubmit("signup-button").click();
    }

    public clickLogin() {
        this._btnSubmit("login-button").click();
    }

    public login(credentials: CredentialsDto){
        this.typeLoginEmail(credentials.email);
        this.typeLoginPassword(credentials.password);
        this.clickLogin();
    }

    public isWarningMessageDisplayed() {
        return this._msgEmailExist.isExist();
    }
}
