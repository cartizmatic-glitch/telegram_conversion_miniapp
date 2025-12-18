/**
 * توابع تبدیل واحدهای وزن
 * تمام تبدیل‌ها بر اساس کیلوگرم به عنوان واحد پایه انجام می‌شود
 */

// تبدیل به کیلوگرم (از واحدهای مختلف)
const toKilogram = {
  kilogram: (value) => value,
  gram: (value) => value / 1000,
  milligram: (value) => value / 1000000,
  ton: (value) => value * 1000,
  metricTon: (value) => value * 1000,
  pound: (value) => value * 0.453592,
  ounce: (value) => value * 0.0283495,
  stone: (value) => value * 6.35029,
};

// تبدیل از کیلوگرم به واحدهای مختلف
const fromKilogram = {
  kilogram: (value) => value,
  gram: (value) => value * 1000,
  milligram: (value) => value * 1000000,
  ton: (value) => value / 1000,
  metricTon: (value) => value / 1000,
  pound: (value) => value / 0.453592,
  ounce: (value) => value / 0.0283495,
  stone: (value) => value / 6.35029,
};

/**
 * تبدیل وزن از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertWeight(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به کیلوگرم
  const inKilograms = toKilogram[fromUnit]?.(value);
  if (inKilograms === undefined) {
    throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از کیلوگرم به واحد مقصد
  const converted = fromKilogram[toUnit]?.(inKilograms);
  if (converted === undefined) {
    throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

