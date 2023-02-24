import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ErrorNotification } from '../components/index';

import useUser from '../hooks/useUser';

import logoWithLabel from '../assets/logo-with-label.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    const data = await login(body);
    console.log(data);
    if (data.data.error) {
      setError(data.data.message);
    }
  };

  return (
    <div className='mx-auto h-screen max-lg:p-3 lg:flex lg:justify-center lg:items-center'>
      <div className='lg:h-full lg:w-1/2 lg:bg-bg flex justify-center items-center max-lg:mb-5'>
        <img className='h-56 p-4 bg-white rounded-full' src={logoWithLabel} alt={logoWithLabel} />
      </div>
      <form className='mx-auto flex justify-top items-center flex-col gap-7 w-80'>
        <div className='text-xl text-primary font-medium'>Log In</div>
        <div className='relative w-full'>
          <label className='px-3 text-primary -mb-5 font-medium' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='relative w-full'>
          <label className='px-3 text-primary -mb-5 font-medium' htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-primary w-full'
            type={isVisible ? 'text' : 'password'}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='text-secondary text-2xl absolute' type='button' onClick={() => setIsVisible(!isVisible)} style={{ top: '34px', right: '10px' }}>
            {isVisible ? <AiOutlineEye className='text-primary' /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <button
          className='bg-primary text-white w-full h-10 rounded-lg mt-4 cursor-pointer disabled:bg-secondary'
          type='submit'
          onClick={submitHandler}
          disabled={email.length == 0 || password.length == 0 ? true : false}
        >
          Log In
        </button>
        <div className='w-80 mx-auto text-center mt-5'>
          Don't have an account?&nbsp;&nbsp;
          <Link className='text-secondary hover:text-primary' to={'/verifymail'}>
            Sign Up
          </Link>
        </div>
      </form>
      {error ? <ErrorNotification error={error} setError={setError} /> : null}
    </div>
  );
}
