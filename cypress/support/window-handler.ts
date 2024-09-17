export default class WindowHandler {

    // Navigate to a specified URL
    static navigateTo(url: string, options: Partial<Cypress.VisitOptions> = {}): Cypress.Chainable {
        return cy.visit(url, options);
    }

    // Reload the current page
    static reload(options: Partial<Cypress.Loggable & Cypress.Timeoutable> = {}): Cypress.Chainable {
        return cy.reload(options);
    }

    // Go back in browser history
    static goBack(): Cypress.Chainable {
        return cy.go('back');
    }

    // Go forward in browser history
    static goForward(): Cypress.Chainable {
        return cy.go('forward');
    }

    // Get the current URL
    static getCurrentUrl(): Cypress.Chainable<string> {
        return cy.url();
    }

    // Assert that the current URL matches the provided string or regex
    static assertUrlContains(substringOrRegex: string | RegExp): Cypress.Chainable {
        return cy.url().should('contain', substringOrRegex);
    }

    // Assert that the current URL exactly matches the provided string or regex
    static assertUrlEquals(expectedUrl: string | RegExp): Cypress.Chainable {
        return cy.url().should('eq', expectedUrl);
    }

    // Get the current window object
    static getWindow(): Cypress.Chainable<Window> {
        return cy.window();
    }

    // Set browser window size
    static setWindowSize(width: number, height: number): Cypress.Chainable {
        return cy.viewport(width, height);
    }

    // Assert that the current window size matches specified width and height
    static assertWindowSize(width: number, height: number): Cypress.Chainable {
        return cy.viewport(width, height).then(() => {
            cy.window().its('outerWidth').should('equal', width);
            cy.window().its('outerHeight').should('equal', height);
        });
    }

    // Scroll to the top of the page
    static scrollToTop(): Cypress.Chainable {
        return cy.scrollTo('top');
    }

    // Scroll to the bottom of the page
    static scrollToBottom(): Cypress.Chainable {
        return cy.scrollTo('bottom');
    }

    // Open a new tab or window with the given URL (Note: Cypress doesn't support multi-tab directly)
    static openInNewTab(url: string): void {
        cy.window().then((win) => {
            win.open(url, '_blank');
        });
    }

    // Assert that the window location matches a certain hostname
    static assertHostName(hostname: string): Cypress.Chainable {
        return cy.location('hostname').should('eq', hostname);
    }

    // Assert that the window protocol is as expected (e.g., 'https')
    static assertProtocol(protocol: string): Cypress.Chainable {
        return cy.location('protocol').should('eq', protocol + ':');
    }

    // Assert that the window pathname matches a specific string
    static assertPathname(pathname: string): Cypress.Chainable {
        return cy.location('pathname').should('eq', pathname);
    }

    // Get window location (e.g., hostname, pathname, protocol)
    static getLocation(): Cypress.Chainable<Location> {
        return cy.location();
    }
}
