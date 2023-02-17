import React from 'react';
import axios from 'axios';
import useAuthContext from '../hooks/useAuthContext';

export default function useGroup() {
  const { user } = useAuthContext();
  const { accessToken } = user;
  const getGroup = async (body) => {
    try {
      const { data } = await axios.post('/api/group/getById', body, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { getGroup };
}
