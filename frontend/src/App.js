import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Header from './Components/Layout/Header/Header';
import WebFont from "webfontloader"
import { useEffect } from 'react';
import Footer from './Components/Layout/Footer/Footer';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
