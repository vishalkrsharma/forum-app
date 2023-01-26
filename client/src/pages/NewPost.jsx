import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { AiOutlineDownCircle } from 'react-icons/ai';

import usePost from '../hooks/usePost';

export default function NewPost() {
  const ref = useRef();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [buttonPlaceholder, setButtonPlaceholder] = useState('Select a Group');
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [groupName, setGroupName] = useState(null);

  const grpArr = ['grp1', 'grp2', 'grp3'];

  const { createPost } = usePost();

  useEffect(() => {
    const clickOutside = (e) => {
      if (showGroupMenu && ref.current && !ref.current.contains(e.target)) {
        setShowGroupMenu(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showGroupMenu]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      groupName,
      title: postTitle,
      caption: postBody,
    };
    await createPost(body);
    console.log(postTitle, postBody);
  };

  return (
    <div style={{ height: 'calc(100vh - 4rem)' }}>
      <div className='relative mb-2 py-2 inline-block' ref={ref}>
        <button
          type='button'
          className='border-2 border-primary p-2 w-52 font-medium rounded-xl flex items-center justify-between hover:bg-primary hover:text-white'
          onClick={() => setShowGroupMenu(!showGroupMenu)}
        >
          {buttonPlaceholder}
          <AiOutlineDownCircle className='text-2xl' />
        </button>
        {showGroupMenu ? (
          <div className='absolute top-14 shadow-md p-2 w-52 bg-white rounded-xl'>
            {grpArr.map((group, idx) => (
              <div
                className='p-2 cursor-pointer hover:text-white hover:bg-primary rounded-xl'
                key={idx}
                onClick={() => {
                  setGroupName(group);
                  setShowGroupMenu(false);
                }}
              >
                {group}
              </div>
            ))}
          </div>
        ) : null}
      </div>
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
  );
}
