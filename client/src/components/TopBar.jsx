import React from 'react';
import { MdOutlineGroups } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

export default function TopBar() {
  return (
    <div className='w-full flex align-middle justify-between p-4 text-3xl  rounded-b-xl fixed bg-white top-0'>
      <MdOutlineGroups />
      <div className='flex items-center gap-4'>
        <BiSearch />
        <CgProfile />
      </div>
    </div>
  );
}
