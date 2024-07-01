import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import {NotificationProvider} from "./components/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NotificationProvider>
          <Router>
              <App />
          </Router>
      </NotificationProvider>

  </React.StrictMode>
);
