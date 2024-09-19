import { CategoryDto } from "./category-dto"

export interface ProductDto {
    id: number
    name: string
    price: string
    brand: string
    category: CategoryDto
}
