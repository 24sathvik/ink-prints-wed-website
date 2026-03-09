"use client";

import { useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    quantity: number;
    title: string;
    price: number;
    image: string;
}

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load initial state isolated entirely via localStorage per Chrome Profile
        const saved = localStorage.getItem('inkprints_cart');
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart items", e);
            }
        }
    }, []);

    const addToCart = (item: CartItem) => {
        const newCart = [...cartItems];
        const existingNode = newCart.find(i => i.id === item.id);

        if (existingNode) {
            existingNode.quantity += item.quantity;
        } else {
            newCart.push(item);
        }

        setCartItems(newCart);
        localStorage.setItem('inkprints_cart', JSON.stringify(newCart));
    };

    const removeFromCart = (id: string) => {
        const newCart = cartItems.filter(i => i.id !== id);
        setCartItems(newCart);
        localStorage.setItem('inkprints_cart', JSON.stringify(newCart));
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return { cartItems, addToCart, removeFromCart, cartTotal };
}
