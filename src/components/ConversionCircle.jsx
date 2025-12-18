/**
 * کامپوننت ConversionCircle - نمایش تبدیل در دایره شیشه‌ای
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convert } from '../utils/conversions/index.js';
import { getUnitInfo, getUnitsByCategory } from '../constants/units.js';
import { categoryColors } from '../constants/colors.js';

// Icon های SVG برای هر دسته
const categoryIcons = {
  length: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  ),
  weight: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  ),
  temperature: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  ),
  volume: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  ),
  time: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  area: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  ),
  speed: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  ),
};

/**
 * @param {Object} props
 * @param {string} props.category - دسته تبدیل
 * @param {string} props.fromUnit - واحد مبدا
 * @param {string} props.toUnit - واحد مقصد
 * @param {number|null} props.value - مقدار ورودی
 * @param {number|null} props.result - نتیجه تبدیل
 * @param {Function} props.onFromUnitChange - تابع تغییر واحد مبدا
 * @param {Function} props.onToUnitChange - تابع تغییر واحد مقصد
 * @param {Function} props.onValueChange - تابع تغییر مقدار
 */
export function ConversionCircle({
  category,
  fromUnit,
  toUnit,
  value,
  result,
  onFromUnitChange,
  onToUnitChange,
  onValueChange,
}) {
  const units = getUnitsByCategory(category);
  const colors = categoryColors[category] || categoryColors.length;
  const fromUnitInfo = getUnitInfo(category, fromUnit);
  const toUnitInfo = getUnitInfo(category, toUnit);

  // تغییر خودکار واحد و مقدار (فقط وقتی که کاربر ورودی نداده باشد)
  useEffect(() => {
    if (value && value !== '' && value !== '0') {
      // اگر کاربر ورودی داده، خودکار تغییر نده
      return;
    }

    const interval = setInterval(() => {
      if (units.length > 1) {
        // تغییر واحد مبدا
        const currentFromIndex = units.findIndex((u) => u.key === fromUnit);
        const nextFromIndex = (currentFromIndex + 1) % units.length;
        onFromUnitChange(units[nextFromIndex].key);

        // تغییر واحد مقصد
        const currentToIndex = units.findIndex((u) => u.key === toUnit);
        const nextToIndex = (currentToIndex + 1) % units.length;
        if (nextToIndex !== nextFromIndex) {
          onToUnitChange(units[nextToIndex].key);
        } else {
          onToUnitChange(units[(nextToIndex + 1) % units.length].key);
        }

        // تغییر مقدار
        const randomValue = Math.floor(Math.random() * 100) + 10;
        onValueChange(randomValue.toString());
      }
    }, 2500); // تغییر سریع‌تر

    return () => clearInterval(interval);
  }, [category, fromUnit, toUnit, units, value, onFromUnitChange, onToUnitChange, onValueChange]);

  // فرمت کردن عدد
  const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '';
    if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(4);
    }
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative"
      >
        {/* دایره شیشه‌ای */}
        <div
          className="relative w-80 h-80 rounded-full backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border-2 border-white/30 dark:border-gray-700/30 shadow-2xl flex flex-col items-center justify-center p-8"
          style={{
            background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}20)`,
            boxShadow: `0 20px 60px ${colors.from}40, inset 0 0 60px ${colors.to}20`,
          }}
        >
          {/* Icon دسته */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute top-4 right-4 w-12 h-12 text-white/80"
          >
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {categoryIcons[category] || categoryIcons.length}
            </svg>
          </motion.div>

          {/* مقدار ورودی */}
          <div className="text-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${value}-${fromUnit}`}
                initial={{ scale: 0.5, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                className="text-5xl font-bold text-white drop-shadow-lg"
              >
                {value || '0'}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={fromUnit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-white/90 mt-2"
              >
                {fromUnitInfo?.name || fromUnit}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* فلش تبدیل */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-4xl text-white/90 my-4"
          >
            ↓
          </motion.div>

          {/* نتیجه */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${result}-${toUnit}`}
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                className="text-5xl font-bold text-yellow-300 drop-shadow-lg"
              >
                {result !== null ? formatNumber(result) : '...'}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={toUnit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-white/90 mt-2"
              >
                {toUnitInfo?.name || toUnit}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

