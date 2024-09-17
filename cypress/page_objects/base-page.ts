import WebElement from '../support/web-element';

export default class BasePage {
    private static _lnkNavbar(page: string): WebElement {
        return new WebElement(`//a[contains(text(),'${page}')]`, true);
    }

    public static goToPage(page: string) {
        this._lnkNavbar(page).click();
    }

    public static goToLoginPage() {
        this._lnkNavbar('Signup / Login').click();
    }

    public static isUserLoggedInAs(userName: string) {
        this._lnkNavbar('Logged in as').isContain(userName);
    }
    // public static goToHomePage() {
    //     this._btnNavbar('').click();
    // }

    // public static goToCartPage() {
    //     this._btnNavbar('view_cart').click();
    // }
}
