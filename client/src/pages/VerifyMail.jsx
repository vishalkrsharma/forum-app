import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { isEmail } from 'validator';
import logoWithLabel from '../assets/logo-with-label.png';
import axios from 'axios';
import useUser from '../hooks/useUser';

export default function VerifyMail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isDisable, setIsDisabled] = useState(false);
  const [incorrectCode, setIncorrectCode] = useState(false);

  const { verifyOTP, sendCode, error, isLoading } = useUser();

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      navigate('/');
    }
  }, []);

  const verifyOTPHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      otp: code,
    };
    const { data } = await verifyOTP(body);
    console.log(data);
    navigate('/signup', {
      state: {
        email: email,
        validated: 'Valid',
      },
    });
  };

  const sendCodeHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
    };
    const { data } = await axios.post('/api/user/sendotp', body);
    if (!data.error) {
      setIsDisabled(!isDisable);
    }
  };

  return (
    <div className='mx-auto h-screen max-lg:p-3 lg:flex lg:justify-center lg:items-center'>
      <div className='lg:h-full lg:w-1/2 lg:bg-bg flex justify-center items-center max-lg:mb-5'>
        <img className='h-56 p-4 bg-white rounded-full' src={logoWithLabel} alt={logoWithLabel} />
      </div>
      <form className='mx-auto flex justify-top items-center flex-col gap-7 w-80'>
        <div className='text-xl text-primary font-medium -mb-5'>Sign Up</div>
        <div className='relative w-full'>
          <label className='text-primary px-3 -mb-5 font-medium' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
            type='email'
            placeholder='Email'
            disabled={isDisable}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(isEmail(email));
            }}
          />

          {isEmail(email) || email.length == 0 ? null : (
            <span className='text-warning absolute left-0 ml-3 text-sm' style={{ top: '4.25rem' }}>
              Invalid Email.
            </span>
          )}
        </div>
        <button
          className='bg-primary text-white w-full h-10 rounded-lg mt-4 disabled:bg-secondary cursor-pointer'
          type='submit'
          onClick={sendCodeHandler}
          disabled={isDisable}
        >
          Send Code
        </button>
        <div className='relative w-full'>
          <label className='text-primary px-3 -mb-5 font-medium' htmlFor='password'>
            Enter Your Code
          </label>
          <input
            id='code'
            className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-primary w-full'
            type={isVisible ? 'text' : 'password'}
            placeholder='Code'
            disabled={!isDisable}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />

          <button className='text-secondary text-2xl absolute' type='button' onClick={() => setIsVisible(!isVisible)} style={{ top: '34px', right: '10px' }}>
            {isVisible ? <AiOutlineEye className='text-primary' /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <button
          disabled={!isDisable}
          className='bg-primary text-white w-full h-10 rounded-lg mt-4 disabled:bg-secondary cursor-pointer'
          type='submit'
          onClick={verifyOTPHandler}
        >
          Verify
        </button>
        {incorrectCode && (
          <span className='text-warning absolute left-0 ml-3 text-sm' style={{ top: '4.25rem' }}>
            Incorrect Code
          </span>
        )}
        <div className='w-80 mx-auto text-center mt-5'>
          Already have an account!&nbsp;&nbsp;
          <Link className='text-secondary hover:text-primary' to={'/login'}>
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
