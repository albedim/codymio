import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header';
import Contribute from './pages/contributions';
import Contributions from './pages/contributions';
import NotFound from './pages/not_found';
import { colors } from './utils/utils';
import Overview from './pages/overview';
import Home from './pages/home';

export let USED_COLORS: string[] = []

function App() {

  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  const getColors = () => {
    USED_COLORS = colors["light"]
    /*
    const savedMode: null | string = window.localStorage.getItem("theme")
    if (savedMode == null) {
      window.localStorage.setItem("theme", "light")
      USED_COLORS = colors["light"]
    }
    if (savedMode == "light") {
      USED_COLORS = colors["light"]
      document.body.style.backgroundColor = colors["light"][0]
    } else {
      USED_COLORS = colors["dark"]
      document.body.style.backgroundColor = colors["dark"][0]
    }
    */
    setIsThemeLoaded(true)
  }

  useEffect(() => {
    getColors()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {
          isThemeLoaded ? (
            <>
              <Route path="/" element={<><Header /><Overview /></>} />
              <Route path='/contributions' element={<><Header /><Contributions /></>} />
              <Route path="/home" element={<><Header /><Home /></>} />
              <Route path='/*' element={<NotFound />} />
            </>
          ):(
            <></>
          )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
