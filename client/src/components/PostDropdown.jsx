import { useState, useEffect, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';

export default function PostDropdown(props) {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);

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
    <div className='dropdown__icon relative content-center align-middle' style={{ height: '30px' }} onClick={() => setShowMenu(!showMenu)} ref={ref}>
      <button type='button' className={`p-2 flex content-center align-middle rounded-lg ${showMenu ? 'bg-diffused' : ''}`}>
        <SlOptions className='text-dark' />
      </button>
      {showMenu ? (
        <div className='bg-white absolute top-9 right-0 shadow-lg text-base z-10 text-dark rounded-lg'>
          <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
            <FaPencilAlt />
            <div>Edit Post</div>
          </div>
          <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
            <MdOutlineReportGmailerrorred className='text-2xl' />
            <div className='absolute left-12'>Report Post</div>
          </div>
          <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
            <FaTrash />
            <div>Delete Post</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
