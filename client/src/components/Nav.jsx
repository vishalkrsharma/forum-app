import React, { useState, useContext, useRef, useEffect } from 'react';
import { BiSearch, BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';
import { BiUpArrowAlt } from 'react-icons/bi';

import { AuthContext } from '../context/AuthContext';

import logo from '../assets/logo.png';
import { Dropdown } from './index';

export default function TopBar() {
  const ref = useRef();
  const location = useLocation();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const scroll = (e) => {
      if (window.scrollY !== 0) {
        setShowLabel(false);
      } else {
        setShowLabel(true);
      }
    };

    document.addEventListener('scroll', scroll);
    return () => {
      document.removeEventListener('scroll', scroll);
    };
  });

  return (
    <>
      <div className='topbar text-dark h-14 w-full flex align-middle justify-between px-6 py-2 text-3xl fixed bg-white top-0 drop-shadow-md z-10'>
        <div className='flex items-center gap-4'>
          <BiMenuAltLeft />
          <Link to='/' className='flex justify-center items-center'>
            <img src={logo} alt={logo} style={{ height: '2.5rem' }} />
            <p className='text-lg'>
              Talk<span className='font-bold'>Dock</span>
            </p>
          </Link>
        </div>
        <div className='flex items-center gap-4 p-2 pr-0'>
          <div>
            <AiOutlineSearch />
          </div>
          <Dropdown />
        </div>
      </div>
      {!showLabel ? (
        <div
          className='bg-diffused text-primary fixed bottom-24 right-4 rounded-2xl shadow-diffused shadow-md'
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        >
          <BiUpArrowAlt className='m-4 text-3xl' />
        </div>
      ) : null}
      {location.pathname === '/newpost' ? null : (
        <Link
          to='/newpost'
          className='bg-primary p-4 rounded-2xl text-white fixed bottom-4 right-4 flex justify-center items-center gap-2 shadow-primary shadow-md'
        >
          <MdPostAdd className='text-3xl' />
          {showLabel ? <div ref={ref}>New Post</div> : null}
        </Link>
      )}
    </>
  );
}
