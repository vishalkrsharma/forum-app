import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft, BiPlus } from 'react-icons/bi';
import Avatar from './Avatar';

export default function GroupDropdown(props) {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const groups = props.groups;
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
      <button type='button' className={`flex content-center align-middle rounded-lg ${showMenu ? 'bg-diffused' : ''}`}>
        {/* <span className=' text-lg pr-2 ' >{props.username}</span> */}
        <BiMenuAltLeft />
      </button>
      {showMenu ? (
        <div className='bg-white absolute top-12 -left-3 shadow-lg text-base z-10 w-60 overflow-auto max-h-96 rounded-lg'>
          <Link
            to='/createGroup'
            className='item py-2 px-5 flex justify-start items-center gap-4 border-diffused hover:bg-primary hover:text-white m-2 rounded-lg'
          >
            <BiPlus className='text-2xl' style={{ height: '30px' }} />
            Create a Group
          </Link>
          {groups.length === 0 ? (
            <></>
          ) : (
            <div
              className='line bg-diffused mx-auto'
              style={{
                height: '1px',
                width: '90%',
              }}
            ></div>
          )}
          {groups &&
            groups.map((group, key) => {
              console.log(group._id);
              return (
                <Link
                  key={group._id}
                  to={`/groups/${group.name}`}
                  // reloadDocument={true}
                  className='item py-2 px-5 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'
                  state={{ id: group._id }}
                >
                  <Avatar name={`${group.name}`} variant='bauhaus' size={30} />
                  {group.name}
                </Link>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}
