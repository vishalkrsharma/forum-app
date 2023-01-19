import React from 'react';

import logoWithLabel from '../assets/logo-with-label.png';
import doodleArt from '../assets/doodle-art.png';
import { Link } from 'react-router-dom';

export default function Start() {
  return (
    <div className='mx-auto h-screen p-5 flex justify-around flex-col items-center text-center'>
      <img className='w-64' src={doodleArt} alt={doodleArt} />
      <img className='w-64' src={logoWithLabel} alt={logoWithLabel} />
      <Link className='bg-primary text-white align-middle w-80 h-10 rounded-lg flex justify-center items-center' to='/signup'>
        Sign Up
      </Link>
      <div className='text-dark'>Already have an Account!</div>
      <Link className='border-primary text-primary align-middle border-2 w-80 h-10 rounded-lg flex justify-center items-center' to='/login'>
        Log In
      </Link>
    </div>
  );
}
