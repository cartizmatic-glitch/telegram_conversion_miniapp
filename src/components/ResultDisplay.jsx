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

  // فرمت کردن عدد با جداکننده هزارگان (با useMemo برای بهینه‌سازی)
  const formattedResult = useMemo(() => {
    if (result === null || result === undefined || isNaN(result)) return '';
    
    // برای اعداد خیلی بزرگ یا خیلی کوچک از نماد علمی استفاده می‌کنیم
    if (Math.abs(result) >= 1e15 || (Math.abs(result) < 1e-6 && result !== 0)) {
      return result.toExponential(6);
    }
    
    // برای اعداد عادی از جداکننده هزارگان استفاده می‌کنیم
    const parts = result.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }, [result]);

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
              <p className="text-lg text-white/60 dark:text-gray-400 font-medium">
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

