import { ProductDto } from "../data_objects/unit_dto/product-dto";
import WebElement from "../support/web-element";
import BasePage from "./base-page";

export default class CartPage extends BasePage {
    // Update the selector to target the <tr> elements
    private cartRows = new WebElement("#cart_info_table tbody tr");

    public getCartProducts(): Cypress.Chainable<ProductRow[]> {
        return this.cartRows.getAllElements().then($rows => {
            const productsInCart: ProductRow[] = [];

            $rows.each((index, element) => {
                const $row = Cypress.$(element);
                const idAttr = $row.attr('id'); // 'product-29'

                // Ensure idAttr is a string before using it
                if (typeof idAttr === 'string' && idAttr.startsWith('product-')) {
                    const productId = idAttr.replace('product-', '');
                    const productRow = new ProductRow(productId);
                    productsInCart.push(productRow);
                } else {
                    cy.log(`Row at index ${index} does not have a valid id attribute.`);
                }
            });

            return productsInCart;
        });
    }

    public verifyProductInCart(product: ProductDto): Cypress.Chainable<void> {
        return this.getCartProducts().then(productRows => {
            const matchingProductRow = productRows.find(pr => pr.productId === product.id.toString());

            // Assert that the product exists in the cart
            expect(matchingProductRow, `Product with ID ${product.id} should be in the cart`).to.not.be.undefined;

            if (matchingProductRow) {
                // Return the chainable to ensure proper execution
                return matchingProductRow.getDescription().then(name => {
                    expect(name.trim()).to.equal(product.name);
                }).then(() => {
                    return matchingProductRow.getPrice().then(price => {
                        expect(price.trim()).to.equal(product.price);
                    });
                });
            } else {
                // Fail the test if the product is not found
                throw new Error(`Product with ID ${product.id} not found in the cart`);
            }
        });
    }


}

class ProductRow {
    private _productId: string;
    private _txtProductDescription: WebElement;
    private _txtProductPrice: WebElement;
    private _btnProductQuantity: WebElement;
    private _txtProductTotal: WebElement;

    constructor(productId: string) {
        this._productId = productId;
        this._txtProductDescription = new WebElement(`#product-${productId} .cart_description h4 a`);
        this._txtProductPrice = new WebElement(`#product-${productId} .cart_price p`);
        this._btnProductQuantity = new WebElement(`#product-${productId} .cart_quantity button`);
        this._txtProductTotal = new WebElement(`#product-${productId} .cart_total .cart_total_price`);
    }

    public get productId(): string {
        return this._productId;
    }

    public getDescription(): Cypress.Chainable<string> {
        return this._txtProductDescription.getText();
    }

    public getPrice(): Cypress.Chainable<string> {
        return this._txtProductPrice.getText();
    }

    public getQuantity(): Cypress.Chainable<string> {
        return this._btnProductQuantity.getText();
    }

    public getTotal(): Cypress.Chainable<string> {
        return this._txtProductTotal.getText();
    }
}
