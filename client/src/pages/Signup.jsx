import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { isEmail, isStrongPassword } from 'validator';

import logoWithLabel from '../assets/logo-with-label.png';
import useUser from '../hooks/useUser';

export default function Signup({ route }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { signup, error, loading, login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  const isStrongPasswordConditions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  useEffect(() => {
    if (state) {
      setEmail(state.email);
      window.history.replaceState({ state: null }, document.title);
    }
    if (!state) {
      navigate('/verifymail');
    }

    console.log(state);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: state.email,
      username: username,
      password: password,
    };
    console.log(body);
    if (password === confirmPassword) {
      await signup(body);
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
            Username
          </label>
          <input
            id='username'
            className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
            type='text'
            placeholder='Username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className='relative w-full'>
          <label className='text-primary px-3 -mb-5 font-medium' htmlFor='password'>
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

          <button className='text-secondary text-2xl absolute' type='button' onClick={() => setIsVisible(!isVisible)} style={{ top: '34px', right: '10px' }}>
            {isVisible ? <AiOutlineEye className='text-primary' /> : <AiOutlineEyeInvisible />}
          </button>
          {isStrongPassword(password, isStrongPasswordConditions) || password.length == 0 ? null : (
            <div
              className='passwordConditions absolute text-xs text-dark bg-white border-2 border-warning rounded-lg p-2 z-10'
              style={{ top: '5.2rem', right: '0px' }}
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
        </div>
        <div className='relative w-full'>
          <label className='text-primary px-3 -mb-5 font-medium' htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-primary w-full'
            type={isVisible ? 'text' : 'password'}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {password !== confirmPassword && confirmPassword.length != 0 ? (
            <span className='text-warning absolute left-0 ml-3 text-sm' style={{ top: '4.25rem' }}>
              Passwords do not match.
            </span>
          ) : null}
        </div>
        <button className='bg-primary text-white w-full h-10 rounded-lg mt-4 disabled:bg-secondary cursor-pointer' type='submit' onClick={submitHandler}>
          Sign Up
        </button>
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
//disabled={isEmailValid && isStrongPassword(password, isStrongPasswordConditions) && password === confirmPassword ? false : true}
