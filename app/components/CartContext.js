"use client";
import { createContext, useState } from "react";

export const CartContext = createContext({});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function AddCart(id) {
        setCartProducts((prev) => [...prev, id]);
    }

    function RemoveCart(id) {
        setCartProducts((prev) => prev.filter((item) => item !== id));
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, RemoveCart, AddCart }}>
            {children}
        </CartContext.Provider>
    );
}
