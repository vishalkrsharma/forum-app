import React, { useState } from 'react';
import usePost from '../hooks/usePost';

export default function NewPost() {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const { createPost } = usePost();

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      title : postTitle,
      caption : postBody,
    };
    await createPost(body);
    console.log(postTitle, postBody);
  };

  return (
    <div>
      <div className='py-20 px-4 h-screen'>
        <form className='flex flex-col justify-start gap-4'>
          <label className='text-black font-medium -mb-3' htmlFor='title' style={{ marginLeft: '.7rem' }}>
            Give a title...
          </label>
          <input
            className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-primary'
            type='text'
            id='title'
            placeholder='An interesting title'
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label className='text-black font-medium  -mb-3' htmlFor='body' style={{ marginLeft: '.7rem' }}>
            Body
          </label>
          <textarea
            className='h-60 border-secondary border-2 p-2 px-3 rounded-lg resize-none focus:border-primary'
            type='text'
            id='body'
            placeholder='What are you thinking about...'
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button className='wimx-auto w-full bg-primary text-white h-10 rounded-lg' type='submit' onClick={submitHandler}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
