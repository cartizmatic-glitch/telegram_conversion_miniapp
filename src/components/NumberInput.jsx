/**
 * کامپوننت NumberInput - ورودی عددی برای مقدار تبدیل
 */

import { motion } from 'framer-motion';

/**
 * @param {Object} props
 * @param {string|number} props.value - مقدار فعلی
 * @param {Function} props.onChange - تابع تغییر مقدار
 * @param {string} props.placeholder - متن placeholder
 * @param {string} props.label - برچسب ورودی
 */
export function NumberInput({ value, onChange, placeholder = 'عدد را وارد کنید', label }) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // اجازه دادن به اعداد، اعشار و علامت منفی
    // همچنین اجازه فاصله برای خوانایی بیشتر (که بعداً حذف می‌شود)
    if (inputValue === '' || /^-?\d*\.?\d*$/.test(inputValue.replace(/\s/g, ''))) {
      // حذف فاصله‌ها قبل از ارسال
      onChange(inputValue.replace(/\s/g, ''));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full px-4 py-3"
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <motion.input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        whileFocus={{ scale: 1.01 }}
        className="w-full px-4 py-4 text-2xl sm:text-3xl text-center rounded-2xl border-2 border-white/30 dark:border-gray-700/30 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-100 focus:border-white/50 focus:outline-none transition-all duration-200 font-bold shadow-lg hover:shadow-xl focus:shadow-2xl placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:opacity-70"
      />
    </motion.div>
  );
}

