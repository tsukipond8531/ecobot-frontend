import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';
import Privacy from './views/Privacy';
import Tos from './views/Tos';

import './App.css';

export const CHATBOT_URL = import.meta.env.VITE_CANISTER_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-services" element={<Tos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
