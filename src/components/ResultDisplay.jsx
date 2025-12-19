/**
 * کامپوننت ResultDisplay - نمایش نتیجه تبدیل
 */

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUnitInfo } from '../constants/units.js';
import { categoryColors } from '../constants/colors.js';

/**
 * @param {Object} props
 * @param {number|null} props.result - نتیجه تبدیل
 * @param {string} props.category - دسته تبدیل
 * @param {string} props.toUnit - واحد مقصد
 * @param {boolean} props.isLoading - آیا در حال محاسبه است
 * @param {string|null} props.error - پیام خطا (در صورت وجود)
 */
export function ResultDisplay({ result, category, toUnit, isLoading, error }) {
  // استفاده از useMemo برای بهینه‌سازی
  const unitInfo = useMemo(() => getUnitInfo(category, toUnit), [category, toUnit]);
  const unitName = useMemo(() => unitInfo ? unitInfo.name : toUnit, [unitInfo, toUnit]);
  const unitSymbol = useMemo(() => unitInfo ? unitInfo.symbol : '', [unitInfo]);
  const colors = useMemo(() => categoryColors[category] || categoryColors.length, [category]);

  // تعیین تعداد اعشار مناسب بر اساس نوع واحد
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

  // فرمت کردن عدد با رندسازی مناسب (با useMemo برای بهینه‌سازی)
  const formattedResult = useMemo(() => {
    if (result === null || result === undefined || isNaN(result)) return '';
    
    // برای اعداد خیلی بزرگ یا خیلی کوچک از نماد علمی استفاده می‌کنیم
    if (Math.abs(result) >= 1e15 || (Math.abs(result) < 1e-6 && result !== 0)) {
      return result.toExponential(6);
    }
    
    // بررسی اینکه آیا عدد صحیح است یا اعشاری
    const isInteger = Number.isInteger(result);
    
    if (isInteger) {
      // برای اعداد صحیح، فقط جداکننده هزارگان اضافه می‌کنیم
      return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // تعیین تعداد اعشار مناسب بر اساس نوع واحد
    const maxDecimals = getDecimalsForUnit(category, toUnit, result);
    
    // رند کردن عدد
    const rounded = Math.round(result * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
    
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
  }, [result, category, toUnit]);

  return (
    <div className="w-full px-4 py-6">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <p className="text-red-600 dark:text-red-400 text-center font-medium">
              {error}
            </p>
          </motion.div>
        )}

        {isLoading && !error && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-gray-600 dark:text-gray-400"
            >
              در حال محاسبه...
            </motion.p>
          </motion.div>
        )}


        {!isLoading && !error && result === null && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border-2 border-white/20 dark:border-gray-700/20 rounded-2xl p-6 sm:p-8 shadow-lg transition-shadow duration-300"
          >
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white/40 dark:text-gray-500 mb-2">
                ...
              </p>
              <p 
                className="text-lg text-white/60 dark:text-gray-400 font-medium"
                style={{
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textShadow: '0 0 1px rgba(255, 255, 255, 0.3), 0 0 2px rgba(255, 255, 255, 0.2)',
                  WebkitTextStroke: '0.3px transparent',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  isolation: 'isolate',
                }}
              >
                {unitName} {unitSymbol && `(${unitSymbol})`}
              </p>
            </div>
          </motion.div>
        )}

        {!isLoading && !error && result !== null && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border-2 border-white/30 dark:border-gray-700/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            style={{
              boxShadow: `0 20px 60px ${colors.from}30, inset 0 0 40px ${colors.to}10`,
            }}
          >
            <div className="text-center">
              <motion.p
                key={result}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {formattedResult}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/90 dark:text-gray-200 font-medium"
                style={{
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textShadow: '0 0 1px rgba(255, 255, 255, 0.3), 0 0 2px rgba(255, 255, 255, 0.2)',
                  WebkitTextStroke: '0.3px transparent',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  isolation: 'isolate',
                }}
              >
                {unitName} {unitSymbol && `(${unitSymbol})`}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

