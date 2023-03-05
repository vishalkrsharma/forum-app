import { useState, useEffect, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { SlOptions } from 'react-icons/sl';
import { VscReport } from "react-icons/vsc";
import useAuthContext from '../hooks/useAuthContext';
import usePost from '../hooks/usePost';

export default function PostDropdown(props) {
  const username=props.username;
  const groupId = props.groupId;
  const postId = props.postId;
  const {user,dispatch} = useAuthContext();
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [checkUser,setUser] = useState(false);
  const { deletePost } = usePost()
  useEffect(() => {
    if(user.username==username){
      setUser(true)
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
      "postId":postId,
      "groupId":groupId
    }
    const response = await deletePost(body);
    console.log(response)
  }
  return (
    <div className='dropdown__icon relative content-center align-middle' style={{ height: '30px' }} onClick={() => setShowMenu(!showMenu)} ref={ref}>
      <button type='button' className={`p-2 flex content-center align-middle rounded-lg ${showMenu ? 'bg-diffused' : ''}`}>
        <SlOptions className='text-dark' />
      </button>
      {showMenu ? checkUser?(
        <div className='bg-white absolute top-9 right-0 shadow-lg text-base z-10 text-dark rounded-lg'>
          <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
            <FaPencilAlt />
            <div>Edit Post</div>
          </div>
          <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg' onClick={deletePostHandler}>
            <FaTrash />
            <div>Delete Post</div>
          </div>
        </div>
      ) :(
      <div className='bg-white absolute top-9 right-0 shadow-lg text-base z-10 text-dark rounded-lg'>
        <div className='item p-2 w-40 flex justify-start items-center gap-4 hover:bg-diffused m-2 rounded-lg'>
          <VscReport color='red'/>
          <div>Report</div>
        </div>
      </div>
    ): null}
    </div>
  );
}
