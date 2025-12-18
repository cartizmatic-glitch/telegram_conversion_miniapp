/**
 * توابع تبدیل واحدهای سرعت
 * تمام تبدیل‌ها بر اساس متر بر ثانیه به عنوان واحد پایه انجام می‌شود
 */

// تبدیل به متر بر ثانیه (از واحدهای مختلف)
const toMeterPerSecond = {
  meterPerSecond: (value) => value,
  kilometerPerHour: (value) => value / 3.6,
  milePerHour: (value) => value * 0.44704,
  footPerSecond: (value) => value * 0.3048,
  knot: (value) => value * 0.514444, // nautical mile per hour
  mach: (value) => value * 343, // تقریبی در سطح دریا
};

// تبدیل از متر بر ثانیه به واحدهای مختلف
const fromMeterPerSecond = {
  meterPerSecond: (value) => value,
  kilometerPerHour: (value) => value * 3.6,
  milePerHour: (value) => value / 0.44704,
  footPerSecond: (value) => value / 0.3048,
  knot: (value) => value / 0.514444,
  mach: (value) => value / 343,
};

/**
 * تبدیل سرعت از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertSpeed(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به متر بر ثانیه
  const inMeterPerSecond = toMeterPerSecond[fromUnit]?.(value);
  if (inMeterPerSecond === undefined) {
    throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از متر بر ثانیه به واحد مقصد
  const converted = fromMeterPerSecond[toUnit]?.(inMeterPerSecond);
  if (converted === undefined) {
    throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

