// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')  // Ensure the path here is correct
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

const resizeObserverError = () => {
  const resizeObserverLoopErr = /(ResizeObserver loop limit exceeded)/;
  window.addEventListener('error', (e) => {
    if (resizeObserverLoopErr.test(e.message)) {
      e.stopImmediatePropagation();
    }
  });
};

resizeObserverError();



ReactDOM.render(<App />, document.getElementById('root'));
