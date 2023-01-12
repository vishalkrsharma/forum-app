import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { AiOutlinePlusCircle, AiOutlineMessage } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';

export default function BottomBar() {
  return (
    <div className='w-full flex align-middle justify-between p-4 text-3xl fixed bottom-0 bg-white rounded-t-xl'>
      <Link to='/'>
        <FiHome />
      </Link>
      <Link to='/newpost'>
        <AiOutlinePlusCircle />
      </Link>
      <Link to='notifications'>
        <GrNotification />
      </Link>
      <Link to='messages'>
        <AiOutlineMessage />
      </Link>
    </div>
  );
}
