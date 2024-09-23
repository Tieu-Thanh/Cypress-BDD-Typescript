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

    // Find elements by CSS selector or XPath
    findElement(selector: string, isXpath: boolean = false): Cypress.Chainable<JQuery<HTMLElement>> {
        return isXpath ? cy.xpath(selector, { timeout: this.timeout }) : cy.get(selector, { timeout: this.timeout });
    }

    // Get the text of the element(s)
    getText(): Cypress.Chainable<string> {
        return this.getAllElements().invoke('text').then((text) => text.trim());
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

    // Implement hover (trigger mouseover event)
    hover(): Cypress.Chainable {
        return this.getAllElements().trigger('mouseover');
    }
}
