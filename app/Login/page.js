"use client";
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header/page';
import Footer from '../components/Footer/page';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  /**
   * Handles the login form submission.
   * @param {Event} e The form submission event.
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = '/';
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  return (<>
  <Header/>
    <div className='bg-[#cecece] h-[100vh] p-4 flex justify-center'>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='my-2' htmlFor='email'>
              Email
            </label>
            <input
              className='border-2 p-2 rounded-md'
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>
          <div className='flex flex-col my-4'>
            <label className='my-2' htmlFor='password'>
              Password
            </label>
            <input
              className='border-2 p-2 rounded-md'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>
          <button
            className='bg-blue-500 text-white p-2 rounded-md'
            type='submit'
          >
            Login
          </button>
          {error && <p className='text-red-500'>{error}</p>}
        </form>
        <p className='text-center my-4'>
          Don't have an account?{' '}
          <Link href='/signup'
             className='text-blue-500 underline'>Sign up
          </Link>
        </p>
      </div>
    </div>
    <Footer/>
             </>
  );
};

export default Login;