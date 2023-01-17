import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { isEmail, isStrongPassword } from 'validator';
import { generateUsername } from 'friendly-username-generator';

import logoWithLabel from '../assets/logo-with-label.png';
import useSignup from '../hooks/useSignup';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isStrongPasswordConditions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUsername(generateUsername());
    console.log(username);
    if (isEmailValid && isStrongPassword(password, isStrongPasswordConditions) && password === confirmPassword) {
      await useSignup(email, password);
    }
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
            setIsEmailValid(isEmail(email));
          }}
        />

        {isEmail(email) || email.length == 0 ? null : (
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {isStrongPassword(password, isStrongPasswordConditions) || password.length == 0 ? null : (
          <div
            className='passwordConditions absolute text-xs text-dark bg-white border-2 border-warning rounded-lg p-2 z-10'
            style={{ top: '15.75rem', right: '0px' }}
          >
            <span
              className='h-5 w-5 border-l-2 border-t-2 border-warning absolute rotate-45 z-20 bg-white'
              style={{
                top: '-.71rem',
                left: '5.5rem',
              }}
            ></span>
            Password must be:
            <br />
            <ul>
              <li>&ensp;•&ensp;Minimun Length: {isStrongPasswordConditions.minLength}</li>
              <li>&ensp;•&ensp;Minumun Lowercase: {isStrongPasswordConditions.minLowercase}</li>
              <li>&ensp;•&ensp;Minimum Uppercase: {isStrongPasswordConditions.minUppercase}</li>
              <li>&ensp;•&ensp;Minimum Numbers: {isStrongPasswordConditions.minNumbers}</li>
              <li>&ensp;•&ensp;Minimum Special Characters: {isStrongPasswordConditions.minSymbols}</li>
            </ul>
          </div>
        )}

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

        {password !== confirmPassword && confirmPassword.length != 0 ? (
          <span className='text-warning absolute left-0 ml-3' style={{ top: '21.5rem' }}>
            Passwords do not match.
          </span>
        ) : null}

        <button
          className='bg-primary text-white w-full h-10 rounded-lg mt-4 disabled:bg-secondary cursor-pointer'
          type='submit'
          onClick={submitHandler}
          disabled={isEmailValid && isStrongPassword(password, isStrongPasswordConditions) && password === confirmPassword ? false : true}
        >
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
