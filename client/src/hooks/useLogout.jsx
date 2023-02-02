import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';

export default function useLogout() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  //const user = JSON.parse(localStorage.getItem('user'));
  // const { user } = state;
  // const { accessToken } = user

  const logout = () => {
    // const { data } = await axios.delete('/api/user/logout', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     authentication: `Bearer ${accessToken}`,
    //   },
    // });
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return { logout };
}
