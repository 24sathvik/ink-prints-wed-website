import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/get-products';

export async function GET() {
    const products = getProducts();
    return NextResponse.json(products);
}
