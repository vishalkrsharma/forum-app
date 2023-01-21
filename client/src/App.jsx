import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Main, NewPost, Login, Signup, Start, Home, Profile, Settings } from './pages/index';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' limit={1} autoClose={1000} closeOnClick pauseOnFocusLoss={false} />
      <Routes>
        <Route path='/start' element={!user ? <Start /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/' element={user ? <Main /> : <Navigate to='/start' />}>
          <Route path='home' element={<Home />} />
          <Route path='newpost' element={<NewPost />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>

      {/* TEMPORARY TESTING ROUTES */}
      {/* <Routes>
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/start' element={<Start />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verifyemail' element={<VerifyEmail />} />
        <Route path='/username' element={<Username />} />
        <Route index element={<Home />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
