import React from 'react';
import axios from 'axios';

export default function usePost() {
  const getGroupPosts = async (body) => {
    try {
      const { data } = await axios.post('/api/post/getGroupPost', body);
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
}
