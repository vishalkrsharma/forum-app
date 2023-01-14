import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home, NewPost, Login, Signup, Start } from './pages/index';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path='/newpost' element={user ? <NewPost /> : <Navigate to='/start' />} />
        <Route path='/start' element={!user ? <Start /> : <Navigate to='/start' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/start' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/start' />} />
        <Route index element={user ? <Home /> : <Navigate to='/start' />} />
      </Routes> */}
      <Routes>
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/start' element={<Start />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
