import React from 'react';
import { SlOptions } from 'react-icons/sl';

import { Avatar } from './index';

export default function Post() {
  const name = 'group';
  const user = 'user';
  const time = '10hr';

  const title = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  const body =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sit tempore maxime possimus error provident necessitatibus saepe quam harum magni!';

  return (
    <div className='bg-white rounded-lg p-2'>
      <div className='postHeader flex items-center justify-between p-1'>
        <div className='postInfo flex items-center gap-3'>
          <Avatar variant='ring' name={name} />
          <div>
            <div>{name}</div>
            <div className='text-dark'>
              {user} | {time}
            </div>
          </div>
        </div>
        <SlOptions className='mr-4' />
      </div>
      <div className='postBody p-1'>
        <div className='title text-lg'>{title}</div>
        <div className='body text-dark'>{body}</div>
      </div>
    </div>
  );
}
