import React, { useState } from 'react';
import axios from 'axios';

import useAuthContext from './useAuthContext';
import useLogin from './useLogin';

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { login } = useLogin();
  const { dispatch } = useAuthContext();

  const signup = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/user/register', body).then((res) => {
        if (res.status) login(body);
      });
      setLoading(false);

      //dispatch({ type: 'LOGIN', payload: data });
      //localStorage.setItem('user', JSON.stringify(data));
      return;
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return { error, isLoading, signup };
}
