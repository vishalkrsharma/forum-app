import React from 'react';

import { TopBar, BottomBar, Post } from '../components/index';

export default function Home() {
  return (
    <div>
      <TopBar />
      <div className='container bg-diffused py-20 px-3 h-screen'>
        <Post />
      </div>
      <BottomBar />
    </div>
  );
}
