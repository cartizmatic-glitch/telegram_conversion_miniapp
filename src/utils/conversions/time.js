/**
 * توابع تبدیل واحدهای زمان
 * تمام تبدیل‌ها بر اساس ثانیه به عنوان واحد پایه انجام می‌شود
 */

// تبدیل به ثانیه (از واحدهای مختلف)
const toSecond = {
  second: (value) => value,
  millisecond: (value) => value / 1000,
  minute: (value) => value * 60,
  hour: (value) => value * 3600,
  day: (value) => value * 86400,
  week: (value) => value * 604800,
  month: (value) => value * 2592000, // 30 روز
  year: (value) => value * 31536000, // 365 روز
  decade: (value) => value * 315360000,
  century: (value) => value * 3153600000,
};

// تبدیل از ثانیه به واحدهای مختلف
const fromSecond = {
  second: (value) => value,
  millisecond: (value) => value * 1000,
  minute: (value) => value / 60,
  hour: (value) => value / 3600,
  day: (value) => value / 86400,
  week: (value) => value / 604800,
  month: (value) => value / 2592000,
  year: (value) => value / 31536000,
  decade: (value) => value / 315360000,
  century: (value) => value / 3153600000,
};

/**
 * تبدیل زمان از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertTime(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به ثانیه
  const inSeconds = toSecond[fromUnit]?.(value);
  if (inSeconds === undefined) {
    throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از ثانیه به واحد مقصد
  const converted = fromSecond[toUnit]?.(inSeconds);
  if (converted === undefined) {
    throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

