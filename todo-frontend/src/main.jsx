import React from 'react';
import ReactDOM from 'react-dom/client';
import  GoogleSignIn from './Google_login'
import './index.css';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GoogleSignIn />
    <App />
  </React.StrictMode>
);


