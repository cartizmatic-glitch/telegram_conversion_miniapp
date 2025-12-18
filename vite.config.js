import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // تنظیمات base path برای deployment
  base: '/',
    // تنظیمات server برای development
  server: {
    port: 3000,
    open: false,
    host: true, // دسترسی از شبکه محلی
    hmr: {
      overlay: false, // Disable the HMR overlay
    },
  },
  // تنظیمات preview برای تست production build
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    // بهینه‌سازی bundle size
    minify: 'esbuild',
    target: 'es2015',
    cssMinify: true,
    // تقسیم کد برای کاهش bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // جدا کردن vendor libraries
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
        },
        // بهینه‌سازی نام فایل‌ها
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // بهینه‌سازی chunk size
    chunkSizeWarningLimit: 1000,
    // تولید source maps برای debugging (غیرفعال در production)
    sourcemap: false,
    // حذف کامنت‌ها در production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // بهینه‌سازی برای production
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  // تنظیمات resolve
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
