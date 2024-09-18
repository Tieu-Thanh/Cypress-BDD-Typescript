import { AccountDto } from '../data_objects/account-dto';
import WebElement from '../support/web-element';
import BasePage from './base-page';

export default class SignupPage extends BasePage {

    // Fields
    private _txtField(selector: string): WebElement {
        return new WebElement(`//input[@data-qa='${selector}']`, true);
    }
    private _selectField(selector: string): WebElement {
        return new WebElement(`//select[@data-qa='${selector}']`, true);
    }
    private _radioField(selector: string): WebElement {
        return new WebElement(`//input[@id='${selector}']`, true);
    }
    private _checkboxField(selector: string): WebElement {
        return new WebElement(`//input[@id='${selector}']`, true);
    }
    private _btnSubmit(selector: string): WebElement {
        return new WebElement(`//button[@data-qa='${selector}']`, true);
    }
    
    // Methods for interacting with form fields
    public selectTitle(title: string) {
        const titleSelector = title === "Mr" ? "id_gender1" : "id_gender2";
        this._radioField(titleSelector).click();
    }

    public enterName(name: string) {
        this._txtField("name").enter(name);
    }

    public enterEmail(email: string) {
        this._txtField("email").enter(email);
    }

    public enterPassword(password: string) {
        this._txtField("password").enter(password);
    }

    public selectDay(day: string) {
        this._selectField("days").select(day);
    }

    public selectMonth(month: string) {
        this._selectField("months").select(month);
    }

    public selectYear(year: string) {
        this._selectField("years").select(year);
    }

    public enterFirstName(firstName: string) {
        this._txtField("first_name").enter(firstName);
    }

    public enterLastName(lastName: string) {
        this._txtField("last_name").enter(lastName);
    }

    public enterCompany(company: string) {
        this._txtField("company").enter(company);
    }

    public enterAddress(address: string) {
        this._txtField("address").enter(address);
    }

    public enterAddress2(address2: string) {
        this._txtField("address2").enter(address2);
    }

    public selectCountry(country: string) {
        this._selectField("country").select(country);
    }

    public enterState(state: string) {
        this._txtField("state").enter(state);
    }

    public enterCity(city: string) {
        this._txtField("city").enter(city);
    }

    public enterZipcode(zipcode: string) {
        this._txtField("zipcode").enter(zipcode);
    }

    public enterMobileNumber(mobile: string) {
        this._txtField("mobile_number").enter(mobile);
    }

    public checkNewsletter() {
        this._checkboxField("newsletter").check();
    }

    public checkOptin() {
        this._checkboxField("optin").check();
    }

    public clickCreateAccount() {
        this._btnSubmit("create-account").click();
    }

    // Method to fill in the form using the RegistrationData object
    public fillRegistrationForm(data: AccountDto) {
        // Select title (Mr. or Mrs.)
        const titleSelector = data.title === "Mr" ? "id_gender1" : "id_gender2";
        this._radioField(titleSelector).click();

        // Fill the rest of the form fields
        this._txtField("name").enter(data.name);
        // this._txtField("email").enter(data.email);
        this._txtField("password").enter(data.password);
        this._selectField("days").select(data.day);
        this._selectField("months").select(data.month);
        this._selectField("years").select(data.year);
        this._txtField("first_name").enter(data.first_name);
        this._txtField("last_name").enter(data.last_name);
        this._txtField("company").enter(data.company);
        this._txtField("address").enter(data.address);
        this._txtField("address2").enter(data.address2);
        this._selectField("country").select(data.country);
        this._txtField("state").enter(data.state);
        this._txtField("city").enter(data.city);
        this._txtField("zipcode").enter(data.zipcode);
        this._txtField("mobile_number").enter(data.mobile_number);

        // Handle optional checkboxes
        if (data.newsletter) {
            this._checkboxField("newsletter").check();
        }
        if (data.optin) {
            this._checkboxField("optin").check();
        }
    }
}
