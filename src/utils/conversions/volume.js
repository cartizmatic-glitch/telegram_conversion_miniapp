/**
 * توابع تبدیل واحدهای حجم
 * تمام تبدیل‌ها بر اساس لیتر به عنوان واحد پایه انجام می‌شود
 */

// تبدیل به لیتر (از واحدهای مختلف)
const toLiter = {
  liter: (value) => value,
  milliliter: (value) => value / 1000,
  cubicMeter: (value) => value * 1000,
  cubicCentimeter: (value) => value / 1000,
  gallon: (value) => value * 3.78541, // US gallon
  quart: (value) => value * 0.946353,
  pint: (value) => value * 0.473176,
  cup: (value) => value * 0.236588,
  fluidOunce: (value) => value * 0.0295735,
  tablespoon: (value) => value * 0.0147868,
  teaspoon: (value) => value * 0.00492892,
};

// تبدیل از لیتر به واحدهای مختلف
const fromLiter = {
  liter: (value) => value,
  milliliter: (value) => value * 1000,
  cubicMeter: (value) => value / 1000,
  cubicCentimeter: (value) => value * 1000,
  gallon: (value) => value / 3.78541,
  quart: (value) => value / 0.946353,
  pint: (value) => value / 0.473176,
  cup: (value) => value / 0.236588,
  fluidOunce: (value) => value / 0.0295735,
  tablespoon: (value) => value / 0.0147868,
  teaspoon: (value) => value / 0.00492892,
};

/**
 * تبدیل حجم از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertVolume(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به لیتر
  const inLiters = toLiter[fromUnit]?.(value);
  if (inLiters === undefined) {
    throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از لیتر به واحد مقصد
  const converted = fromLiter[toUnit]?.(inLiters);
  if (converted === undefined) {
    throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

