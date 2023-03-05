import React, { useContext } from 'react';
import axios from 'axios';
import useAuthContext from './useAuthContext';

export default function usePost() {
  const {user} = useAuthContext()

  const { accessToken } = user;
  const createPost = async (body) => {
    try {
      const { data } = await axios.post('/api/post/create', body, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPosts = async () => {
    try {
      const { data } = await axios.get('/api/post/byUserId', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(data.data)
    return data.data
    } catch (err) {
      console.log(err);
    }
  };

  const getGroupPost = async (groupName) => {
    try {
      const { data } = await axios.get(`/api/post/byGroupName/${groupName}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(data.data)
    return data.data
    } catch (err) {
      console.log(err);
    }
  };

 const getuserGroupPost = async (body) =>{
  console.log(body)
  try {
    const { data } = await axios.post(`/api/post/byGroups`,body, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
  });
  console.log(data)
  return data
  } catch (err) {
    console.log(err);
  }
 }

  const deletePost = async (body) => {
    try {
      const { data } = await axios.post('/api/post/deletePost', body);
    } catch (err) {
      console.log(err);
    }
  };

  return { createPost , getUserPosts ,getGroupPost ,getuserGroupPost};
}
