import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';
import Privacy from './views/Privacy';
import Tos from './views/Tos';
import Chat from './views/Chat';

import { UserProvider } from './hooks/contexts/usercontext';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-services" element={<Tos />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
