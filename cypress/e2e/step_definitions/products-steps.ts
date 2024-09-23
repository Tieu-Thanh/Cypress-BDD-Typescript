import { When } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPage from "../../page_objects/products-page";

var productPage = new ProductsPage();

When('I hover on a random product and click Add to cart button', () => {
    productPage.addRandomProductToCart();
})

When('I click on Continue Shopping button', () => {
    productPage.clickContinueShopping();
})
