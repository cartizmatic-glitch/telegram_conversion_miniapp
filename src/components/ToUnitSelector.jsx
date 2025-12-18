/**
 * کامپوننت ToUnitSelector - انتخاب واحد مقصد
 */

import { motion } from 'framer-motion';
import { getUnitsByCategory } from '../constants/units.js';
import { categoryColors } from '../constants/colors.js';

/**
 * @param {Object} props
 * @param {string} props.category - دسته تبدیل فعلی
 * @param {string} props.toUnit - واحد مقصد
 * @param {Function} props.onToUnitChange - تابع تغییر واحد مقصد
 */
export function ToUnitSelector({
  category,
  toUnit,
  onToUnitChange,
}) {
  const units = getUnitsByCategory(category);
  const colors = categoryColors[category] || categoryColors.length;

  return (
    <motion.div
      key={category}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full px-4 py-3"
    >
      <motion.select
        value={toUnit}
        onChange={(e) => onToUnitChange(e.target.value)}
        whileFocus={{ scale: 1.01 }}
        className="w-full px-4 py-3 rounded-2xl border-2 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer appearance-none"
        style={{
          borderColor: `${colors.to}40`,
          boxShadow: `0 4px 20px ${colors.to}20`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
          paddingLeft: '2.5rem',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = `${colors.to}80`;
          e.target.style.boxShadow = `0 4px 25px ${colors.to}40`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = `${colors.to}40`;
          e.target.style.boxShadow = `0 4px 20px ${colors.to}20`;
        }}
      >
        {units.map((unit) => (
          <option 
            key={unit.key} 
            value={unit.key}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.85)`,
              backdropFilter: 'blur(10px)',
              color: '#1f2937',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            {unit.name} ({unit.symbol})
          </option>
        ))}
      </motion.select>
    </motion.div>
  );
}

