import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Post } from '../components/index';
import usePost from '../hooks/usePost';

export default function Home() {
  const [userGroupPostData, setuserGroupPostdata] = useState([]);
  const [message,setMessage] = useState("");
  const [userData] = useOutletContext();
  const { getuserGroupPost } = usePost();

  async function getUserGroupPostHandler() {
    var groups = userData.groups.map(function (item) {
      return item['_id'];
    });
    const body = {
      groups: groups,
    };
    const response = await getuserGroupPost(body);
    setMessage(response.message);
    setuserGroupPostdata(response.data);
  }

  useEffect(() => {
    getUserGroupPostHandler();
  }, []);

  return (
    <div>
      <div className='text-left lg:w-1/2 mx-auto'>
        {userGroupPostData.length==0?<div>{message}</div>:
          userGroupPostData.map((userpost, key) => {
            return (
              <Post
                key={key}
                postId={userpost._id}
                groupId = {userpost.groupId}
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
  );
}
