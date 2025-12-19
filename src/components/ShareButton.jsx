/**
 * کامپوننت ShareButton - دکمه اشتراک‌گذاری نتیجه تبدیل
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '../hooks/useTelegram.js';
import { getUnitInfo } from '../constants/units.js';

/**
 * @param {Object} props
 * @param {string|number} props.result - نتیجه تبدیل
 * @param {string} props.category - دسته تبدیل
 * @param {string} props.fromUnit - واحد مبدا
 * @param {string} props.toUnit - واحد مقصد
 * @param {string|number} props.inputValue - مقدار ورودی
 */
export function ShareButton({ result, category, fromUnit, toUnit, inputValue }) {
  const [shared, setShared] = useState(false);
  const { hapticFeedback, tg, showAlert } = useTelegram();

  // تعیین تعداد اعشار مناسب بر اساس نوع واحد (مشابه ResultDisplay)
  const getDecimalsForUnit = (categoryKey, unitKey, value) => {
    // دما: 1 رقم اعشار
    if (categoryKey === 'temperature') {
      return 1;
    }
    
    // سرعت: 1-2 رقم اعشار
    if (categoryKey === 'speed') {
      if (Math.abs(value) >= 100) return 1;
      return 2;
    }
    
    // طول
    if (categoryKey === 'length') {
      if (unitKey === 'millimeter') return 0; // میلی‌متر: بدون اعشار
      if (unitKey === 'centimeter') return 1; // سانتی‌متر: 1 رقم
      if (unitKey === 'meter' || unitKey === 'kilometer' || unitKey === 'mile' || unitKey === 'nauticalMile') {
        return 2; // متر، کیلومتر، مایل: 2 رقم
      }
      return 2; // یارد، فوت، اینچ: 2 رقم
    }
    
    // وزن
    if (categoryKey === 'weight') {
      if (unitKey === 'milligram') return 0; // میلی‌گرم: بدون اعشار
      if (unitKey === 'gram') return 1; // گرم: 1 رقم
      if (unitKey === 'kilogram' || unitKey === 'ton' || unitKey === 'metricTon') {
        return 2; // کیلوگرم، تن: 2 رقم
      }
      return 2; // پوند، اونس، استون: 2 رقم
    }
    
    // حجم
    if (categoryKey === 'volume') {
      if (unitKey === 'milliliter') return 0; // میلی‌لیتر: بدون اعشار
      if (unitKey === 'tablespoon' || unitKey === 'teaspoon' || unitKey === 'cup') {
        return 1; // قاشق، فنجان: 1 رقم
      }
      if (unitKey === 'liter' || unitKey === 'cubicMeter' || unitKey === 'gallon' || unitKey === 'quart' || unitKey === 'pint') {
        return 2; // لیتر، متر مکعب، گالن: 2 رقم
      }
      return 2; // سایر واحدها: 2 رقم
    }
    
    // زمان: 2 رقم اعشار
    if (categoryKey === 'time') {
      return 2;
    }
    
    // مساحت: 2-3 رقم اعشار
    if (categoryKey === 'area') {
      if (Math.abs(value) >= 1000) return 2;
      return 3;
    }
    
    // پیش‌فرض: 2 رقم
    return 2;
  };

  // فرمت کردن عدد برای share (مشابه ResultDisplay)
  const formatNumberForShare = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '';
    
    // برای اعداد خیلی بزرگ یا خیلی کوچک از نماد علمی استفاده می‌کنیم
    if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // بررسی اینکه آیا عدد صحیح است یا اعشاری
    const isInteger = Number.isInteger(num);
    
    if (isInteger) {
      // برای اعداد صحیح، فقط جداکننده هزارگان اضافه می‌کنیم
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // تعیین تعداد اعشار مناسب بر اساس نوع واحد
    const maxDecimals = getDecimalsForUnit(category, toUnit, num);
    
    // رند کردن عدد
    const rounded = Math.round(num * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
    
    // حذف صفرهای اضافی در انتهای اعشار
    let roundedStr = rounded.toFixed(maxDecimals);
    roundedStr = roundedStr.replace(/\.?0+$/, '');
    
    // اگر بعد از حذف صفرها، عدد صحیح شد، اعشار را نمایش نمی‌دهیم
    if (Number.isInteger(parseFloat(roundedStr))) {
      return parseFloat(roundedStr).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // اضافه کردن جداکننده هزارگان به قسمت صحیح
    const parts = roundedStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return parts.join('.');
  };

  const handleShare = async () => {
    if (result === null || result === undefined) return;

    try {
      // دریافت اطلاعات واحدها
      const fromUnitInfo = getUnitInfo(category, fromUnit);
      const toUnitInfo = getUnitInfo(category, toUnit);
      
      const fromUnitName = fromUnitInfo?.name || fromUnit;
      const toUnitName = toUnitInfo?.name || toUnit;
      
      // فرمت کردن نتیجه
      const formattedResult = formatNumberForShare(result);
      
      // ساخت متن share با فرمت RTL مناسب
      // استفاده از Zero-Width Non-Joiner (‌) برای جلوگیری از جابجایی فارسی/انگلیسی
      const appLink = 'https://t.me/conversion_miniapp_bot/convertor';
      // استفاده از ZWNJ (\u200C) برای جدا کردن اعداد از متن فارسی
      // فرمت: یک خط فاصله در اول، نتیجه تبدیل (دو خط فاصله) متن
      // لینک از متن حذف شده چون Telegram خودش از URL parameter آن را در preview card نمایش می‌دهد
      const shareText = `\n${inputValue}\u200C ${fromUnitName} میشه ${formattedResult}\u200C ${toUnitName}\n\nتبدیل شده با مینی اپ تبدل واحد تلگرام`;

      // استفاده از Telegram Web App API برای share
      if (tg) {
        // اگر در Telegram هستیم، از openTelegramLink استفاده می‌کنیم
        // برای جلوگیری از نمایش لینک در اول متن، فقط text را می‌فرستیم
        // و لینک را در انتهای متن قرار می‌دهیم
        // استفاده از share/text برای جلوگیری از نمایش لینک در اول
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(appLink)}&text=${encodeURIComponent(shareText)}`;
        if (tg.openTelegramLink) {
          tg.openTelegramLink(telegramShareUrl);
        } else {
          // Fallback: باز کردن در پنجره جدید
          window.open(telegramShareUrl, '_blank');
        }
      } else if (navigator.share) {
        // استفاده از Web Share API
        await navigator.share({
          title: 'تبدیل واحد',
          text: shareText,
          url: appLink,
        });
      } else {
        // Fallback: کپی به clipboard
        await navigator.clipboard.writeText(shareText);
        showAlert?.('متن به کلیپ‌بورد کپی شد');
      }

      hapticFeedback('notification', 'success');
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (error) {
      console.error('Failed to share:', error);
      hapticFeedback('notification', 'error');
      showAlert?.('خطا در اشتراک‌گذاری');
    }
  };

  if (result === null || result === undefined) return null;

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="px-4 py-2 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 text-white rounded-2xl border-2 border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-200"
      title="اشتراک‌گذاری نتیجه"
    >
      <AnimatePresence mode="wait">
        {shared ? (
          <motion.span
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Shared!
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

