import React from 'react';
import { BiSearch, BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

export default function TopBar() {
  return (
    <div className='topbar text-dark w-full flex align-middle justify-between px-6 py-2 text-3xl rounded-b-xl fixed bg-white top-0'>
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
  );
}
