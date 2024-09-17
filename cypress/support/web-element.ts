// export default class WebElement {
//     locator: string;
//     isXpath: boolean;
//     timeout: number;

//     constructor(locator: string, isXpath: boolean = false, timeout: number = 2000) {
//         this.locator = locator;
//         this.isXpath = isXpath;
//         this.timeout = timeout;
//     }

//     // Get all elements (supports both CSS and XPath)
//     getAllElements() {
//         return this.isXpath ? cy.xpath(this.locator) : cy.get(this.locator);
//     }

//     // Get the element count
//     getElementCount() {
//         return this.getAllElements().its('length');
//     }

//     // Check if the element exists
//     isExist() {
//         return this.getAllElements().should('exist');
//     }

//     // Check if the element does not exist
//     isNotExist() {
//         return this.getAllElements().should('not.exist');
//     }

//     // Check if the element is visible
//     isVisible() {
//         return this.getAllElements().should('be.visible');
//     }

//     // Check if the element is not visible
//     isNotVisible() {
//         return this.getAllElements().should('not.be.visible');
//     }

//     // Scroll element into view
//     scrollIntoView() {
//         this.getAllElements().scrollIntoView();
//     }

//     // Ensure the element is not disabled
//     ensureNotDisabled() {
//         this.getAllElements().should('not.be.disabled');
//     }

//     // Ensure the element is not readonly
//     ensureNotReadonly() {
//         this.getAllElements().should('not.be.readonly');
//     }

//     // Ensure the element is not animating
//     ensureNotAnimating() {
//         this.getAllElements().should('not.have.css', 'animation');
//     }

//     // Ensure the element is not detached from the DOM
//     ensureNotDetached() {
//         this.getAllElements().should('not.be.detached');
//     }

//     // Click the element
//     click() {
//         this.getAllElements().click();
//     }

//     // Double-click the element
//     dblclick() {
//         this.getAllElements().dblclick();
//     }

//     // Type into the element
//     type(text: string) {
//         this.getAllElements().clear();
//         this.getAllElements().type(text);
//     }

//     // Clear the input field
//     clear() {
//         this.getAllElements().clear();
//     }

//     check() {
//         this.getAllElements().check();
//     }

//     select(text: string) {
//         this.getAllElements().select(text);
//     }
// }
export default class WebElement {
    locator: string;
    isXpath: boolean;
    timeout: number;

    constructor(locator: string, isXpath: boolean = false, timeout: number = 2000) {
        this.locator = locator;
        this.isXpath = isXpath;
        this.timeout = timeout;
    }

    // Retrieve element(s), supports both CSS and XPath
    getAllElements(): Cypress.Chainable {
        return this.isXpath ? cy.xpath(this.locator, { timeout: this.timeout }) : cy.get(this.locator, { timeout: this.timeout });
    }

    // Get element count
    getElementCount(): Cypress.Chainable<number> {
        return this.getAllElements().its('length');
    }

    // Check if the element exists
    isExist(): Cypress.Chainable {
        return this.getAllElements().should('exist');
    }

    // Check if the element is visible
    isVisible(): Cypress.Chainable {
        return this.getAllElements().should('be.visible');
    }

    isContain(text: string): Cypress.Chainable {
        return this.getAllElements().should('contain', text);
    }

    // Ensure the element is visible and not disabled
    ensureVisibleAndEnabled(): Cypress.Chainable {
        return this.getAllElements().should('be.visible').should('not.be.disabled');
    }

    // Ensure the element is ready for interaction (not readonly, not animating, not detached)
    ensureReadyForInteraction(): Cypress.Chainable {
        return this.getAllElements()
            .should('not.have.css', 'animation')
            .should('not.be.readonly')
            .should('not.be.detached');
    }

    // Scroll element into view
    scrollIntoView(): Cypress.Chainable {
        return this.getAllElements().scrollIntoView();
    }

    // Click the element
    click(): Cypress.Chainable {
        return this.ensureVisibleAndEnabled().click();
    }

    // Double-click the element
    dblclick(): Cypress.Chainable {
        return this.ensureVisibleAndEnabled().dblclick();
    }

    // Type text into the element, ensuring it's clear first
    enter(text: string): Cypress.Chainable {
        return this.ensureVisibleAndEnabled().clear().type(text);
    }

    // Clear the input field
    clear(options: Partial<Cypress.ClearOptions> = {}): Cypress.Chainable {
        return this.ensureVisibleAndEnabled().clear();
    }

    // Check a checkbox or radio button
    check(): Cypress.Chainable {
        return this.ensureVisibleAndEnabled().check();
    }

    // Select an option from a dropdown
    select(text: string): Cypress.Chainable {
        return this.ensureVisibleAndEnabled().select(text);
    }
}
