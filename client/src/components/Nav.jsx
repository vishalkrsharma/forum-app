import React, { useState, useRef, useEffect } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';
import { BiUpArrowAlt } from 'react-icons/bi';

import logo from '../assets/logo.png';
import { GroupDropdown, ProfileDropdown } from './index';

export default function Nav(props) {
  const ref = useRef();
  const location = useLocation();
  const [showLabel, setShowLabel] = useState(true);
  const [searchString, setSearchString] = useState('');

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
          <GroupDropdown groups={props.userData.groups} />
          <Link to='/' className='flex justify-center items-center'>
            <img src={logo} alt={logo} style={{ height: '2.5rem' }} />
            <p className='text-lg'>
              Talk<span className='font-bold'>Dock</span>
            </p>
          </Link>
        </div>
        <input
          className='w-96 rounded-lg p-2 px-3 bg-diffused flex justify-between items-center text-base placeholder:text-dark'
          placeholder='Search Anything...'
          onChange={(e) => setSearchString(e.target.value)}
        />
        <ProfileDropdown username={props.userData.username} />
      </div>
      {!showLabel ? (
        <div
          className='bg-diffused text-primary fixed bottom-24 right-4 rounded-2xl shadow-diffused shadow-md'
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        >
          <BiUpArrowAlt className='m-4 text-3xl' />
        </div>
      ) : null}
      {location.pathname === '/newpost' || location.pathname === '/createGroup' ? null : (
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
