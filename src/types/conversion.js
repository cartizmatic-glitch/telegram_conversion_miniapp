/**
 * Type definitions برای سیستم تبدیل واحد
 */

/**
 * دسته‌های تبدیل موجود
 * @typedef {'length' | 'weight' | 'temperature' | 'volume' | 'time' | 'area' | 'speed'} ConversionCategory
 */

/**
 * واحدهای طول
 * @typedef {'meter' | 'kilometer' | 'centimeter' | 'millimeter' | 'mile' | 'yard' | 'foot' | 'inch' | 'nauticalMile'} LengthUnit
 */

/**
 * واحدهای وزن
 * @typedef {'kilogram' | 'gram' | 'milligram' | 'ton' | 'metricTon' | 'pound' | 'ounce' | 'stone'} WeightUnit
 */

/**
 * واحدهای دما
 * @typedef {'celsius' | 'fahrenheit' | 'kelvin'} TemperatureUnit
 */

/**
 * واحدهای حجم
 * @typedef {'liter' | 'milliliter' | 'cubicMeter' | 'cubicCentimeter' | 'gallon' | 'quart' | 'pint' | 'cup' | 'fluidOunce' | 'tablespoon' | 'teaspoon'} VolumeUnit
 */

/**
 * واحدهای زمان
 * @typedef {'second' | 'millisecond' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' | 'decade' | 'century'} TimeUnit
 */

/**
 * واحدهای مساحت
 * @typedef {'squareMeter' | 'squareKilometer' | 'squareCentimeter' | 'squareMillimeter' | 'squareMile' | 'squareYard' | 'squareFoot' | 'squareInch' | 'hectare' | 'acre'} AreaUnit
 */

/**
 * واحدهای سرعت
 * @typedef {'meterPerSecond' | 'kilometerPerHour' | 'milePerHour' | 'footPerSecond' | 'knot' | 'mach'} SpeedUnit
 */

/**
 * اطلاعات یک واحد
 * @typedef {Object} UnitInfo
 * @property {string} key - کلید واحد (برای استفاده در کد)
 * @property {string} name - نام فارسی واحد
 * @property {string} symbol - نماد واحد (اختیاری)
 */

/**
 * اطلاعات یک دسته تبدیل
 * @typedef {Object} CategoryInfo
 * @property {string} key - کلید دسته
 * @property {string} name - نام فارسی دسته
 * @property {string} icon - آیکون دسته (اختیاری)
 * @property {UnitInfo[]} units - لیست واحدهای این دسته
 */

