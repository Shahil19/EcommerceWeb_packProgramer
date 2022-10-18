import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Header from './Components/Layout/Header/Header';
import WebFont from "webfontloader"
import { useEffect } from 'react';

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
    </Router>
  );
}

export default App;