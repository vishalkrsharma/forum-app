import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home, NewPost, Signin, Signup, Start } from './pages/index';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/newpost' element={user ? <NewPost /> : <Navigate to='/start' />} />
        <Route path='/start' element={!user ? <Start /> : <Navigate to='/start' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/start' />} />
        <Route path='/signin' element={!user ? <Signin /> : <Navigate to='/start' />} />
        <Route index element={user ? <Home /> : <Navigate to='/start' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
