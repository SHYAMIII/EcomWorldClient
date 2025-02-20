"use client"
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    // useEffect(() => {
    //     // Check if localStorage is available
    //     if (typeof window !== 'undefined' && window.localStorage) {
    //       const storedCart = localStorage.getItem('cartProducts');
    //       if (storedCart) {
    //         setCartProducts(JSON.parse(storedCart));
    //       }
    //     }
    //   }, []);
    
      // useEffect(() => {
      //   // Update localStorage whenever cartProducts changes
      //   if (typeof window !== 'undefined' && window.localStorage) {
      //     localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      //   }
      // }, [cartProducts]);
    
    
    function AddCart(id) {
        setCartProducts((prev) => [...prev, id]);
    };
    function RemoveCart(id) {
      setCartProducts((prev)=>{
        const pos= prev.indexOf(id);
        return prev.filter((value, index) => index !== pos);
      })
    }
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, RemoveCart, AddCart }}>
            {children}
        </CartContext.Provider>
    );
}