import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
// Opsional, jika kamu punya file CSS yang ingin diimpor

// Cari elemen root di dalam file HTML
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Tambahkan ini untuk menghindari error TS1208
export {};
