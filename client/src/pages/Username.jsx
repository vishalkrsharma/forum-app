import React, { useState } from 'react';

import logoWithLabel from '../assets/logo-with-label.png';

export default function Username() {
  const [username, setUsername] = useState('');

  const submitHandler = async (e) => {};

  return (
    <div className='mx-auto h-screen p-5'>
      <img className='h-44 mx-auto' src={logoWithLabel} alt={logoWithLabel} />
      <form className='mx-auto flex justify-top items-center flex-col gap-7 relative w-80 mt-5'>
        <div className='text-xl text-primary font-medium'>Username</div>
        <label className='w-11/12 text-primary -mb-5 font-medium' htmlFor='username'>
          Enter Username
        </label>
        <input
          id='username'
          className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
          type='email'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className='bg-primary text-white w-full h-10 rounded-lg mt-4 cursor-pointer disabled:bg-secondary'
          type='submit'
          onClick={submitHandler}
          disabled={true}
        >
          Next
        </button>
      </form>
    </div>
  );
}
