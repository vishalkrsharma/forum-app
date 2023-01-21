import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthContext from './useAuthContext';

export default function useLogin() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (body) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/user/login', body);
      dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return { login, error, isLoading };
}
