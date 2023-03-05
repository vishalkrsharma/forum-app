import React from 'react';
import { Avatar } from './index';
import { formatDistance } from 'date-fns';
import PostDropdown from './PostDropdown';
import { BiLike, BiComment } from 'react-icons/bi';

export default function Post(props) {
  console.log(props);
  const name = props.groupName;
  const groupId = props.groupId;
  const postId = props.postId;
  const username = props.username;
  const date = new Date(props.timestamps);
  const time = formatDistance(date, new Date(), { addSuffix: true });
  const upvotes = 10;

  const title = props.title;
  const body = props.caption;

  
  return (
    <div className='mx-auto border-b-2 border-diffused bg-white my-2 rounded-lg p-2 '>
      <div className='postHeader flex items-center justify-between p-1'>
        <div className='postInfo flex items-center gap-3'>
          <Avatar variant='bauhaus' name={name} />
          <div>
            <div>{name}</div>
            <div className='text-dark text-xs'>
              {username} | {time}
            </div>
          </div>
        </div>
        <PostDropdown username={username}  groupId = {groupId} postId = {postId}/>
      </div>
      <div className='postBody p-1'>
        <div className='title leading-tight py-2 font-medium text-lg'>{title}</div>
        <div className='text-dark'>{body}</div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='py-3 rounded-xl flex justify-center items-center flex-1 hover:bg-diffused'>
          <BiLike />
        </div>
        <div className='py-3 rounded-xl flex justify-center items-center flex-1 hover:bg-diffused'>
          <BiComment />
        </div>
      </div>
    </div>
  );
}
