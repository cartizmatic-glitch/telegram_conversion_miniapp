/**
 * کامپوننت اصلی اپلیکیشن
 * این کامپوننت تمام کامپوننت‌ها را به هم متصل می‌کند و منطق تبدیل را مدیریت می‌کند
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from './hooks/useTelegram.js';
import { convert } from './utils/conversions/index.js';
import { getUnitsByCategory } from './constants/units.js';
import { parseNumber, isValidValue, limitDecimals, sanitizeInput } from './utils/validation.js';
import { Welcome } from './components/Welcome.jsx';
import { Header } from './components/Header.jsx';
import { CategorySelector } from './components/CategorySelector.jsx';
import { CategoryBackground } from './components/CategoryBackground.jsx';
import { FromUnitSelector } from './components/FromUnitSelector.jsx';
import { ToUnitSelector } from './components/ToUnitSelector.jsx';
import { SwapButton } from './components/SwapButton.jsx';
import { NumberInput } from './components/NumberInput.jsx';
import { ResultDisplay } from './components/ResultDisplay.jsx';
import { CopyButton } from './components/CopyButton.jsx';

function App() {
  // استفاده از Telegram hook
  const { theme, hapticFeedback } = useTelegram();

  // State برای نمایش صفحه Welcome
  const [showWelcome, setShowWelcome] = useState(true);

  // State management
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // تنظیم واحدهای پیش‌فرض هنگام تغییر دسته
  useEffect(() => {
    const units = getUnitsByCategory(category);
    if (units.length > 0) {
      setFromUnit(units[0].key);
      setToUnit(units.length > 1 ? units[1].key : units[0].key);
    }
    // پاک کردن نتیجه و خطا هنگام تغییر دسته
    setResult(null);
    setError(null);
    setInputValue('');
  }, [category]);

  // محاسبه نتیجه تبدیل
  useEffect(() => {
    // پاک کردن خطا و نتیجه قبلی
    setError(null);
    setResult(null);
    setIsLoading(false);

    // بررسی اینکه آیا ورودی خالی است
    if (!inputValue || inputValue === '' || inputValue === '-') {
      return;
    }

    // Sanitize ورودی
    const sanitizedValue = sanitizeInput(inputValue);
    if (sanitizedValue !== inputValue) {
      // اگر ورودی تغییر کرد، آن را به‌روزرسانی می‌کنیم
      setInputValue(sanitizedValue);
      return;
    }

    // تبدیل به عدد
    const numValue = parseNumber(inputValue);
    
    // بررسی معتبر بودن عدد
    if (numValue === null) {
      setError('لطفاً یک عدد معتبر وارد کنید');
      return;
    }

    // بررسی معتبر بودن مقدار برای دسته تبدیل
    if (!isValidValue(inputValue, category)) {
      setError('عدد وارد شده برای این نوع تبدیل معتبر نیست');
      return;
    }

    // بررسی اینکه واحدها انتخاب شده‌اند
    if (!fromUnit || !toUnit) {
      return;
    }

    // محاسبه تبدیل
    try {
      setIsLoading(true);
      const convertedValue = convert(category, numValue, fromUnit, toUnit);
      
      // بررسی اینکه نتیجه معتبر است
      if (!isFinite(convertedValue) || isNaN(convertedValue)) {
        setError('نتیجه تبدیل نامعتبر است');
        setResult(null);
        return;
      }
      
      // محدود کردن دقت اعشار (حداکثر 10 رقم اعشار)
      const roundedValue = limitDecimals(convertedValue, 10);
      
      setResult(roundedValue);
      setError(null);
    } catch (err) {
      // نمایش پیام خطای فارسی
      const errorMessage = err.message || 'خطا در تبدیل واحد';
      setError(errorMessage.includes('نامعتبر') ? errorMessage : 'خطا در تبدیل واحد. لطفاً دوباره تلاش کنید.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, category, fromUnit, toUnit]);

  // مدیریت تغییر دسته (با useCallback برای بهینه‌سازی)
  const handleCategoryChange = useCallback((newCategory) => {
    hapticFeedback('selection');
    setCategory(newCategory);
  }, [hapticFeedback]);

  // مدیریت تغییر واحد مبدا (با useCallback برای بهینه‌سازی)
  const handleFromUnitChange = useCallback((newUnit) => {
    setFromUnit(newUnit);
  }, []);

  // مدیریت تغییر واحد مقصد (با useCallback برای بهینه‌سازی)
  const handleToUnitChange = useCallback((newUnit) => {
    setToUnit(newUnit);
  }, []);

  // مدیریت تغییر ورودی با sanitization (با useCallback برای بهینه‌سازی)
  const handleInputChange = useCallback((newValue) => {
    // Sanitize ورودی قبل از تنظیم state
    const sanitized = sanitizeInput(newValue);
    setInputValue(sanitized);
  }, []);

  // تابع جابجایی واحدها
  const handleSwap = useCallback(() => {
    hapticFeedback('impact', 'medium');
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  }, [fromUnit, toUnit, hapticFeedback]);

  // تابع شروع (برای رفتن از صفحه Welcome به صفحه اصلی)
  const handleStart = useCallback(() => {
    setShowWelcome(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <Welcome key="welcome" onStart={handleStart} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="min-h-screen relative overflow-hidden"
          >
            {/* پس‌زمینه gradient متحرک بر اساس دسته */}
            <CategoryBackground category={category} />
            
            <Header />
            
            <main className="max-w-md mx-auto pb-8 relative z-10">
              <CategorySelector
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
              />

              {/* مقدار */}
              <NumberInput
                value={inputValue}
                onChange={handleInputChange}
                placeholder="عدد را وارد کنید"
              />

              {/* از */}
              <AnimatePresence mode="wait">
                <FromUnitSelector
                  key={category}
                  category={category}
                  fromUnit={fromUnit}
                  onFromUnitChange={handleFromUnitChange}
                />
              </AnimatePresence>

              {/* دکمه جابجایی */}
              <SwapButton onSwap={handleSwap} />

              {/* به */}
              <AnimatePresence mode="wait">
                <ToUnitSelector
                  key={category}
                  category={category}
                  toUnit={toUnit}
                  onToUnitChange={handleToUnitChange}
                />
              </AnimatePresence>

              {/* نتیجه */}
              <div className="mt-2">
                <ResultDisplay
                  result={result}
                  category={category}
                  toUnit={toUnit}
                  isLoading={isLoading}
                  error={error}
                />
              </div>

              {/* دکمه کپی */}
              {result !== null && (
                <div className="flex justify-center px-4 pb-2">
                  <CopyButton value={result} />
                </div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
