/**
 * توابع کمکی برای کار با Telegram Web App SDK
 */

/**
 * بررسی اینکه آیا در محیط Telegram اجرا می‌شود یا نه
 * @returns {boolean}
 */
export function isTelegramWebApp() {
  return typeof window !== 'undefined' && window.Telegram?.WebApp;
}

/**
 * دریافت theme فعلی Telegram
 * @returns {string} 'light' یا 'dark'
 */
export function getTelegramTheme() {
  if (isTelegramWebApp()) {
    return window.Telegram.WebApp.colorScheme || 'light';
  }
  // در حالت development، از prefers-color-scheme استفاده می‌کنیم
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * تنظیم theme برای body element
 * @param {string} theme - 'light' یا 'dark'
 */
export function setBodyTheme(theme) {
  if (typeof document !== 'undefined') {
    document.body.setAttribute('data-theme', theme);
  }
}

/**
 * تنظیم viewport height برای موبایل
 */
export function setViewportHeight() {
  if (typeof window !== 'undefined') {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

