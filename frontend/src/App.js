import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './Components/Layout/Header/Header';
import WebFont from "webfontloader"
import { Fragment, useEffect } from 'react';
import Footer from './Components/Layout/Footer/Footer';
import Home from './Components/Home/Home';
import Loader from './Components/Layout/Loader/Loader';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <Fragment>
      <Header />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route index element={<Home />} />
      </Routes>


      <Footer />
    </Fragment>
  );
}

export default App;
