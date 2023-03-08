import { useState, useEffect, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdOutlineReport } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import useAuthContext from '../hooks/useAuthContext';
import usePost from '../hooks/usePost';

export default function PostDropdown(props) {
  const username = props.username;
  const groupId = props.groupId;
  const postId = props.postId;
  const { user, dispatch } = useAuthContext();
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [checkUser,setUser] = useState(false);
  const { deletePost } = usePost()

  useEffect(() => {
    if (user.username == username) {
      setUser(true);
    }
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

  const deletePostHandler = async()=>{
    console.log(postId,groupId);
    const body = {
      postId: postId,
      groupId: groupId,
    };
    const response = await deletePost(body);
    if(response.message == "Post Deleted Successfully")window.location.reload(true)
  }
  return (
    <div className='dropdown__icon relative content-center align-middle' onClick={() => setShowMenu(!showMenu)} ref={ref}>
      <button type='button' className={`p-3 flex content-center align-middle rounded-lg cursor-pointer ${showMenu ? 'bg-diffused' : ''}`}>
        <SlOptions className='text-dark' />
      </button>
      {showMenu ? (
        <div className='bg-white absolute top-13 right-0 shadow-lg text-base z-10 text-dark rounded-lg'>
          {checkUser ? (
            <>
              <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
                <FaPencilAlt />
                <div>Edit Post</div>
              </div>
              <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg' onClick={deletePost}>
                <FaTrash />
                <div>Delete Post</div>
              </div>
            </>
          ) : (
            <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
              <MdOutlineReport className='text-2xl' />
              <div className='absolute left-12'>Report Post</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
