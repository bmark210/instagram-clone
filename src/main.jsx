import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

// client side rendered app: react
// => database which is firebase
// => react-loading-skeleton
// => tailwind

//architecture
// src
// => components
// => constants
// => helpers
// => hooks
// => lib (firebase is going live in here)
// => services (firebase functions in here)
// => styles (tailwind)
