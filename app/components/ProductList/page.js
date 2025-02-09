'use client';

import { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/app/components/CartContext';
import Link from 'next/link';


const ProductList = () => {
  const { AddCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Ensure this endpoint returns your products
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    AddCart(product._id);
  };

  if (isLoading) return <p className='w-full text-center p-10'>Loading...</p>;
  if (!products.length) return <div className='w-full text-center p-10'>No products available.</div>;

  return (
    <>
<div className="bg-gradient-to-b from-[#090673] to-blue-500 h-full pb-20 w-full">
  <h1 className="text-3xl p-6 text-gray-400 max-w-[1000px] mx-auto py-[25px] font-extrabold">
    New Arrivals
  </h1>
  <div className="flex max-w-[950px] mx-auto justify-between">
    <div className="grid w-full gap-[20px] grid-cols-1 sm:grid-cols-2 p-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden' key={product._id}>
        <div className='flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-300 p-4'>
          <img
            src={product.images[0]}
            alt={product.title}
            className='object-contain h-40 w-full transition-transform duration-200 hover:scale-105'
          />
        </div>
        <div className='p-1 flex flex-col rounded-lg flex-grow'>
          
        <Link href={`/product/${product._id}`} className='text-[14px] font-bold text-black '>
                  {product.tittle}
                </Link>
          <div className='flex justify-between items-center mt-auto'>
            <span className='text-xl font-bold text-gray-900'>₹ {product.price}</span>
            <button
              onClick={() => addToCart(product)}
              className='bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-800 transition-colors'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      ))}
    </div>
  </div>
</div>

    </>
  );
};

export default ProductList;
