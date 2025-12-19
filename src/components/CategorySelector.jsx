/**
 * کامپوننت CategorySelector - انتخاب دسته تبدیل (طول، وزن، دما، ...)
 */

import { motion } from 'framer-motion';
import { categories } from '../constants/units.js';
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
 * @param {string} props.selectedCategory - دسته انتخاب شده
 * @param {Function} props.onCategoryChange - تابع تغییر دسته
 */
export function CategorySelector({ selectedCategory, onCategoryChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full px-4 py-3"
    >
      <div className="grid grid-cols-3 gap-2.5">
        {categories.map((category, index) => {
          const colors = categoryColors[category.key] || categoryColors.length;
          const isSelected = selectedCategory === category.key;
          
          // تعیین موقعیت برای سرعت: ردیف سوم ستون وسط
          const isSpeed = category.key === 'speed';
          const gridPosition = isSpeed ? 'col-start-2' : '';
          
          return (
            <motion.button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-3 py-3 rounded-2xl font-medium text-xs transition-all duration-200
                backdrop-blur-xl border-2 overflow-hidden ${gridPosition}
                ${
                  isSelected
                    ? 'text-white shadow-xl border-white/40'
                    : 'bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-700/40 border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl'
                }
              `}
              style={
                isSelected
                  ? {
                      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      boxShadow: `0 4px 20px ${colors.from}50`,
                    }
                  : {}
              }
              aria-pressed={isSelected}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: isSelected ? [0, 360] : 0,
                  scale: isSelected ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  rotate: { duration: 2, repeat: isSelected ? Infinity : 0, ease: 'linear' },
                  scale: { duration: 1.5, repeat: isSelected ? Infinity : 0, ease: 'easeInOut' },
                }}
                className="w-5 h-5 mx-auto mb-1"
              >
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {categoryIcons[category.key] || categoryIcons.length}
                </svg>
              </motion.div>
              <div>{category.name}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
