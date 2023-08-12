import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header';
import Contribute from './pages/contributions';
import Contributions from './pages/contributions';
import NotFound from './pages/not_found';
import Overview from './pages/overview';
import Home from './pages/home';

export let USED_COLORS: string[] = []

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header /><Overview /></>} />
        <Route path='/contributions' element={<><Header /><Contributions /></>} />
        <Route path="/home" element={<><Header /><Home /></>} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
