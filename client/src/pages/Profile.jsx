import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Avatar } from '../components/index';

import useUser from '../hooks/useUser';

export default function Profile() {
  const userData = useOutletContext()
  console.log(userData)


  return (
    <div>
      {!userData ? null : (
        <div className='userInfo text-center'>
          <div className='coverImg h-40 overflow-hidden -mb-11 rounded-lg'>
            <Avatar className='mx-auto' name={userData.username} variant='marble' size={500} square={true} />
          </div>
          <div className='profileImg mx-auto inline-block rounded-full border-4 border-white'>
            <Avatar className='mx-auto' name={userData.username} variant='beam' size={80} square={false} />
          </div>
          <div className='userName font-medium mt-2'>{userData.username}</div>
        </div>
      )}
    </div>
  );
}
