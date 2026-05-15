import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, ThemeProvider } from './app';
import './shared/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
