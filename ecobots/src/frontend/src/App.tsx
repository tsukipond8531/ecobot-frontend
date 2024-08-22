import React from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';

import './App.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
