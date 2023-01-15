import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import logoWithLabel from '../assets/logo-with-label.png';

export default function Signup() {
  const emailValidatorRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
  };

  return (
    <div className='mx-auto h-screen p-5'>
      <img className='h-44 mx-auto' src={logoWithLabel} alt={logoWithLabel} />
      <form className='mx-auto flex justify-top items-center flex-col gap-7 relative w-80 mt-5'>
        <div className='text-xl text-primary font-medium'>Sign Up</div>

        <label className='w-11/12 text-primary -mb-5 font-medium' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
          type='email'
          placeholder='Email'
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEmailValid(emailValidatorRegex.test(email) || email.length == 0 ? true : false);
          }}
        />

        {isEmailValid ? (
          <></>
        ) : (
          <span className='text-warning absolute left-0 ml-3' style={{ top: '8.5rem' }}>
            Invalid Email.
          </span>
        )}

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
          className='text-secondary text-2xl absolute'
          type='button'
          onClick={() => setIsVisible(!isVisible)}
          style={{ marginTop: '202px', right: '12.5px' }}
        >
          {isVisible ? <AiOutlineEye className='text-primary' /> : <AiOutlineEyeInvisible />}
        </button>

        {password !== confirmPassword ? (
          <span className='text-warning absolute left-0 ml-3' style={{ top: '21.5rem' }}>
            Passwords do not match.
          </span>
        ) : (
          <></>
        )}

        <button className='bg-primary text-white w-full h-10 rounded-lg mt-4' type='submit' onClick={submitHandler}>
          Sign Up
        </button>
      </form>

      <div className='w-80 mx-auto text-center mt-5'>
        Already have an account!&nbsp;&nbsp;
        <Link className='text-secondary hover:text-primary' to={'/login'}>
          Log In
        </Link>
      </div>
    </div>
  );
}
