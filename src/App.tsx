import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Overview from './components/overview/Overview';
import Header from './components/header/Header';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header/><Overview/></>} />
        <Route path="/home" element={<><Header/><Home/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
