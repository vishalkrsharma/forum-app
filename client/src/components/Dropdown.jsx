import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSetting, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import useLogout from '../hooks/useLogout';

export default function Dropdown() {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useLogout();

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
    console.log(logout);
    await logout();
  };

  return (
    <>
      <div className='dropdown__icon relative' style={{ height: '30px' }} onClick={() => setShowMenu(!showMenu)} ref={ref}>
        <button type='button'>
          <AiOutlineUser />
        </button>
        {showMenu ? (
          <div className='dropdown__menu bg-white absolute top-12 right-0 rounded-lg shadow-lg text-base z-10'>
            <Link to='/profile' className='item py-2 px-5 flex justify-start items-center gap-2 '>
              <AiOutlineUser />
              Profile
            </Link>
            <Link to='/settings' className='item py-2 px-5 flex justify-start items-center gap-2'>
              <AiOutlineSetting />
              Settings
            </Link>
            <div className='item py-2 px-5 flex justify-start items-center gap-2 cursor-pointer' onClick={logoutHandler}>
              <AiOutlineLogout />
              Log Out
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
