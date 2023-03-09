import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CgFontSpacing } from 'react-icons/cg';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import { Avatar, Post } from '../components/index';
import useGroup from '../hooks/useGroup';
import usePost from '../hooks/usePost';

export default function Group(props) {
  const {id} = useParams();
  const { getGroup } = useGroup();
  const { getGroupPost } = usePost();
  const [description,setDescription] = useState();
  const [groupData, setGroupdata] = useState();
  const [groupPostData, setGroupPostData] = useState();

  async function getGroupHandler(body) {
    const { data } = await getGroup(body);
    console.log(data)
    setGroupdata(data);
    getGroupPostHandler(data.name);
  }
  async function getGroupPostHandler(groupName) {
    const data = await getGroupPost(groupName);
    console.log(data);
    setGroupPostData(data);
  }

  useEffect(() => {
    const groupId = id;
   
    getGroupHandler(groupId);
  }, []);

  return (
    <div>
      {!groupData ? null : (
        <div className='userInfo text-center text-dark'>
          <div className='bg-primary h-40 overflow-hidden -mb-11 rounded-lg max-w-xl mx-auto'>
            <Avatar className='mx-auto ' name={groupData.name} variant='ring' size={600} square={true} />
          </div>
          <div className='profileImg mx-auto inline-block rounded-full border-4 border-white'>
            <Avatar className='mx-auto' name={groupData.name} variant='bauhaus' size={80} square={false} />
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='userName font-medium mt-2'>{groupData.name}</div>
              <div className='userName font-medium mt-2'>{groupData.about}</div>
            </div>
            <button className='bg-primary text-white px-4 py-2 rounded-xl'>Join</button>
          </div>
          <div className='text-left'>
            {groupPostData &&
              groupPostData.map((userpost, key) => {
                return (
                  <Post
                    key={userpost._id}
                    caption={userpost.caption}
                    title={userpost.title}
                    groupName={userpost.groupName}
                    username={userpost.username}
                    timestamps={userpost.timestamps}
                    id = {userpost._id}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
