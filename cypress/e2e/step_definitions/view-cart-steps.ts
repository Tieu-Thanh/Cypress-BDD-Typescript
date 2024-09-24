import { Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../page_objects/cart-page";
import { ProductDto } from "../../data_objects/unit_dto/product-dto";

const cartPage = new CartPage();
Then('products are added to Cart properly', () => {
    // Retrieve products that were added during the test from Cypress.env
    const addedProducts: ProductDto[] = Cypress.env('addedProducts') || [];

    // Verify each product in the cart
    cy.wrap(addedProducts).each((product: ProductDto) => {
        // Log the product data
        cy.log(`Verifying product in cart: ${product.name}, Price: ${product.price}`);

        // Return the chainable to ensure proper execution
        return cartPage.verifyProductInCart(product);
    });
});
