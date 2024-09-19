import { ProductDto } from "../unit_dto/product-dto"

export interface GetProductsDto {
    responseCode: number
    products: ProductDto[]
}
