import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { NewPost, Login, Signup, Home, Profile, Settings, VerifyMail, RequireAuth, Layout, CreateGroup, Group } from './pages/index';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path='/verifymail' element={!user ? <VerifyMail /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path='/newpost' element={<NewPost />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/groups/:name' element={<Group />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/createGroup' element={<CreateGroup />} />
              <Route index element={<Home />} />
            </Route>
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
