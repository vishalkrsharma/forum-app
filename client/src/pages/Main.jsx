import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Nav } from '../components/index';

export default function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/start');
    }
  }, []);

  return (
    <>
      <Nav />
      <main className='mt-16 px-4'>
        <Outlet />
      </main>
    </>
  );
}
