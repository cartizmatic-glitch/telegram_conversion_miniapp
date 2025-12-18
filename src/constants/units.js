/**
 * داده‌های واحدها با نام‌های فارسی
 * این فایل شامل تمام واحدهای تبدیل با نام‌های فارسی و اطلاعات مرتبط است
 */

/**
 * واحدهای طول با نام‌های فارسی
 */
export const lengthUnits = [
  { key: 'meter', name: 'متر', symbol: 'm' },
  { key: 'kilometer', name: 'کیلومتر', symbol: 'km' },
  { key: 'centimeter', name: 'سانتی‌متر', symbol: 'cm' },
  { key: 'millimeter', name: 'میلی‌متر', symbol: 'mm' },
  { key: 'mile', name: 'مایل', symbol: 'mi' },
  { key: 'yard', name: 'یارد', symbol: 'yd' },
  { key: 'foot', name: 'فوت', symbol: 'ft' },
  { key: 'inch', name: 'اینچ', symbol: 'in' },
  { key: 'nauticalMile', name: 'مایل دریایی', symbol: 'nmi' },
];

/**
 * واحدهای وزن با نام‌های فارسی
 */
export const weightUnits = [
  { key: 'kilogram', name: 'کیلوگرم', symbol: 'kg' },
  { key: 'gram', name: 'گرم', symbol: 'g' },
  { key: 'milligram', name: 'میلی‌گرم', symbol: 'mg' },
  { key: 'ton', name: 'تن', symbol: 't' },
  { key: 'metricTon', name: 'تن متریک', symbol: 't' },
  { key: 'pound', name: 'پوند', symbol: 'lb' },
  { key: 'ounce', name: 'اونس', symbol: 'oz' },
  { key: 'stone', name: 'استون', symbol: 'st' },
];

/**
 * واحدهای دما با نام‌های فارسی
 */
export const temperatureUnits = [
  { key: 'celsius', name: 'سلسیوس', symbol: '°C' },
  { key: 'fahrenheit', name: 'فارنهایت', symbol: '°F' },
  { key: 'kelvin', name: 'کلوین', symbol: 'K' },
];

/**
 * واحدهای حجم با نام‌های فارسی
 */
export const volumeUnits = [
  { key: 'liter', name: 'لیتر', symbol: 'L' },
  { key: 'milliliter', name: 'میلی‌لیتر', symbol: 'mL' },
  { key: 'cubicMeter', name: 'متر مکعب', symbol: 'm³' },
  { key: 'cubicCentimeter', name: 'سانتی‌متر مکعب', symbol: 'cm³' },
  { key: 'gallon', name: 'گالن', symbol: 'gal' },
  { key: 'quart', name: 'کوارت', symbol: 'qt' },
  { key: 'pint', name: 'پینت', symbol: 'pt' },
  { key: 'cup', name: 'فنجان', symbol: 'cup' },
  { key: 'fluidOunce', name: 'اونس مایع', symbol: 'fl oz' },
  { key: 'tablespoon', name: 'قاشق غذاخوری', symbol: 'tbsp' },
  { key: 'teaspoon', name: 'قاشق چای‌خوری', symbol: 'tsp' },
];

/**
 * واحدهای زمان با نام‌های فارسی
 */
export const timeUnits = [
  { key: 'second', name: 'ثانیه', symbol: 's' },
  { key: 'millisecond', name: 'میلی‌ثانیه', symbol: 'ms' },
  { key: 'minute', name: 'دقیقه', symbol: 'min' },
  { key: 'hour', name: 'ساعت', symbol: 'h' },
  { key: 'day', name: 'روز', symbol: 'd' },
  { key: 'week', name: 'هفته', symbol: 'wk' },
  { key: 'month', name: 'ماه', symbol: 'mo' },
  { key: 'year', name: 'سال', symbol: 'yr' },
  { key: 'decade', name: 'دهه', symbol: 'decade' },
  { key: 'century', name: 'قرن', symbol: 'century' },
];

/**
 * واحدهای مساحت با نام‌های فارسی
 */
export const areaUnits = [
  { key: 'squareMeter', name: 'متر مربع', symbol: 'm²' },
  { key: 'squareKilometer', name: 'کیلومتر مربع', symbol: 'km²' },
  { key: 'squareCentimeter', name: 'سانتی‌متر مربع', symbol: 'cm²' },
  { key: 'squareMillimeter', name: 'میلی‌متر مربع', symbol: 'mm²' },
  { key: 'squareMile', name: 'مایل مربع', symbol: 'mi²' },
  { key: 'squareYard', name: 'یارد مربع', symbol: 'yd²' },
  { key: 'squareFoot', name: 'فوت مربع', symbol: 'ft²' },
  { key: 'squareInch', name: 'اینچ مربع', symbol: 'in²' },
  { key: 'hectare', name: 'هکتار', symbol: 'ha' },
  { key: 'acre', name: 'جریب', symbol: 'ac' },
];

/**
 * واحدهای سرعت با نام‌های فارسی
 */
export const speedUnits = [
  { key: 'meterPerSecond', name: 'متر بر ثانیه', symbol: 'm/s' },
  { key: 'kilometerPerHour', name: 'کیلومتر بر ساعت', symbol: 'km/h' },
  { key: 'milePerHour', name: 'مایل بر ساعت', symbol: 'mph' },
  { key: 'footPerSecond', name: 'فوت بر ثانیه', symbol: 'ft/s' },
  { key: 'knot', name: 'گره', symbol: 'kn' },
  { key: 'mach', name: 'ماخ', symbol: 'Ma' },
];

/**
 * دسته‌های تبدیل با نام‌های فارسی
 */
export const categories = [
  {
    key: 'length',
    name: 'طول',
    units: lengthUnits,
  },
  {
    key: 'weight',
    name: 'وزن',
    units: weightUnits,
  },
  {
    key: 'temperature',
    name: 'دما',
    units: temperatureUnits,
  },
  {
    key: 'volume',
    name: 'حجم',
    units: volumeUnits,
  },
  {
    key: 'time',
    name: 'زمان',
    units: timeUnits,
  },
  {
    key: 'area',
    name: 'مساحت',
    units: areaUnits,
  },
  {
    key: 'speed',
    name: 'سرعت',
    units: speedUnits,
  },
];

/**
 * دریافت واحدها بر اساس دسته
 * @param {string} categoryKey - کلید دسته
 * @returns {Array} آرایه واحدهای دسته
 */
export function getUnitsByCategory(categoryKey) {
  const category = categories.find((cat) => cat.key === categoryKey);
  return category ? category.units : [];
}

/**
 * دریافت اطلاعات یک واحد
 * @param {string} categoryKey - کلید دسته
 * @param {string} unitKey - کلید واحد
 * @returns {Object|null} اطلاعات واحد یا null
 */
export function getUnitInfo(categoryKey, unitKey) {
  const units = getUnitsByCategory(categoryKey);
  return units.find((unit) => unit.key === unitKey) || null;
}

/**
 * دریافت نام فارسی یک واحد
 * @param {string} categoryKey - کلید دسته
 * @param {string} unitKey - کلید واحد
 * @returns {string} نام فارسی واحد
 */
export function getUnitName(categoryKey, unitKey) {
  const unit = getUnitInfo(categoryKey, unitKey);
  return unit ? unit.name : unitKey;
}

