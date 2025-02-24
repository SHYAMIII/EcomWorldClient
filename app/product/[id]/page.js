"use client";
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect, useContext, use } from 'react';
import { CartContext } from '@/app/components/CartContext';
import Link from 'next/link';
import Header from '@/app/components/Header/page';
import Footer from '@/app/components/Footer/page';

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const { AddCart } = useContext(CartContext);
  const { id } = use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center p-10 text-white">Loading...</div>;

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 w-full min-h-screen text-white">
        <div className="flex flex-col md:flex-row bg-transparent justify-between p-6 md:p-12 max-w-5xl mx-auto shadow-lg rounded-xl">
          <div className="flex rounded-xl h-64 w-full md:w-96 items-center justify-center bg-gradient-to-b from-blue-800 to-blue-600 p-6">
            <img
              src={product.images[0]}
              className="hover:scale-110 transition-all duration-300 cursor-pointer rounded-lg shadow-md"
              style={{ maxWidth: '100%', maxHeight: '240px' }}
              alt={product.title}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{product.tittle}</h1>
            <p className="text-lg md:text-2xl mb-2">
              <span className="font-bold">Price</span>: ₹ {product.price}
            </p>
            <p className="text-md md:text-lg mb-4 text-gray-200">{product.discription}</p>
            <button
              onClick={() => AddCart(product._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
            <Link
              href={`/Cart`}
              className="bg-green-500 text-center hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 mt-4"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="px-6 md:px-12 max-w-5xl mx-auto mt-6">
          <div className="bg-gradient-to-b from-blue-800 to-blue-700 p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Product Details</h1>
            <p className="text-md md:text-lg text-gray-200">
              <span className="font-bold">Description</span>: {product.discription}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
