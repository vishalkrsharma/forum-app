import React, { useState } from 'react';
import { AiOutlineSetting, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import useLogout from '../hooks/useLogout';

export default function Dropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useLogout();
  const logoutHandler = async () => {
    console.log(logout);
    await logout();
  };

  return (
    <>
      <div className='dropdown__icon relative' style={{ height: '30px' }} onClick={() => setShowMenu(!showMenu)}>
        <button type='button'>
          <AiOutlineUser />
        </button>
        {showMenu ? (
          <div className='dropdown__menu bg-white absolute top-12 right-0 rounded-lg shadow-lg text-base z-10'>
            <Link to='/profile' className='item py-2 px-5 flex justify-center items-center gap-2'>
              <AiOutlineUser />
              Profile
            </Link>
            <Link to='/settings' className='item py-2 px-5 flex justify-center items-center gap-2'>
              <AiOutlineSetting />
              Settings
            </Link>
            <div className='item py-2 px-5 flex justify-center items-center gap-2' onClick={logoutHandler}>
              <AiOutlineLogout />
              Log out
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
