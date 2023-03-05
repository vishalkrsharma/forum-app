import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Post } from '../components/index';
import usePost from '../hooks/usePost';

export default function Home() {
  const [userGroupPostData, setuserGroupPostdata] = useState();
  const [userData] = useOutletContext();
  const { getuserGroupPost } = usePost();

  async function getUserGroupPostHandler() {
    var groups = userData.groups.map(function (item) {
      return item['_id'];
    });
    console.log(groups);
    const body = {
      groups: groups,
    };
    const { data } = await getuserGroupPost(body);
    console.log(data);
    setuserGroupPostdata(data);
  }

  useEffect(() => {
    console.log(userData);
    getUserGroupPostHandler();
  }, []);

  return (
    <div>
      <div className='text-left lg:w-1/2 mx-auto'>
        {userGroupPostData &&
          userGroupPostData.map((userpost, key) => {
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
  );
}
