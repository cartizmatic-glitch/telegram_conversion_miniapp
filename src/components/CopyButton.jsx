/**
 * کامپوننت CopyButton - دکمه کپی نتیجه
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '../hooks/useTelegram.js';

/**
 * @param {Object} props
 * @param {string|number} props.value - مقدار برای کپی
 */
export function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const { hapticFeedback, showAlert } = useTelegram();

  const handleCopy = async () => {
    if (value === null || value === undefined) return;

    try {
      await navigator.clipboard.writeText(value.toString());
      hapticFeedback('notification', 'success');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      hapticFeedback('notification', 'error');
      showAlert?.('خطا در کپی کردن مقدار');
    }
  };

  if (value === null || value === undefined) return null;

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="px-4 py-2 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 text-white rounded-2xl border-2 border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-200"
      title="کپی نتیجه"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            کپی شد!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            کپی
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

