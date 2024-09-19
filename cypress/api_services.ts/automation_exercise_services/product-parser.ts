// api_services/automation_exercise_services/product-parser.ts
import * as cheerio from 'cheerio';

import { ProductDto } from '../../data_objects/unit_dto/product-dto';
import { CategoryDto } from '../../data_objects/unit_dto/category-dto';
import { UsertypeDto } from '../../data_objects/unit_dto/user-type-dto';

export default class ProductParser {
    // Parses the cart HTML and returns a list of ProductDto
    public parseCartHtml(html: string): ProductDto[] {
        const $ = cheerio.load(html);

        const products: ProductDto[] = [];

        // Select all product rows in the cart table
        $('#cart_info_table tbody tr[id^="product-"]').each((index, element) => {
            const product = this.parseProductRow($(element));
            products.push(product);
        });

        return products;
    }

    // Parses a single product row and extracts the product information into a ProductDto
    private parseProductRow($row: cheerio.Cheerio<any>): ProductDto {
        const id = this.extractProductId($row);
        const name = this.extractProductName($row);
        const price = this.extractProductPrice($row);
        const category = this.extractProductCategory($row);
        const brand = ''; // Brand information is not available on the cart page

        return {
            id,
            name,
            price,
            brand,
            category,
        };
    }

    // Extracts the product ID from the row
    private extractProductId($row: cheerio.Cheerio<any>): number {
        const idAttr = $row.attr('id'); // e.g., 'product-1'
        const id = idAttr ? parseInt(idAttr.replace('product-', ''), 10) : 0;
        return id;
    }

    // Extracts the product name from the row
    private extractProductName($row: cheerio.Cheerio<any>): string {
        const name = $row.find('.cart_description h4 a').text().trim();
        return name;
    }

    // Extracts the product price from the row
    private extractProductPrice($row: cheerio.Cheerio<any>): string {
        const price = $row.find('.cart_price p').text().trim();
        return price;
    }

    // Extracts the product category and usertype from the row
    private extractProductCategory($row: cheerio.Cheerio<any>): CategoryDto {
        const categoryText = $row.find('.cart_description p').text().trim();
        const [usertypeStr, categoryStr] = categoryText.split('>').map(s => s.trim());

        const usertype: UsertypeDto = { usertype: usertypeStr || '' };
        const category: CategoryDto = {
            usertype,
            category: categoryStr || '',
        };

        return category;
    }
}
