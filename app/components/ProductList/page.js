"use client";

import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/app/components/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductList = () => {
  const { AddCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    AddCart(product._id);
  };

  if (isLoading) {
    return (
      <p className="w-full text-center p-10 text-white">Loading...</p>
    );
  }

  if (!products.length) {
    return (
      <div className="w-full text-center p-10 text-white">
        No products available.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen pb-20 w-full">
      <h1 className="text-3xl p-6 text-gray-200 max-w-[1000px] mx-auto py-6 font-extrabold">
        New Arrivals
      </h1>
      <div className="max-w-[950px] mx-auto px-4">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-48 w-full">
                <motion.img
                  src={product.images[0]}
                  alt={product.tittle}
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
              </div>
              <div className="p-4 flex flex-col">
                <Link href={`/product/${product._id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                    {product.tittle}
                  </h2>
                </Link>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-900">
                    ₹ {product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
