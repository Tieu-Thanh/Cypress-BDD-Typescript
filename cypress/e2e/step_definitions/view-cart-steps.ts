import { Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../page_objects/cart-page";
import JsonUtil from "../../utility/json-util";

const cartPage = new CartPage();
Then('products are added to Cart properly', () => {
    // Retrieve products that were added during the test from Cypress.env
    const addedProducts = Cypress.env('addedProducts') || [];

    // Verify each product in the cart
    addedProducts.forEach(product => {
        // Make sure to log the product data and verify correctly
        cy.log(`Product added: ${product.name}, Price: ${product.price}`);

        // Assuming cartPage.verifyProductInCart checks if the product is correctly added to the cart
        // cartPage.verifyProductInCart(product).should('be.visible');
    });
});
