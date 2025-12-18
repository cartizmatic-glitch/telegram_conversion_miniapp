/**
 * کامپوننت Header - نمایش عنوان و هدر اپلیکیشن
 */

import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-5 px-4 backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 border-b-2 border-white/30 dark:border-gray-700/30 text-white shadow-lg relative overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 -z-10"></div>
      {/* Pattern overlay برای زیبایی بیشتر */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="max-w-md mx-auto relative z-10">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-center drop-shadow-md"
        >
          تبدیل واحد
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-sm sm:text-base text-center mt-2 opacity-95 font-medium"
        >
          تبدیل سریع و آسان واحدهای مختلف
        </motion.p>
      </div>
    </motion.header>
  );
}

