import React from 'react';

import { TopBar, Post } from '../components/index';
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div>
      <div className='bg-diffused py-20 px-3 h-screen'>
        <Post />
      </div>
    </div>
  );
}
