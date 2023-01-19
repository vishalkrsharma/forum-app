import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { AiOutlinePlusCircle, AiOutlineMessage, AiOutlineBell, AiOutlineHome } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';

export default function BottomBar() {
  return (
    <div className='text-dark w-full flex align-middle justify-between px-6 py-2 text-3xl fixed bottom-0 bg-white rounded-t-xl'>
      <Link to='/'>
        <AiOutlineHome />
      </Link>
      <Link to='/newpost'>
        <AiOutlinePlusCircle />
      </Link>
      <Link to='notifications'>
        <AiOutlineBell />
      </Link>
      <Link to='messages'>
        <AiOutlineMessage />
      </Link>
    </div>
  );
}
