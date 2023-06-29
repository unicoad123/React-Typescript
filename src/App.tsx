import React from 'react';
import './App.css';
import Login from './pages/Auth/Login';
import { Home } from './pages/Home';
import {CellEditor} from './components/Grid/CellEditor'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './pages/Auth/Register';
import { PhotoDetails } from "./pages/Auth/PhotoDetails"

const App:React.FC=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/images' element={<PhotoDetails />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
