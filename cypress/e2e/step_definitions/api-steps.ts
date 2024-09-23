import { Given } from "@badeball/cypress-cucumber-preprocessor";
import CartAPI from "../../api_services.ts/automation_exercise_services/cart-api";
import { GetProductsDto } from "../../data_objects/response_dto/get-products-dto";


Given('my cart is empty', () => {
    const cartApi = new CartAPI();
    // Fetch all products in the cart
    cartApi.getCartProducts().then((data: GetProductsDto) => {
        const products = data.products;
        products.forEach((product: any) => {
            cartApi.removeProductFromCartById(product.id);
        });
    });
})
