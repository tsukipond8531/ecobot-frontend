import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';

import './App.css';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
