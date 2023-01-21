import React from 'react';
import { BiSearch, BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

import logo from '../assets/logo.png';

export default function TopBar() {
  const location = useLocation();

  return (
    <>
      <div className='topbar text-dark w-full flex align-middle justify-between px-6 py-2 text-3xl fixed bg-white top-0'>
        <div className='flex items-center gap-4'>
          <BiMenuAltLeft />
          <Link to='/' className='flex justify-center items-center'>
            <img src={logo} alt={logo} style={{ height: '2.5rem' }} />
            <p className='text-lg'>
              Talk<span className='font-bold'>Dock</span>
            </p>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <AiOutlineSearch />
          <AiOutlineUser />
        </div>
      </div>
      {location.pathname === '/newpost' ? null : (
        <Link to='/newpost' className='bg-primary p-4 rounded-2xl text-white fixed bottom-4 right-4 flex justify-center items-center gap-2 drop-shadow-2xl'>
          <MdPostAdd className='text-3xl' />
          New Post
        </Link>
      )}
    </>
  );
}
