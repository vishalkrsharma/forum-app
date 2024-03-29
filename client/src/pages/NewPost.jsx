import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineDownCircle, AiOutlineGroup } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorNotification } from '../components/index';

import usePost from '../hooks/usePost';
import { Avatar } from '../components/index';

export default function NewPost(props) {
  const ref = useRef();
  const [userData, setUserData] = useOutletContext();
  const { groups } = userData;
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [buttonPlaceholder, setButtonPlaceholder] = useState([null, 'Select a group']);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    if (groupId !== null && postTitle !== '' && postBody !== '') {
      const body = {
        groupName,
        groupId,
        title: postTitle,
        caption: postBody,
      };
      await createPost(body);
      console.log(postTitle, postBody);
      navigate('/');
    } else {
      setError('Fields are empty');
    }
  };

  return (
    <>
      <div className='max-w-3xl mx-auto text-dark'>
        <div className='relative mb-2 py-2 inline-block' ref={ref}>
          <button
            type='button'
            className='border-2 border-diffused py-3 px-4 w-56 font-medium rounded-xl flex items-center justify-between hover:bg-diffused hover:border-dark'
            onClick={() => setShowGroupMenu(!showGroupMenu)}
          >
            <div className='flex items-center justify-center gap-4'>
              {buttonPlaceholder[0] === null ? (
                <AiOutlineTeam className='text-2xl' style={{ height: '30px' }} />
              ) : (
                <Avatar name={`${buttonPlaceholder[0]}`} variant='bauhaus' size={30} />
              )}
              {buttonPlaceholder[1]}
            </div>
            <AiOutlineDownCircle className='text-2xl' />
          </button>
          {showGroupMenu ? (
            <div className='bg-white absolute mt-4 top-16 rounded-lg shadow-lg text-base z-10 w-56 p-2 flex flex-col gap-2 max-h-60 overflow-auto'>
              {groups &&
                groups.map((group, key) => {
                  return (
                    <button
                      type='button'
                      key={group._id}
                      className='item py-2 px-5 flex justify-start items-center gap-4 hover:bg-diffused rounded-lg'
                      onClick={() => {
                        setButtonPlaceholder([group.name, group.name]);
                        setGroupName(group.name);
                        setGroupId(group._id);
                        setShowGroupMenu(false);
                      }}
                    >
                      <Avatar name={`${group.name}`} variant='bauhaus' size={30} />
                      {group.name}
                    </button>
                  );
                })}
            </div>
          ) : null}
        </div>
        <form className='flex flex-col justify-start gap-4'>
          <label className='font-medium -mb-3' htmlFor='title' style={{ marginLeft: '.7rem' }}>
            Give a title...
          </label>
          <input
            className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-dark'
            type='text'
            id='title'
            placeholder='An interesting title'
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label className='font-medium -mb-3' htmlFor='body' style={{ marginLeft: '.7rem' }}>
            Body
          </label>
          <textarea
            className='h-60 border-secondary border-2 p-2 px-3 rounded-lg resize-none focus:border-dark'
            type='text'
            id='body'
            placeholder='What are you thinking about...'
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button className='mx-auto w-full bg-primary text-white h-10 rounded-lg md:w-1/2' type='submit' onClick={submitHandler}>
            Post
          </button>
        </form>
      </div>
      {error ? <ErrorNotification error={error} setError={setError} /> : null}
    </>
  );
}
