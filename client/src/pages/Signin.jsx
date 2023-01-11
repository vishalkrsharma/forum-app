import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import logoWithLabel from '../assets/logo-with-label.png';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className='mx-auto h-screen p-5'>
      <form className='mx-auto flex justify-center items-center flex-col h-3/4 gap-6 relative w-80'>
        <img className='h-44 mx-auto' src={logoWithLabel} alt={logoWithLabel} />
        <div className='text-xl text-primary font-medium'>Sign In</div>
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
        <button
          className='text-secondary text-2xl hover:text-primary absolute'
          type='button'
          onClick={() => setIsVisible(!isVisible)}
          style={{ marginTop: '264px', right: '12.5px' }}
        >
          {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
        <button className='bg-primary text-white w-full h-10 rounded-lg' type='submit' onClick={submitHandler}>
          Sign In
        </button>
        <div>
          Don't have an account?&nbsp;&nbsp;
          <Link className='text-secondary hover:text-primary' to={'/signup'}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
