/**
 * کامپوننت UnitSelector - انتخاب واحد مبدا و مقصد
 */

import { motion, AnimatePresence } from 'framer-motion';
import { getUnitsByCategory } from '../constants/units.js';

/**
 * @param {Object} props
 * @param {string} props.category - دسته تبدیل فعلی
 * @param {string} props.fromUnit - واحد مبدا
 * @param {string} props.toUnit - واحد مقصد
 * @param {Function} props.onFromUnitChange - تابع تغییر واحد مبدا
 * @param {Function} props.onToUnitChange - تابع تغییر واحد مقصد
 */
export function UnitSelector({
  category,
  fromUnit,
  toUnit,
  onFromUnitChange,
  onToUnitChange,
}) {
  const units = getUnitsByCategory(category);

  return (
    <motion.div
      key={category}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full px-4 py-3 space-y-4"
    >
      {/* واحد مبدا */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          از:
        </label>
        <motion.select
          value={fromUnit}
          onChange={(e) => onFromUnitChange(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          {units.map((unit) => (
            <option key={unit.key} value={unit.key}>
              {unit.name} ({unit.symbol})
            </option>
          ))}
        </motion.select>
      </motion.div>

      {/* دکمه جابجایی */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => {
            const temp = fromUnit;
            onFromUnitChange(toUnit);
            onToUnitChange(temp);
          }}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          aria-label="جابجایی واحدها"
        >
          ⇅ جابجایی
        </motion.button>
      </div>

      {/* واحد مقصد */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          به:
        </label>
        <motion.select
          value={toUnit}
          onChange={(e) => onToUnitChange(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          {units.map((unit) => (
            <option key={unit.key} value={unit.key}>
              {unit.name} ({unit.symbol})
            </option>
          ))}
        </motion.select>
      </motion.div>
    </motion.div>
  );
}

