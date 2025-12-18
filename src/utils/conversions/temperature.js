/**
 * توابع تبدیل واحدهای دما
 * دما نیاز به تبدیل‌های خاص دارد (نه فقط ضرب و تقسیم)
 */

/**
 * تبدیل دما از یک واحد به واحد دیگر
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  // تبدیل به کلوین (واحد پایه)
  let kelvin;
  
  switch (fromUnit) {
    case 'celsius':
      kelvin = value + 273.15;
      break;
    case 'fahrenheit':
      kelvin = (value - 32) * (5 / 9) + 273.15;
      break;
    case 'kelvin':
      kelvin = value;
      break;
    default:
      throw new Error(`واحد مبدا نامعتبر: ${fromUnit}`);
  }
  
  // تبدیل از کلوین به واحد مقصد
  let converted;
  
  switch (toUnit) {
    case 'celsius':
      converted = kelvin - 273.15;
      break;
    case 'fahrenheit':
      converted = (kelvin - 273.15) * (9 / 5) + 32;
      break;
    case 'kelvin':
      converted = kelvin;
      break;
    default:
      throw new Error(`واحد مقصد نامعتبر: ${toUnit}`);
  }
  
  return converted;
}

