import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const CreateGroup = () => {
  const [groupname, setGroupname] = useState('');
  const [about, setAbout] = useState('');
  const { user } = useAuthContext();
  const { accessToken } = user;
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: groupname,
      about: about,
    };
    const { data } = await axios.post('/api/group/create', body, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('res', data);
    navigate(`/groups/${data.data._id}`);
  };

  return (
    <div className='mx-auto p-3'>
      <form className='flex justify-top items-center flex-col gap-7 w-80 mx-auto'>
        <div className='text-xl text-primary font-medium'>Create a new Group</div>
        <div className='relative w-full'>
          <label className='px-3 text-primary -mb-5 font-medium' htmlFor='groupName'>
            Name
          </label>
          <input
            id='groupName'
            className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
            type='text'
            placeholder='Enter Group Name'
            value={groupname}
            onChange={(e) => {
              setGroupname(e.target.value);
            }}
          />
        </div>
        <div className='relative w-full'>
          <label className='px-3 text-primary -mb-5 font-medium' htmlFor='groupAbout'>
            About
          </label>
          <input
            id='groupAbout'
            className='border-secondary border-2 py-2 px-3 rounded-lg focus:border-primary w-full'
            type='text'
            placeholder='Enter Group About'
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
        </div>
        <button className='bg-primary text-white w-full h-10 rounded-lg mt-4 cursor-pointer ' onClick={handelSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
