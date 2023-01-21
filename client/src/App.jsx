import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Main, NewPost, Login, Signup, Start, Home, Profile, Settings, VerifyMail , } from './pages/index';
import useAuthContext from './hooks/useAuthContext';


function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={!user ? <Start /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/verifymail' element={!user ? <VerifyMail /> : <Navigate to='/' />} />
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
