import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export function useLogin() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/user/login', {
        email,
        password,
      });
      dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return { login, error, isLoading };
}
