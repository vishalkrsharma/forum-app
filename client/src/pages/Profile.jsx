import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Avatar, Post } from '../components/index';
import usePost from '../hooks/usePost';

export default function Profile() {
  const [userData ,setUserData] = useOutletContext();
  const [userPostData , setUserPostData] = useState();
  const {getUserPosts} = usePost()
  async function getUserPostHandler() {
    const data  = await getUserPosts();
    setUserPostData(data);
  }
  useEffect(() => {
    getUserPostHandler();
  }, []);

  return (
    <div>
      {!userData&&userPostData ? null : (
        <div className='userInfo text-center max-w-xl m-auto'>
          <div className=' bg-primary h-40 overflow-hidden -mb-11 rounded-lg '>
            <Avatar className='mx-auto ' name={userData.username} variant='marble' size={600} square={true} />
          </div>
          <div className='profileImg mx-auto inline-block rounded-full border-4 border-white'>
            <Avatar className='mx-auto' name={userData.username} variant='beam' size={80} square={false} />
          </div>
          <div className='userName font-medium mt-2'>{userData.username}</div>
          <div className="text-left">
            {userPostData&&
              userPostData.map((userpost , key)=>{
                return(
                  <Post key={userpost._id} caption= {userpost.caption} title = {userpost.title} groupName = {userpost.groupName} username = {userpost.username} timestamps = {userpost.timestamps} />
                )
              })
            }
          </div>
        </div>
        
      )}
    </div>
  );
}
