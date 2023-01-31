import React from 'react';
import { SlOptions } from 'react-icons/sl';

import { Avatar } from './index';

export default function Post() {
  const name = 'group';
  const user = 'user';
  const time = '10hr';
  const upvotes = 10;

  const title = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  const body =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sit tempore maxime possimus error provident necessitatibus saepe quam harum magni!';

  return (
    <div className=' border-b-2 border-diffused bg-white my-2 rounded-lg p-2'>
      <div className='postHeader flex items-center justify-between p-1'>
        <div className='postInfo flex items-center gap-3'>
          <Avatar variant='ring' name={name} />
          <div>
            <div>{name}</div>
            <div className='text-dark text-xs'>
              {user} | {time}
            </div>
          </div>
        </div>
        <SlOptions className='mr-4 text-dark' />
      </div>
      <div className='postBody p-1'>
        <div className='title leading-tight py-2 font-medium text-lg'>{title}</div>
        <div className='text-dark'>{body}</div>
      </div>
    </div>
  );
}
