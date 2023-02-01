import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft, BiPlus } from 'react-icons/bi';
import Avatar from './Avatar';

export default function GroupDropdown(props) {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const groups = props.groups
  useEffect(() => {
    const clickOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showMenu]);


  return (
    <>
      <div className='dropdown__icon relative content-center align-middle ' style={{ height: '30px' }} onClick={() => setShowMenu(!showMenu)} ref={ref}>
        <button type='button' className='flex content-center align-middle '>
          {/* <span className=' text-lg pr-2 ' >{props.username}</span> */}
          <BiMenuAltLeft/>
        </button>
        {showMenu ? (
          <div className='dropdown__menu bg-white absolute top-12 -left-3 rounded-lg shadow-lg text-base z-10 w-60 h-80 overflow-scroll'>
            <Link to='/createGroup' className='item py-2 px-5 flex justify-start items-center gap-4 border-diffused border-b-2 hover:bg-primary hover:text-white m-2 rounded-lg'>
              <BiPlus className='text-2xl' />
              Create a Group
            </Link>
            {groups && groups.map((group,key)=>{
             { console.log(group)}
             return(
              <Link key={group._id} to={`/groups/${group._id}`} reloadDocument={true}  className='item py-2 px-5 flex justify-start items-center gap-4  hover:bg-diffused  m-2 rounded-lg'>
                <Avatar name = {`${group.name}`} variant= "bauhaus" size={30} />
                 {group.name}
                </Link>
             )
            })}
            
          </div>
        ) : null}
      </div>
    </>
  );
}