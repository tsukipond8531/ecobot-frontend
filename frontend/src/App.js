import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/About'));
const Privacy = lazy(() => import('./views/Privacy'));
const Tos = lazy(() => import('./views/Tos'));
const Chat = lazy(() => import('./views/Chat'));


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-services" element={<Tos />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
