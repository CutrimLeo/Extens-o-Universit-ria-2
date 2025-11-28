import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1A1A1A',
          color: '#F5E8D8',
          border: '1px solid rgba(218, 165, 32, 0.3)',
        },
      }}
    />
  </React.StrictMode>
);
