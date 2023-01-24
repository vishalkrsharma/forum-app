import React, { useContext } from 'react';
import axios from 'axios';
import useAuthContext from './useAuthContext';

export default function usePost() {
  const { user } = useAuthContext();

  const { accessToken } = user;
  const createPost = async (body) => {
    console.log(accessToken);
    try {
      const { data } = await axios.post('/api/post/create', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPosts = async (body) => {
    try {
      const { data } = await axios.post('/api/post/getUserPost', body);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (body) => {
    try {
      const { data } = await axios.post('/api/post/deletePost', body);
    } catch (err) {
      console.log(err);
    }
  };

  return { createPost };
}
