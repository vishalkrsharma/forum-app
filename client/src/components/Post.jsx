import React from 'react';
import { Avatar } from './index';
import { formatDistance } from 'date-fns';
import PostDropdown from './PostDropdown';
import { BiLike, BiDislike, BiComment, BiSave } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

export default function Post(props) {
  const name = props.groupName;
  const groupId = props.groupId;
  const navigate = useNavigate();
  const postId = props.postId;
  const username = props.username;
  const date = new Date(props.timestamps);
  const time = formatDistance(date, new Date(), { addSuffix: true });
  const id = props.id;

  const title = props.title;
  const body = props.caption;

  console.log(postId);

  return (
    <div className='mx-auto border-b-2 border-diffused bg-white my-2 rounded-lg p-2'>
      <div className='postHeader flex items-center justify-between p-1'>
        <div className='postInfo flex items-center gap-3'>
          <Avatar variant='bauhaus' name={name} />
          <div className='flex flex-col align-top justify-center'>
            <div>{name}</div>
            <div className='text-dark text-xs'>
              {username} | {time}
            </div>
          </div>
        </div>
      </div>
      <Link to={`/posts/${id}`}>
        <div className='postBody p-1'>
          <div className='title leading-tight py-2 font-medium text-lg'>{title}</div>
          <div className='text-dark'>{body}</div>
        </div>
      </Link>
      <div className='flex justify-start items-center text-dark text-xl'>
        <div className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'>
          <BiLike />
          <div className='text-base'>Like</div>
        </div>
        <div className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'>
          <BiDislike />
          <div className='text-base'>Dislike</div>
        </div>
        <div
          className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'
          onClick={() => navigate(`/posts/${id}`)}
        >
          <BiComment />
          <div className='text-base'>Comment</div>
        </div>
        <div className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'>
          <BiSave />
          <div className='text-base'>Save</div>
        </div>
        <PostDropdown username={username} postId={postId} groupId={groupId} />
      </div>
    </div>
  );
}
