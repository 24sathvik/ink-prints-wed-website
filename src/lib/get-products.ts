import fs from 'fs';
import path from 'path';
import { Product } from './products';

// Helper to read all JSON files from a directory
export function getProducts(): Product[] {
    const productsDir = path.join(process.cwd(), 'src/data/products');

    if (!fs.existsSync(productsDir)) {
        return [];
    }

    const files = fs.readdirSync(productsDir);
    const products = files
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
            const filePath = path.join(productsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            try {
                const product = JSON.parse(fileContent);
                // Ensure ID matches filename if not present or just for consistency
                return {
                    ...product,
                    id: product.id || file.replace('.json', ''),
                };
            } catch (e) {
                console.error(`Error parsing product file: ${file}`, e);
                return null;
            }
        })
        .filter((product): product is Product => product !== null);

    return products;
}

export function getCategories() {
    const categoriesDir = path.join(process.cwd(), 'src/data/categories');

    if (!fs.existsSync(categoriesDir)) {
        return [];
    }

    const files = fs.readdirSync(categoriesDir);
    return files
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
            const filePath = path.join(categoriesDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            try {
                return JSON.parse(fileContent);
            } catch (e) {
                console.error(`Error parsing category file: ${file}`, e);
                return null;
            }
        })
        .filter((cat) => cat !== null);
}

export function getProductById(id: string): Product | undefined {
    const products = getProducts();
    return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
    const products = getProducts();
    return products.filter((p) => p.featured);
}
