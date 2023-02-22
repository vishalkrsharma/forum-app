import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import { Avatar, Post } from '../components/index';
import useGroup from '../hooks/useGroup';
import usePost from '../hooks/usePost';

export default function Group(props) {
  const { name } = useParams();
  // const { group } = useLocation();
  const { state } = useLocation();
  const { id } = state;
  const { getGroup } = useGroup();
  const { getGroupPost } = usePost();
  const [groupData, setGroupdata] = useState();
  const [groupPostData, setGroupPostData] = useState();

  console.log(state);
  console.log(useLocation());

  async function getGroupHandler(body) {
    const { data } = await getGroup(body);
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
    const body = {
      groupId,
    };
    getGroupHandler(body);
  }, []);

  return (
    <div>
      {!groupData ? null : (
        <div className='userInfo text-center '>
          <div className=' bg-primary h-40 overflow-hidden -mb-11 rounded-lg max-w-xl m-auto'>
            <Avatar className='mx-auto ' name={groupData.name} variant='ring' size={600} square={true} />
          </div>
          <div className='profileImg mx-auto inline-block rounded-full border-4 border-white'>
            <Avatar className='mx-auto' name={groupData.name} variant='bauhaus' size={80} square={false} />
          </div>
          <div className='userName font-medium mt-2'>{groupData.name}</div>
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
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
