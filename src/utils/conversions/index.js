/**
 * فایل مرکزی برای export تمام توابع تبدیل
 */

import { convertLength } from './length.js';
import { convertWeight } from './weight.js';
import { convertTemperature } from './temperature.js';
import { convertVolume } from './volume.js';
import { convertTime } from './time.js';
import { convertArea } from './area.js';
import { convertSpeed } from './speed.js';

/**
 * تبدیل واحد بر اساس دسته
 * @param {string} category - دسته تبدیل (length, weight, temperature, ...)
 * @param {number} value - مقدار عددی
 * @param {string} fromUnit - واحد مبدا
 * @param {string} toUnit - واحد مقصد
 * @returns {number} مقدار تبدیل شده
 */
export function convert(category, value, fromUnit, toUnit) {
  const converters = {
    length: convertLength,
    weight: convertWeight,
    temperature: convertTemperature,
    volume: convertVolume,
    time: convertTime,
    area: convertArea,
    speed: convertSpeed,
  };

  const converter = converters[category];
  if (!converter) {
    throw new Error(`دسته تبدیل نامعتبر: ${category}`);
  }

  return converter(value, fromUnit, toUnit);
}

// Export توابع جداگانه نیز
export {
  convertLength,
  convertWeight,
  convertTemperature,
  convertVolume,
  convertTime,
  convertArea,
  convertSpeed,
};

