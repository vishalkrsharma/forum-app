import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineGroup, AiOutlineProfile, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

export default function TopBar() {
  return (
    <div className='text-dark w-full  flex align-middle justify-between px-6 py-2 text-3xl   rounded-b-xl fixed bg-white top-0'>
      <AiOutlineGroup />
      <div className='flex items-center gap-4'>
        <AiOutlineSearch />
        <AiOutlineUser />
      </div>
    </div>
  );
}
