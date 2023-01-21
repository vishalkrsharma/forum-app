import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Nav } from '../components/index';

export default function Main() {
  return (
    <div className='h-screen'>
      <Nav />
      <Outlet />
    </div>
  );
}
