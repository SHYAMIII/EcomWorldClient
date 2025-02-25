  'use client';

  import { useState, useEffect, useContext } from 'react';
  import { CartContext } from '@/app/components/CartContext';
  import Link from 'next/link';

  const Products = () => {
    const { AddCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/Allproducts'); // Ensure this endpoint returns your products
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
      <div className='bg-gradient-to-b from-[#000936] to-[#1430b8] min-h-screen pb-20 w-full'>
        <h1 className='text-4xl text-gray-400 max-w-[1000px] mx-auto p-6 font-extrabold'>ALL PRODUCTS</h1>
        <div className='max-w-[1000px] mx-auto px-4'>
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
              <div className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden' key={product._id}>
              <div className='flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-300 p-4'>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className='object-contain h-40 w-full transition-transform duration-200 hover:scale-105'
                />
              </div>
              <div className='p-1 flex flex-col flex-grow'>
                
              <Link href={`/product/${product._id}`} className='text-[14px] text-black  font-bold'>
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
    );
  };

  export default Products;
