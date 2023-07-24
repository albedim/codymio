import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview';
import Header from './components/header/Header';
import Home from './pages/Home';
import Contribute from './pages/Contribute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header/><Overview/></>} />
        <Route path='/contribute/:github_repository_id' element={<><Header/><Contribute/></>} />
        <Route path="/home" element={<><Header/><Home/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
