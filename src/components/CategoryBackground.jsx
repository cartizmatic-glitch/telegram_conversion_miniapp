/**
 * کامپوننت CategoryBackground - پس‌زمینه gradient متحرک بر اساس دسته
 */

import { motion } from 'framer-motion';
import { categoryGradients } from '../constants/colors.js';

/**
 * @param {Object} props
 * @param {string} props.category - دسته تبدیل
 */
export function CategoryBackground({ category }) {
  const gradients = categoryGradients[category] || categoryGradients.length;

  return (
    <motion.div
      key={category}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 -z-10"
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: gradients,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
      {/* Overlay برای خوانایی بهتر */}
      <div className="absolute inset-0 bg-black/5 dark:bg-black/10" />
    </motion.div>
  );
}
