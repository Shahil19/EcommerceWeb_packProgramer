import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from "react-redux"
import store from './store';
import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"


const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeOut: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
