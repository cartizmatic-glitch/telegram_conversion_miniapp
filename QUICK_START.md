# راهنمای سریع Deploy

## ✅ کارهای انجام شده

- ✅ Build پروژه انجام شد
- ✅ Git repository ایجاد شد
- ✅ فایل‌های آماده commit هستند
- ✅ بهینه‌سازی‌های Telegram Mini App اعمال شد

## 🚀 مراحل بعدی

### 1. تنظیم Git (فقط یک بار)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

یا فقط برای این repository:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. Commit تغییرات

```bash
git add .
git commit -m "Initial commit: Telegram Mini App for unit conversion"
```

### 3. ایجاد Repository در GitHub

1. به [GitHub](https://github.com) بروید
2. روی "New repository" کلیک کنید
3. نام repository را وارد کنید (مثلاً: `telegram-unit-converter`)
4. روی "Create repository" کلیک کنید
5. دستورات نشان داده شده را اجرا کنید:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Deploy به Vercel

#### روش 1: از طریق GitHub (توصیه می‌شود)

1. به [Vercel](https://vercel.com) بروید و وارد شوید
2. روی "New Project" کلیک کنید
3. Repository را انتخاب کنید
4. تنظیمات:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. روی "Deploy" کلیک کنید
6. منتظر بمانید تا deploy کامل شود
7. URL را کپی کنید (مثلاً: `https://your-app.vercel.app`)

#### روش 2: از طریق CLI

```bash
# نصب Vercel CLI (اگر نصب نشده)
npm i -g vercel

# Login
vercel login

# Deploy
npm run deploy
```

### 5. تنظیمات Telegram Bot

> ⚠️ **مهم**: **نیازی به Bot Token ندارید!** این یک frontend-only app است.

1. به [@BotFather](https://t.me/botfather) در تلگرام بروید
2. دستور `/newbot` را ارسال کنید
3. نام ربات را وارد کنید (مثلاً: `Unit Converter Bot`)
4. Username ربات را وارد کنید (باید به `bot` ختم شود، مثلاً: `unit_converter_bot`)
   - BotFather یک Token به شما می‌دهد، اما **نیازی به آن ندارید**! فقط ربات را بسازید.
5. دستور `/newapp` را ارسال کنید
6. ربات خود را انتخاب کنید
7. اطلاعات را وارد کنید:
   - **Title**: `تبدیل واحد`
   - **Description**: `تبدیل سریع و آسان واحدهای مختلف`
   - **Photo**: (اختیاری) یک تصویر 640x360 پیکسل
   - **Web App URL**: آدرس Vercel شما
   - **Short name**: `unit-converter`
8. BotFather یک لینک به شما می‌دهد

### 6. تست Mini App

1. روی لینک BotFather کلیک کنید یا ربات را در تلگرام باز کنید
2. روی دکمه "Web App" یا "Open App" کلیک کنید
3. Mini App باید باز شود و کار کند! 🎉

## 📝 Checklist

- [ ] Git config تنظیم شد
- [ ] تغییرات commit شدند
- [ ] Repository در GitHub ایجاد شد
- [ ] کدها به GitHub push شدند
- [ ] پروژه در Vercel deploy شد
- [ ] URL Vercel دریافت شد
- [ ] ربات در BotFather ساخته شد
- [ ] Mini App در BotFather تنظیم شد
- [ ] Mini App تست شد

## 🔧 عیب‌یابی

### Build موفق نشد
```bash
# پاک کردن node_modules و نصب مجدد
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy در Vercel موفق نشد
- بررسی کنید که `vercel.json` در root پروژه است
- بررسی کنید که `dist` folder بعد از build ایجاد شده است
- لاگ‌های Vercel را بررسی کنید

### Mini App باز نمی‌شود
- بررسی کنید که URL در BotFather درست است
- بررسی کنید که URL با `https://` شروع می‌شود
- بررسی کنید که فایل `index.html` در root `dist` است

## 📚 منابع بیشتر

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---

**موفق باشید! 🚀**

