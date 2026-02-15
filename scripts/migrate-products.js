
const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../src/lib/products.ts');
const productsDir = path.join(__dirname, '../src/data/products');
const categoriesDir = path.join(__dirname, '../src/data/categories');

// Ensure directories exist
if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
if (!fs.existsSync(categoriesDir)) fs.mkdirSync(categoriesDir, { recursive: true });

const content = fs.readFileSync(sourcePath, 'utf8');

// Extract products array
// Matches "export const products: Product[] = [" up to the closing "]"
// We need to be careful with nested brackets, but here the structure is simple.
// Let's use a simpler approach: finding the start and end indices.

const productsStartMarker = "export const products: Product[] = [";
const productsStartIndex = content.indexOf(productsStartMarker);

if (productsStartIndex === -1) {
    console.error("Could not find products array start");
    process.exit(1);
}

// Find the end of the products array. It ends before "; export const categories"
const categoriesStartMarker = "export const categories = [";
const categoriesStartIndex = content.indexOf(categoriesStartMarker);

if (categoriesStartIndex === -1) {
    console.error("Could not find categories array start");
    process.exit(1);
}

// Extract product content string
let productsContent = content.substring(
    productsStartIndex + productsStartMarker.length - 1, // Include the opening '['
    categoriesStartIndex
).trim();

// Remove trailing semicolon if present
if (productsContent.endsWith(';')) productsContent = productsContent.slice(0, -1);

// Extract categories content string
// Matches "export const categories = [" up to the generic function start or end of file
const functionsStartMarker = "export function";
const functionsStartIndex = content.indexOf(functionsStartMarker, categoriesStartIndex);

let categoriesContent = "";
if (functionsStartIndex !== -1) {
    categoriesContent = content.substring(
        categoriesStartIndex + "export const categories =".length,
        functionsStartIndex
    ).trim();
} else {
    categoriesContent = content.substring(categoriesStartIndex + "export const categories =".length).trim();
}
if (categoriesContent.endsWith(';')) categoriesContent = categoriesContent.slice(0, -1);


// Function to safely eval the content
// We need to wrap it in parens or assign to var
// Also need to handle any TS specific syntax if present inside the array (none expected for simple data)

try {
    const products = eval(productsContent);
    console.log(`Found ${products.length} products`);

    products.forEach(product => {
        // Use ID as filename
        const filePath = path.join(productsDir, `${product.id}.json`);
        // Remove ID from content if we want, but keeping it is fine. 
        // CMS usually adds it back or uses filename. 
        // Let's keep it for now strictly as per user request to be "perfect".
        // Ensure price is number
        product.price = Number(product.price);
        product.minQuantity = Number(product.minQuantity);
        
        fs.writeFileSync(filePath, JSON.stringify(product, null, 2));
    });
    console.log("Products migrated successfully.");

    const categories = eval(categoriesContent);
    console.log(`Found ${categories.length} categories`);

    categories.forEach(category => {
        const filePath = path.join(categoriesDir, `${category.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(category, null, 2));
    });
    console.log("Categories migrated successfully.");

} catch (e) {
    console.error("Error parsing data:", e);
    // console.log("Products content snippet:", productsContent.substring(0, 500));
}
