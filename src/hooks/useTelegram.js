import { useEffect, useState } from 'react';

/**
 * Hook برای دسترسی به Telegram Web App API
 * این hook امکان دسترسی به theme، viewport و سایر قابلیت‌های Telegram را فراهم می‌کند
 */
export function useTelegram() {
  const [tg, setTg] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // بررسی وجود Telegram Web App SDK
    if (window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      
      // آماده‌سازی Telegram Web App
      telegram.ready();
      
      // تنظیم viewport برای موبایل
      telegram.expand();
      
      // غیرفعال کردن pull-to-refresh
      telegram.enableClosingConfirmation();
      
      // تنظیم رنگ‌های Telegram theme
      if (telegram.setHeaderColor) {
        telegram.setHeaderColor('#667eea');
      }
      if (telegram.setBackgroundColor) {
        telegram.setBackgroundColor('#667eea');
      }
      
      setTg(telegram);
      
      // دریافت theme فعلی
      const currentTheme = telegram.colorScheme || 'light';
      setTheme(currentTheme);
      
      // تنظیم theme در body
      document.body.setAttribute('data-theme', currentTheme);
      
      // تنظیم رنگ‌های CSS variables از Telegram
      if (telegram.themeParams) {
        const themeParams = telegram.themeParams;
        const root = document.documentElement;
        
        if (themeParams.bg_color) {
          root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
        }
        if (themeParams.text_color) {
          root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
        }
        if (themeParams.hint_color) {
          root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
        }
        if (themeParams.link_color) {
          root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
        }
        if (themeParams.button_color) {
          root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
        }
        if (themeParams.button_text_color) {
          root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
        }
      }
      
      // گوش دادن به تغییرات theme
      telegram.onEvent('themeChanged', () => {
        const newTheme = telegram.colorScheme || 'light';
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
        
        // به‌روزرسانی رنگ‌های CSS variables
        if (telegram.themeParams) {
          const themeParams = telegram.themeParams;
          const root = document.documentElement;
          
          if (themeParams.bg_color) {
            root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
          }
          if (themeParams.text_color) {
            root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
          }
          if (themeParams.hint_color) {
            root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
          }
          if (themeParams.link_color) {
            root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
          }
          if (themeParams.button_color) {
            root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
          }
          if (themeParams.button_text_color) {
            root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
          }
        }
      });
      
      // Back button handler
      if (telegram.BackButton) {
        telegram.BackButton.show();
        telegram.BackButton.onClick(() => {
          // اگر در صفحه Welcome هستیم، بستن اپ
          if (window.location.hash === '#welcome' || !window.location.hash) {
            telegram.close();
          } else {
            // برگشت به صفحه قبلی
            window.history.back();
          }
        });
      }
      
      setIsReady(true);
    } else {
      // حالت development - استفاده از theme پیش‌فرض
      setTheme('light');
      setIsReady(true);
    }
  }, []);

  return {
    tg,
    theme,
    isReady,
    // توابع کمکی
    showAlert: (message) => tg?.showAlert(message),
    showConfirm: (message) => tg?.showConfirm(message),
    showPopup: (params) => tg?.showPopup(params),
    close: () => tg?.close(),
    expand: () => tg?.expand(),
    ready: () => tg?.ready(),
    // Haptic feedback
    hapticFeedback: (type = 'impact', style = 'medium') => {
      if (tg?.HapticFeedback) {
        if (type === 'impact') {
          tg.HapticFeedback.impactOccurred(style);
        } else if (type === 'notification') {
          tg.HapticFeedback.notificationOccurred(style);
        } else if (type === 'selection') {
          tg.HapticFeedback.selectionChanged();
        }
      }
    },
  };
}

