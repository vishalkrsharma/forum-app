import React, { useContext } from 'react';
import axios from 'axios';
import useAuthContext from './useAuthContext';

export default function usePost() {
  const user = JSON.parse(localStorage.getItem('user'));

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
