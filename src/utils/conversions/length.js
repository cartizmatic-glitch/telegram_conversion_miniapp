/**
 * توابع تبدیل واحدهای طول
 * تمام تبدیل‌ها بر اساس متر به عنوان واحد پایه انجام می‌شود
 */

// تبدیل به متر (از واحدهای مختلف)
const toMeter = {
  meter: (value) => value,
  kilometer: (value) => value * 1000,
  centimeter: (value) => value / 100,
  millimeter: (value) => value / 1000,
  mile: (value) => value * 1609.344,
  yard: (value) => value * 0.9144,
  foot: (value) => value * 0.3048,
  inch: (value) => value * 0.0254,
  nauticalMile: (value) => value * 1852,
};

// تبدیل از متر به واحدهای مختلف
const fromMeter = {
  meter: (value) => value,
  kilometer: (value) => value / 1000,
  centimeter: (value) => value * 100,
  millimeter: (value) => value * 1000,
  mile: (value) => value / 1609.344,
  yard: (value) => value / 0.9144,
  foot: (value) => value / 0.3048,
  inch: (value) => value / 0.0254,
  nauticalMile: (value) => value / 1852,
};

/**
 * تبدیل طول از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertLength(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به متر
  const inMeters = toMeter[fromUnit]?.(value);
  if (inMeters === undefined) {
    throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از متر به واحد مقصد
  const converted = fromMeter[toUnit]?.(inMeters);
  if (converted === undefined) {
    throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

