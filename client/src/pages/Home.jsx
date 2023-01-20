import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

import { TopBar } from '../components/index';

export default function Home() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className='h-screen'>
      <TopBar />
      <Outlet />
      {location.pathname === '/newpost' ? null : (
        <Link to='/newpost' className='bg-primary p-4 rounded-2xl text-white fixed bottom-4 right-4 flex justify-center items-center gap-2 drop-shadow-2xl'>
          <MdPostAdd className='text-3xl' />
          New Post
        </Link>
      )}
    </div>
  );
}
