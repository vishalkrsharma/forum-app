import React, { useState } from 'react';
import axios from 'axios';

import useAuthContext from './useAuthContext';

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/user/signup', {
        email,
        password,
      });
      setLoading(false);

      dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return <div>useSignup</div>;
}
