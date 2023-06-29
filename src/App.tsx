import React from 'react';
import './App.css';
import Login from './pages/Auth/Login';
import { Home } from './pages/Home';
import {CellEditor} from './components/Grid/CellEditor'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

const App:React.FC=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/celleditor' element={<CellEditor />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
