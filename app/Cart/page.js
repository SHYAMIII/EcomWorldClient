"use client"
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/page';
import { CartContext } from '../components/CartContext';
import Footer from '../components/Footer/page';
import { TotalContext } from '../components/TotalContext';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { setcartProducts, cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const { AddCart, RemoveCart } = useContext(CartContext);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [postel, setpostel] = useState('');
  const { total, setTotal } = useContext(TotalContext);
  const upiId = '7878260840@ybl';
  const [utr, setutr] = useState('');
  const upiUrl = `upi://pay?pa=${upiId}&pn=shyam ghosh`;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: cartProducts }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, [cartProducts]);

  useEffect(() => {
    const total = products.reduce((acc, product) => {
      const quantity = cartProducts.filter((id) => id === product._id).length;
      return acc + product.price * quantity;
    }, 0);
    setTotal(total);
  }, [products, cartProducts, setTotal]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, address, postel, cartProducts, utr }),
      });
      const data = await response.json();
      router.push('/success');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='bg-gradient-to-b from-indigo-700 via-blue-500 to-pink-500 min-h-screen pt-10 px-4 sm:px-0'>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-[970px] mx-auto">
          <div className="col-span-2 bg-zinc-200 h-full sm:h-[88vh] overflow-auto rounded-xl bg-white p-8">

            <h1 className='text-2xl text-gray-600 font-bold'>Cart</h1>
            <table className='w-full'>
              <thead className='border-b border-b-gray-600'>
                <tr>
                  <td className='p-2 min-w-[50%] text-zinc-600'>Products</td>
                  <td className='p-2 text-zinc-600'>Quantity</td>
                  <td className='p-2 text-zinc-600'>Price</td>
                </tr>
              </thead>
              <tbody className='pt-2'>
                {cartProducts.length === 0 && (
                  <tr>
                    <td colSpan="3" className="w-full text-center p-10">Cart is empty</td>
                  </tr>
                )}
                {cartProducts.length > 0 && products.map((product, index) => (
                  <tr key={index} className='' >
                    <td>
                      <div className="flex flex-col ">
                        <div className="flex-shrink-0 h-32 w-32">
                          <img className="h-32 w-32 " src={product.images[0]} alt={product.name} />
                        </div>
                        <div className="mb-4 w-full sm:w-[90%] px-5">
                          <div className="text-sm font-medium text-gray-900">{product.tittle}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-2'>
                      <div className='flex gap-1 items-center px-2'>

                        <button onClick={() => RemoveCart(product._id)} className='bg-sky-900 text-white font-bold  px-2 rounded-md'>-</button>
                        <div className="text-sm text-gray-900">{cartProducts.filter((id) => id === product._id).length}</div>
                        <button className='bg-sky-900 text-white font-bold px-2 rounded-md'
                          onClick={() => AddCart(product._id)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-2 text-sm'>
                      <div className="text-sm text-gray-900">₹ {cartProducts.filter((id) => id === product._id).length * product.price}</div>
                    </td>
                  </tr>
                ))}
                <tr className='border-t border-t-gray-600'>
                  <td></td>
                  <td>Total amount :</td>
                  <td>₹ {total}</td>
                </tr>
              </tbody>
            </table>

          </div>

          {cartProducts.length > 0 && (
            <div className="col-span-1 mx-auto  bg-zinc-200 rounded-xl bg-white p-4">
              <h2 className='text-2xl text-gray-600 font-bold mb-2 border-b border-b-gray-700'>Your information</h2>
              <form onSubmit={handleCheckout}>
                <input className='border w-full sm:w-60 border-gray-600 text-[10px] mb-2 rounded-lg p-2' onChange={e => setname(e.target.value)} value={name} name="name" type="text" placeholder="Name" />
                <input className='border w-full sm:w-60 border-gray-600 text-[10px] mb-2 rounded-lg p-2' onChange={e => setemail(e.target.value)} value={email} name="email" type="text" placeholder="Email" />
                <input className='border w-full sm:w-60 border-gray-600 text-[10px] mb-2 rounded-lg p-2' onChange={e => setphone(e.target.value)} value={phone} name="phone" type="number" placeholder="Phone" />
                <input className='border w-full sm:w-60 border-gray-600 text-[10px] mb-2 rounded-lg p-2' onChange={e => setaddress(e.target.value)} value={address} name="address" type="text" placeholder="Address" />
                <input className='border w-full sm:w-60 border-gray-600 text-[10px] mb-2 rounded-lg p-2' onChange={e => setpostel(e.target.value)} value={postel} name="postel" type="text" placeholder="Postel" />
                <input type="hidden" name='cartProducts' value={cartProducts} />
                <div className='w-full'>
                  <QRCodeSVG value={upiUrl} className='w-full h-full p-8' />
                  <p className='mt-2'>UPI ID: {upiId}</p>
                  <input type="text" placeholder='Enter UTR Number' name='utr' value={utr} onChange={(e) => setutr(e.target.value)} className='border-2 w-full sm:w-60 border-gray-400 rounded-lg p-2 mt-4' />
                </div>
                <button className='w-full bg-sky-900 px-3 mt-3 text-white py-2 rounded-xl'>
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
      <Footer />

    </>
  )
}

export default Cart
/******  6ee13777-19b0-4caf-8417-f0b51ad4fc82  *******/