/**
 * توابع اعتبارسنجی ورودی‌ها
 * این فایل شامل توابع برای اعتبارسنجی و sanitization ورودی‌های کاربر است
 */

/**
 * بررسی معتبر بودن یک عدد
 * @param {string|number} value - مقدار ورودی
 * @returns {boolean} آیا عدد معتبر است یا نه
 */
export function isValidNumber(value) {
  if (value === '' || value === null || value === undefined) {
    return false;
  }
  
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
}

/**
 * تبدیل رشته به عدد با اعتبارسنجی
 * @param {string} value - رشته ورودی
 * @returns {number|null} عدد تبدیل شده یا null در صورت نامعتبر بودن
 */
export function parseNumber(value) {
  if (!value || value === '') {
    return null;
  }
  
  const num = parseFloat(value);
  if (isNaN(num) || !isFinite(num)) {
    return null;
  }
  
  return num;
}

/**
 * محدود کردن دقت اعشار
 * @param {number} value - عدد ورودی
 * @param {number} maxDecimals - حداکثر تعداد اعشار (پیش‌فرض: 10)
 * @returns {number} عدد با دقت محدود شده
 */
export function limitDecimals(value, maxDecimals = 10) {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return value;
  }
  
  const factor = Math.pow(10, maxDecimals);
  return Math.round(value * factor) / factor;
}

/**
 * بررسی اینکه آیا عدد برای تبدیل دما معتبر است یا نه
 * (دما می‌تواند منفی باشد)
 * @param {string|number} value - مقدار ورودی
 * @returns {boolean} آیا معتبر است یا نه
 */
export function isValidTemperature(value) {
  return isValidNumber(value);
}

/**
 * بررسی اینکه آیا عدد برای تبدیل واحدهای دیگر معتبر است یا نه
 * (برای واحدهای غیر دما، اعداد منفی ممکن است معنی نداشته باشند)
 * @param {string|number} value - مقدار ورودی
 * @param {string} category - دسته تبدیل
 * @returns {boolean} آیا معتبر است یا نه
 */
export function isValidValue(value, category) {
  if (!isValidNumber(value)) {
    return false;
  }
  
  const num = parseFloat(value);
  
  // برای دما، اعداد منفی مجاز هستند
  if (category === 'temperature') {
    return isValidTemperature(value);
  }
  
  // برای سایر واحدها، اعداد منفی معمولاً معنی ندارند
  // اما برای انعطاف بیشتر، اجازه می‌دهیم
  return true;
}

/**
 * Sanitize ورودی رشته‌ای - حذف کاراکترهای خطرناک
 * این تابع برای جلوگیری از XSS و injection attacks استفاده می‌شود
 * @param {string} input - رشته ورودی
 * @returns {string} رشته sanitize شده
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // حذف کاراکترهای خطرناک (XSS prevention)
  // فقط اجازه اعداد، نقطه اعشار، علامت منفی و فاصله
  let sanitized = input.replace(/[^0-9.\-\s]/g, '');
  
  // حذف script tags و HTML entities (اضافی برای اطمینان)
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
  
  return sanitized;
}

/**
 * فرمت کردن عدد برای نمایش
 * @param {number} value - عدد ورودی
 * @param {number} maxDecimals - حداکثر تعداد اعشار
 * @returns {string} عدد فرمت شده
 */
export function formatNumber(value, maxDecimals = 10) {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }
  
  // برای اعداد خیلی بزرگ یا خیلی کوچک از نماد علمی استفاده می‌کنیم
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6);
  }
  
  // محدود کردن دقت اعشار
  const limited = limitDecimals(value, maxDecimals);
  
  // فرمت کردن با جداکننده هزارگان
  const parts = limited.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
}

/**
 * بررسی محدودیت‌های عددی
 * @param {number} value - عدد ورودی
 * @param {Object} options - گزینه‌های محدودیت
 * @param {number} options.min - حداقل مقدار (اختیاری)
 * @param {number} options.max - حداکثر مقدار (اختیاری)
 * @returns {Object} نتیجه بررسی با پیام خطا (در صورت وجود)
 */
export function validateNumberLimits(value, options = {}) {
  const { min, max } = options;
  
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return { valid: false, error: 'عدد معتبر نیست' };
  }
  
  if (min !== undefined && value < min) {
    return { valid: false, error: `عدد باید بزرگتر یا مساوی ${min} باشد` };
  }
  
  if (max !== undefined && value > max) {
    return { valid: false, error: `عدد باید کوچکتر یا مساوی ${max} باشد` };
  }
  
  return { valid: true, error: null };
}

