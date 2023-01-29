import React from 'react';
import axios from 'axios';

export default function useUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = user;

  const getProfile = async () => {
    try {
      const { data } = await axios.get('/api/user/getProfile', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return { getProfile };
}
