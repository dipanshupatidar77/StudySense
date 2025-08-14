import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
