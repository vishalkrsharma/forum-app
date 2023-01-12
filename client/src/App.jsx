import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Signin, Signup, Title } from './pages/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/title' element={<Title />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
