import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

import { YourGroupPost, NewPost } from './index';
import { TopBar } from '../components/index';

export default function Home() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path='newpost' element={<NewPost />} />
      </Routes>
      <div className='bg-diffused pt-20 px-3 h-screen'>
        <Link to='/newpost' className='bg-primary p-4 rounded-2xl text-white fixed bottom-5 right-5 flex justify-center items-center gap-2'>
          <MdPostAdd className='text-3xl' />
          Create post
        </Link>
      </div>
    </div>
  );
}
