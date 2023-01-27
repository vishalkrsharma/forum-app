import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';

export default function useLogout() {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/start');
  };

  return { logout };
}
