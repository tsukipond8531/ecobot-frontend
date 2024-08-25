import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Chat from './views/Chat';

import { UserProvider } from './hooks/contexts/usercontext';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
