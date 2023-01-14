import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import logoWithLabel from '../assets/logo-with-label.png';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
  };

  return (
    <div className='mx-auto h-screen p-5'>
      <form className='mx-auto flex justify-top items-center flex-col h-screen gap-6 relative w-80'>
        <img className='h-44 mx-auto' src={logoWithLabel} alt={logoWithLabel} />
        <div className='text-xl text-primary font-medium'>Sign Up</div>
        <label className='w-11/12 text-primary -mb-5 font-medium' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='w-11/12 text-primary -mb-5 font-medium' htmlFor='password'>
          Password
        </label>
        <input
          id='password'
          className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-primary w-full'
          type={isVisible ? 'text' : 'password'}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className='w-11/12 text-primary -mb-5 font-medium' htmlFor='confirmPassword'>
          Confirm Password
        </label>
        <input
          id='confirmPassword'
          className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-primary w-full'
          type={isVisible ? 'text' : 'password'}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className='text-secondary text-2xl hover:text-primary absolute'
          type='button'
          onClick={() => setIsVisible(!isVisible)}
          style={{ marginTop: '386px', right: '12.5px' }}
        >
          {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
        <button className='bg-primary text-white w-full h-10 rounded-lg' type='submit' onClick={submitHandler}>
          Sign Up
        </button>
        <div>
          Already have an account!&nbsp;&nbsp;
          <Link className='text-secondary hover:text-primary' to={'/login'}>
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
