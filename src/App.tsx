import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview';
import Header from './components/header/Header';
import Home from './pages/Home';
import Contribute from './pages/Contributions';
import Contributions from './pages/Contributions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header/><Overview/></>} />
        <Route path='/contributions' element={<><Header/><Contributions/></>} />
        <Route path="/home" element={<><Header/><Home/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
