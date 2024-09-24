import WebElement from "../support/web-element";
import { ProductDto } from "../data_objects/unit_dto/product-dto";
import { CategoryDto } from "../data_objects/unit_dto/category-dto";

export default class ProductCard {
    private productId: string;
    private baseLocator: string = "//div[contains(@class, 'productinfo')]";
    private _btnAddToCart: WebElement;
    private _titlePrice: WebElement;
    private _titleProductName: WebElement;

    constructor(productId: string) {
        this.productId = productId;

        // Adjusted the XPath to dynamically use the productId to target the correct product elements
        this._btnAddToCart = new WebElement(`${this.baseLocator}//a[@data-product-id='${productId}' and contains(@class, 'add-to-cart')]`, true);
        this._titlePrice = new WebElement(`//a[@data-product-id='${productId}']//ancestor::div[contains(@class, 'productinfo')]//h2`, true);
        this._titleProductName = new WebElement(`//a[@data-product-id='${productId}']//ancestor::div[contains(@class, 'productinfo')]//p`, true);

    }

    public getName(): Cypress.Chainable<string> {
        return this._titleProductName.getText().then((name) => {
            cy.log(`Product Name: ${name}`).then(() => {
                return name.trim() || "null";
            });
            // return name.trim() || "null";
        });
    }

    public getPrice(): Cypress.Chainable<string> {
        return this._titlePrice.getText().then((price) => {
            return price.trim() || "null";
        });
    }



    // Method to click "Add to Cart"
    public clickAddtoCart() {
        this._btnAddToCart.hover().click();
    }

    public getProductData(): Cypress.Chainable<ProductDto> {
        return this.getName().then(name => {
            return this.getPrice().then(price => {
                const categoryDto: CategoryDto = {
                    usertype: { usertype: "Default" },
                    category: "Example Category"
                };
                const productData: ProductDto = {
                    id: parseInt(this.productId, 10),
                    name: name.trim() || "Unknown",
                    price: price.trim() || "Unknown",
                    brand: "",
                    category: categoryDto
                };
                return productData;
            });
        });
    }




}
