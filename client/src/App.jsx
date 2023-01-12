import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, NewPost, Signin, Signup, Start } from './pages/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/start' element={<Start />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
