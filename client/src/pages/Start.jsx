import React, { useEffect } from 'react';

import logoWithLabel from '../assets/logo-with-label.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      navigate('/');
    }
  }, []);

  return (
    <div className='mx-auto h-screen p-5 flex justify-top flex-col items-center text-center gap-5'>
      <img className='w-64 mt-10' src={logoWithLabel} alt={logoWithLabel} />
      <div className='links flex justify-center items-center gap-10 mt-32 flex-col'>
        <Link className='bg-primary text-white align-middle w-80 h-10 rounded-lg flex justify-center items-center' to='/signup'>
          Sign Up
        </Link>
        <div className='text-dark'>Already have an Account!</div>
        <Link className='border-primary text-primary align-middle border-2 w-80 h-10 rounded-lg flex justify-center items-center' to='/login'>
          Log In
        </Link>
      </div>
    </div>
  );
}
