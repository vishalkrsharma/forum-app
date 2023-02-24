import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthContext from './useAuthContext';

export default function useUser() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();

  let accessToken = null;
  if (user) {
    accessToken = user.accessToken;
  } else {
    accessToken = null;
  }
  const login = async (body) => {
    try {
      const { data } = await axios.post('/api/user/login', body);
      dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      setError(null);
      navigate('/');
      return data;
    } catch (err) {
      setError(err);
      console.log(err);
      return err.response;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const signup = async (body) => {
    try {
      const { data } = await axios.post('/api/user/register', body).then((res) => {
        if (res.status) login(body);
      });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get('/api/user/getProfile', {
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

  const verifyOTP = async (body) => {
    try {
      const data = await axios.post('/api/user/verifyotp', body);
      return data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  };

  // const sendCode = async (body) => {
  //   // try {
  //   const { data } = await axios
  //     .post('/api/user/sendotp', body)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   //   console.log(data);
  //   //   return data;
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   // return err.response;
  //   // }
  // };

  const sendCode = async (body) => {
    try {
      const data = await axios.post('/api/user/sendotp', body);
      // console.log(data);
      return data;
    } catch (err) {
      // console.log(err.response);
      return err.response;
    }
  };

  return { login, logout, signup, error, isLoading, setIsLoading, setError, getProfile, verifyOTP, sendCode };
}
