/**
 * توابع تبدیل واحدهای مساحت
 * تمام تبدیل‌ها بر اساس متر مربع به عنوان واحد پایه انجام می‌شود
 */

// تبدیل به متر مربع (از واحدهای مختلف)
const toSquareMeter = {
  squareMeter: (value) => value,
  squareKilometer: (value) => value * 1000000,
  squareCentimeter: (value) => value / 10000,
  squareMillimeter: (value) => value / 1000000,
  squareMile: (value) => value * 2589988.11,
  squareYard: (value) => value * 0.836127,
  squareFoot: (value) => value * 0.092903,
  squareInch: (value) => value * 0.00064516,
  hectare: (value) => value * 10000,
  acre: (value) => value * 4046.86,
};

// تبدیل از متر مربع به واحدهای مختلف
const fromSquareMeter = {
  squareMeter: (value) => value,
  squareKilometer: (value) => value / 1000000,
  squareCentimeter: (value) => value * 10000,
  squareMillimeter: (value) => value * 1000000,
  squareMile: (value) => value / 2589988.11,
  squareYard: (value) => value / 0.836127,
  squareFoot: (value) => value / 0.092903,
  squareInch: (value) => value / 0.00064516,
  hectare: (value) => value / 10000,
  acre: (value) => value / 4046.86,
};

/**
 * تبدیل مساحت از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertArea(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به متر مربع
  const inSquareMeters = toSquareMeter[fromUnit]?.(value);
  if (inSquareMeters === undefined) {
    throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از متر مربع به واحد مقصد
  const converted = fromSquareMeter[toUnit]?.(inSquareMeters);
  if (converted === undefined) {
    throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

