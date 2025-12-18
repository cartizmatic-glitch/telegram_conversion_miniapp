/**
 * کامپوننت SwapButton - دکمه جابجایی واحدها
 */

import { motion } from 'framer-motion';

/**
 * @param {Object} props
 * @param {Function} props.onSwap - تابع جابجایی واحدها
 */
export function SwapButton({ onSwap }) {
  return (
    <div className="flex justify-center px-4 py-2">
      <motion.button
        onClick={onSwap}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="px-5 py-2.5 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border-2 border-white/30 dark:border-gray-700/30 text-white rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        aria-label="جابجایی واحدها"
      >
        ⇅ جابجایی
      </motion.button>
    </div>
  );
}

