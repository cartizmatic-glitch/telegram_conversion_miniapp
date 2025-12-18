/**
 * کامپوننت Welcome - صفحه خوش‌آمدگویی با انیمیشن‌های جذاب
 */

import { motion } from 'framer-motion';
import { WelcomeCircle } from './WelcomeCircle.jsx';

// مثال‌های تبدیل رندوم
const exampleConversions = [
  // طول
  { category: 'length', fromUnit: 'meter', toUnit: 'kilometer', baseValue: 100, range: [50, 200] },
  { category: 'length', fromUnit: 'kilometer', toUnit: 'mile', baseValue: 10, range: [5, 20] },
  { category: 'length', fromUnit: 'foot', toUnit: 'meter', baseValue: 100, range: [50, 200] },
  // وزن
  { category: 'weight', fromUnit: 'kilogram', toUnit: 'pound', baseValue: 10, range: [5, 20] },
  { category: 'weight', fromUnit: 'gram', toUnit: 'kilogram', baseValue: 1000, range: [500, 2000] },
  { category: 'weight', fromUnit: 'pound', toUnit: 'kilogram', baseValue: 10, range: [5, 20] },
  // دما
  { category: 'temperature', fromUnit: 'celsius', toUnit: 'fahrenheit', baseValue: 25, range: [0, 40] },
  { category: 'temperature', fromUnit: 'fahrenheit', toUnit: 'celsius', baseValue: 77, range: [32, 104] },
  // حجم
  { category: 'volume', fromUnit: 'liter', toUnit: 'milliliter', baseValue: 1, range: [0.5, 2] },
  { category: 'volume', fromUnit: 'gallon', toUnit: 'liter', baseValue: 1, range: [0.5, 2] },
  // زمان
  { category: 'time', fromUnit: 'hour', toUnit: 'minute', baseValue: 2, range: [1, 5] },
  { category: 'time', fromUnit: 'day', toUnit: 'hour', baseValue: 1, range: [0.5, 3] },
  // مساحت
  { category: 'area', fromUnit: 'squareMeter', toUnit: 'hectare', baseValue: 10000, range: [5000, 20000] },
  // سرعت
  { category: 'speed', fromUnit: 'kilometerPerHour', toUnit: 'milePerHour', baseValue: 100, range: [50, 150] },
];

/**
 * @param {Object} props
 * @param {Function} props.onStart - تابع شروع (برای رفتن به صفحه اصلی)
 */
export function Welcome({ onStart }) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      onClick={onStart}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden cursor-pointer"
    >
      {/* پس‌زمینه gradient متحرک */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Overlay برای خوانایی بهتر */}
      <div className="absolute inset-0 bg-black/20" />

      {/* محتوای اصلی */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md text-center">
        {/* آیکون */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <div className="relative">
            {/* دایره پس‌زمینه */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* آیکون اصلی */}
            <div className="relative w-32 h-32 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-2xl">
              <motion.svg
                className="w-16 h-16 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </motion.svg>
            </div>
          </div>
        </motion.div>

        {/* عنوان */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg"
        >
          تبدیل واحد
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-white/90 mb-4 drop-shadow-md"
        >
          تبدیل سریع و آسان واحدهای مختلف
        </motion.p>

        {/* دایره شیشه‌ای تبدیل */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <WelcomeCircle />
        </motion.div>

        {/* دکمه شروع */}
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transition-shadow duration-300"
        >
          شروع تبدیل
        </motion.button>
      </div>
    </motion.div>
  );
}

