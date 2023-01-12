import React, { useState } from 'react';

import { BottomBar, TopBar } from '../components/index';

export default function NewPost() {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(postTitle, postBody);
  };

  return (
    <div>
      <TopBar />
      <div className='container bg-diffused py-20 px-4 h-screen'>
        <form className='flex flex-col justify-start gap-4'>
          <label className='text-primary font-medium -mb-3' htmlFor='title' style={{ marginLeft: '.7rem' }}>
            Give a title...
          </label>
          <input
            className='border-secondary border-2 p-2 px-3 rounded-lg'
            type='text'
            id='title'
            placeholder='An interesting title'
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label className='text-primary font-medium  -mb-3' htmlFor='body' style={{ marginLeft: '.7rem' }}>
            Body
          </label>
          <textarea
            className='h-60 border-secondary border-2 p-2 px-3 rounded-lg resize-none'
            type='text'
            id='body'
            placeholder='What are you thinking about...'
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button className='mx-auto w-1/2 bg-primary text-white h-10 rounded-lg' type='submit' onClick={submitHandler}>
            Post
          </button>
        </form>
      </div>
      <BottomBar />
    </div>
  );
}
