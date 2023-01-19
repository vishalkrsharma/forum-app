import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home, NewPost, Login, Signup, Start, Username } from './pages';
import useAuthContext from './hooks/useAuthContext';
import { VerifyEmail } from './components';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/newpost' element={user ? <NewPost /> : <Navigate to='/start' />} />
        <Route path='/start' element={!user ? <Start /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/' element={user ? <Home /> : <Navigate to='/start' />} />
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
