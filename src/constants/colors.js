/**
 * رنگ‌های منحصر به فرد برای هر دسته تبدیل
 * این فایل شامل رنگ‌های یکتا برای هر دسته است
 */

// رنگ‌های مختلف برای هر دسته (بدون تکرار)
export const categoryColors = {
  length: { from: '#3b82f6', to: '#8b5cf6' },      // آبی به بنفش
  weight: { from: '#10b981', to: '#059669' },      // سبز
  temperature: { from: '#f59e0b', to: '#ef4444' }, // نارنجی به قرمز
  volume: { from: '#6366f1', to: '#a855f7' },     // بنفش تیره به بنفش روشن
  time: { from: '#ec4899', to: '#f43f5e' },        // صورتی به قرمز
  area: { from: '#14b8a6', to: '#0d9488' },       // فیروزه‌ای
  speed: { from: '#f97316', to: '#eab308' },       // نارنجی به زرد
};

// Gradient های مختلف برای پس‌زمینه (بدون تکرار)
export const categoryGradients = {
  length: [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  ],
  weight: [
    'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  ],
  temperature: [
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
  ],
  volume: [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
  ],
  time: [
    'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
  ],
  area: [
    'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
  ],
  speed: [
    'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
    'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
  ],
};

