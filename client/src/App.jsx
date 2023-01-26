import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Main, NewPost, Login, Signup, Start, Home, Profile, Settings, VerifyMail } from './pages/index';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/start' element={<Start />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verifymail' element={<VerifyMail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Main />}>
            <Route path='newpost' element={<NewPost />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
            <Route index element={<Home />} />
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
    </div>
  );
}

export default App;
