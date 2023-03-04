import React from 'react';
import { Avatar } from './index';
import { formatDistance } from 'date-fns';
import PostDropdown from './PostDropdown';
import { BiLike, BiComment, BiDislike } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function Post(props) {
  const name = props.groupName;
  const user = props.username;
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
              {user} | {time}
            </div>
          </div>
        </div>
        <PostDropdown />
      </div>
      <div className='postBody p-1'>
        <div className='title leading-tight py-2 font-medium text-lg'>{title}</div>
        <div className='text-dark'>{body}</div>
      </div>
      <div className='flex justify-start items-center'>
        <div className='p-3 rounded-xl flex justify-center items-center hover:bg-diffused'>
          <BiLike />
        </div>
        <div className='p-3 rounded-xl flex justify-center items-center hover:bg-diffused'>
          <BiDislike />
        </div>
        <div className='p-3 rounded-xl flex justify-center items-center hover:bg-diffused'>
          <BiComment />
        </div>
      </div>
    </div>
  );
}
