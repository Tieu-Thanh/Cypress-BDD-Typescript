import { CategoryDto } from "../data_objects/unit_dto/category-dto";
import { ProductDto } from "../data_objects/unit_dto/product-dto";
import WebElement from "../support/web-element";
import RandomUtil from "../utility/random-util";
import BasePage from "./base-page";
import ProductCard from "./product-card";  // Import ProductCard

export default class ProductsPage extends BasePage {
    private _btnContinueShopping = new WebElement("//button[contains(text(), 'Continue Shopping')]", true);
    private _cardProducts = new WebElement("//div[contains(@class, 'features_items')]//div[contains(@class, 'productinfo')]", true);

    // Add the product to the cart using ProductCard
    public addProductToCart(productId: string) {
        const productCard = new ProductCard(productId);
        productCard.clickAddtoCart();  // Use ProductCard to click Add to Cart
    }

    // Method to get the product ID and return a ProductCard instance
    public addRandomProductToCart() {
        // Find all product elements within the features_items section
        this._cardProducts.getAllElements().then($products => {
            const productCount = $products.length;
            cy.log(`Total products found: ${productCount}`);

            // Select a random product index
            const randomIndex = RandomUtil.getRandomInt(0, productCount - 1);
            const $selectedProduct = Cypress.$($products[randomIndex]);
            const productId = $selectedProduct.find('a').attr('data-product-id');

            // Ensure the productId is valid
            if (!productId) {
                throw new Error('Product ID is undefined');
            }

            cy.log(`Randomly selected product ID: ${productId}`);

            // Create a ProductCard instance and add the product to the cart
            const productCard = new ProductCard(productId);
            productCard.getProductData().then(productData => {
                // Save the product data to Cypress environment
                let addedProducts = Cypress.env('addedProducts') || [];
                addedProducts.push(productData);
                Cypress.env('addedProducts', addedProducts);

                // Add the product to the cart
                productCard.clickAddtoCart();
            });
        });
    }

    public clickContinueShopping() {
        this._btnContinueShopping.click();
    }
}
