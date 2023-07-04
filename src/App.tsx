import React from 'react';
import './App.css';
import Login from './pages/Auth/Login';
import { Home } from './pages/Home';
import {CellEditor} from './components/Grid/CellEditor'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './pages/Auth/Register';
import { PhotoDetails } from "./pages/Auth/PhotoDetails"
import { OnScrollPagination }  from './components/Grid/onScrollpagination';
//import GridExample from './components/Grid/CusotmPagination'

const App:React.FC=()=> {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
      <Route path='/images' element={<PhotoDetails />} />
        <Route path='/onScroll' element={<OnScrollPagination />} />
      </Routes>

  );
}

export default App;
