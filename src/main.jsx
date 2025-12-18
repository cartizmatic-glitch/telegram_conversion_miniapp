/**
 * Entry point اپلیکیشن
 * این فایل اپلیکیشن React را در DOM رندر می‌کند
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { setViewportHeight } from './utils/telegram.js';

// تنظیم viewport height برای موبایل
setViewportHeight();
window.addEventListener('resize', setViewportHeight);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

