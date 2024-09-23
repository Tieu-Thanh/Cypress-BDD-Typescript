import { GetProductsDto } from "../../data_objects/response_dto/get-products-dto";
import APIClient from "../../support/api-client";
import ProductParser from "./product-parser";

// const BASEURL = Cypress.config('baseUrl');
const VIEW_CART_ENDPOINT = '/view_cart';
// const ADD_TO_CART_ENDPOINT = '/add_to_cart/{id}';
const REMOVE_FROM_CART_ENDPOINT = '/delete_cart/';


export default class CartAPI {
    private _apiClient = new APIClient(Cypress.config('baseUrl'));
    private _productParser = new ProductParser();

    // constructor() {
    //     this._apiClient = new APIClient(Cypress.config('baseUrl'));
    //     this._productParser = new ProductParser();
    // }

    // Fetches the cart HTML page and returns parsed products using ProductParser
    public getCartProducts(): Cypress.Chainable<GetProductsDto> {
        return this._apiClient
            .addEndpoint(VIEW_CART_ENDPOINT)
            .executeGet()
            .then(response => {
                const html = response.body as string;
                const products = this._productParser.parseCartHtml(html);
                return {
                    responseCode: response.status,
                    products,
                };
            });
    }

    // Removes a product from the cart by ID
    public removeProductFromCartById(productId: number): void {
        this._apiClient
            .addEndpoint(`${REMOVE_FROM_CART_ENDPOINT}${productId}`)
            .executeGet();
    }
}
