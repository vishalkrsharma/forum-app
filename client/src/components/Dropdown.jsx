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
          <div className='dropdown__menu absolute top-12 right-0 rounded-lg shadow-lg text-base'>
            <Link to='/profile' className='item py-2 px-5 flex justify-center items-center gap-2'>
              <AiOutlineUser />
              <div className='w-20'>Profile</div>
            </Link>
            <Link to='/settings' className='item py-2 px-5 flex justify-center items-center gap-2'>
              <AiOutlineSetting />
              <div className='w-20'>Settings</div>
            </Link>
            <div className='item py-2 px-5 flex justify-center items-center gap-2' onClick={logoutHandler}>
              <AiOutlineLogout />
              <div className='w-20'>Log out</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
