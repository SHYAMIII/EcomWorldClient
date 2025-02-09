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

  if (!product) return <div className="text-center p-10">Loading...</div>;

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-blue-800 to-slate-300 w-full min-h-screen">
        <div className="flex flex-col md:flex-row bg-transparent justify-between p-4 md:p-10 max-w-[1100px] mx-auto">
          <div className="flex rounded-xl h-[250px] w-full md:w-[350px] items-center justify-center flex-col bg-gradient-to-b from-blue-800 to-blue-900 p-[20px]">
            <img
              src={product.images[0]}
              className="hover:scale-105 transition-all cursor-pointer"
              style={{ maxWidth: '100%', maxHeight: '250px' }}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 p-4 md:p-10">
            <h1 className="text-2xl md:text-4xl font-bold">{product.tittle}</h1>
            <p className="text-xl md:text-2xl">
              <span className="font-bold">Price</span> : ₹ {product.price}
            </p>
            <p className="text-sm md:text-base">{product.discription}</p>
            <button
              onClick={() => AddCart(product._id)}
              className="bg-blue-500 hover:scale-105 transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
  >
              Add to cart
            </button>
            <Link
              href={`/Cart`}
              className="bg-green-500 justify-center text-center hover:scale-x-105 transition-all hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Buy now
            </Link>
          </div>
            
        </div>
        <div className="px-4 md:px-10 max-w-[1100px] mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Product Details</h1>
            <p className="mt-2 md:mt-5">
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