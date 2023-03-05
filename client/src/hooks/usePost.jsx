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
    console.log("posts")
    console.log(data.data)
    return data.data
    } catch (err) {
      console.log(err);
    }
  };

  const getSinglePost = async (postIdArray) =>{
    console.log(postIdArray)
  try {
    const { data } = await axios.post(`/api/post/byPostId`,postIdArray, {
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

  const getReplies = (id , commentsByParentId)=>{
    // return commentsByParentId[id]
  }

 const getuserGroupPost = async (body) =>{
  try {
    const response = await axios.post(`/api/post/byGroups`,body, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
  });
  return response.data
  } catch (err) {
    console.log(err);
  }
 }

  const deletePost = async (body) => {
    console.log(body,accessToken)
    try {
      const { data } = await axios.delete('/api/post/delete', {headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
  },body
        );
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return { createPost , getUserPosts ,getGroupPost ,getuserGroupPost ,getSinglePost, getReplies};
}
