import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSetting, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';
import useUser from '../hooks/useUser';
import Avatar from './Avatar';

export default function ProfileDropdown(props) {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useUser();

  useEffect(() => {
    const clickOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showMenu]);

  const logoutHandler = async () => {
    await logout();
  };

  console.log(props);

  return (
    <>
      <div
        className={`dropdown__icon relative p-2 hover:bg-diffused flex rounded-xl ${showMenu ? 'bg-diffused' : ''}`}
        onClick={() => setShowMenu(!showMenu)}
        ref={ref}
      >
        <button type='button' className='flex justify-between gap-2 items-center w-48'>
          <div className='flex gap-2'>
            <Avatar name={props.username} variant='beam' size={30} />
            <div className='text-base flex justify-center items-center'>{props.username}</div>
          </div>
          <div className='text-base'>
            <BsChevronDown />
          </div>
        </button>
        {showMenu ? (
          <div className='dropdown__menu bg-white absolute top-14 -right-3 rounded-lg shadow-lg text-base z-10 w-56'>
            <Link to='/profile' className='item py-2 px-5 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
              <AiOutlineUser className='text-2xl' />
              Profile
            </Link>
            <Link to='/settings' className='item py-2 px-5 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
              <AiOutlineSetting className='text-2xl' />
              Settings
            </Link>
            <div className='item py-2 px-5 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg cursor-pointer' onClick={logoutHandler}>
              <AiOutlineLogout className='text-2xl' />
              Log Out
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
