import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './Components/Layout/Header/Header';
import WebFont from "webfontloader"
import { Fragment, useEffect } from 'react';
import Footer from './Components/Layout/Footer/Footer';
import Home from './Components/Home/Home';
import ProductDetail from './Components/Product/ProductDetail';

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
        <Route path='product/:id' element={<ProductDetail />} />
      </Routes>


      <Footer />
    </Fragment>
  );
}

export default App;
