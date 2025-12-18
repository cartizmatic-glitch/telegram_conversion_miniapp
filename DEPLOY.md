# راهنمای Deploy به Telegram Mini App

## مراحل Deploy

### 1. آماده‌سازی پروژه

```bash
# Build پروژه
npm run build

# بررسی فایل‌های build شده
ls -la dist/
```

### 2. Deploy به Vercel

#### روش 1: از طریق GitHub (توصیه می‌شود)

1. پروژه را در GitHub push کنید:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. به [Vercel](https://vercel.com) بروید و وارد شوید
3. روی "New Project" کلیک کنید
4. Repository را انتخاب کنید
5. تنظیمات:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. روی "Deploy" کلیک کنید
7. بعد از deploy موفق، URL را کپی کنید (مثلاً: `https://your-app.vercel.app`)

#### روش 2: از طریق Vercel CLI

```bash
# نصب Vercel CLI
npm i -g vercel

# Login به Vercel
vercel login

# Deploy
vercel

# Deploy به Production
vercel --prod
```

### 3. تنظیمات Telegram Bot

1. به [@BotFather](https://t.me/botfather) در تلگرام بروید
2. دستور `/newbot` را ارسال کنید و یک ربات بسازید
3. بعد از ساخت ربات، دستور `/newapp` را ارسال کنید
4. ربات خود را انتخاب کنید
5. اطلاعات را وارد کنید:
   - **Title**: `تبدیل واحد`
   - **Description**: `تبدیل سریع و آسان واحدهای مختلف (طول، وزن، دما، حجم، زمان، مساحت، سرعت)`
   - **Photo**: (اختیاری) یک آیکون 640x360 پیکسل آپلود کنید
   - **Web App URL**: آدرس Vercel شما (مثلاً: `https://your-app.vercel.app`)
   - **Short name**: `unit-converter` (یا هر نام کوتاه دیگر)

6. BotFather یک لینک به شما می‌دهد که می‌توانید ربات را تست کنید

### 4. تست Mini App

1. ربات را در تلگرام باز کنید
2. روی دکمه "Web App" یا "Open App" کلیک کنید
3. Mini App باید باز شود و کار کند

### 5. بهینه‌سازی‌های اضافی (اختیاری)

#### تنظیمات Domain سفارشی

اگر می‌خواهید از domain سفارشی استفاده کنید:

1. در Vercel به Settings > Domains بروید
2. Domain خود را اضافه کنید
3. DNS records را تنظیم کنید
4. URL جدید را در BotFather به‌روزرسانی کنید

#### تنظیمات Environment Variables

اگر نیاز به environment variables دارید:

1. در Vercel به Settings > Environment Variables بروید
2. متغیرهای مورد نیاز را اضافه کنید
3. Redeploy کنید

## نکات مهم

- ✅ HTTPS: Vercel به‌صورت خودکار HTTPS ارائه می‌دهد
- ✅ CORS: تنظیمات در `vercel.json` موجود است
- ✅ Security Headers: در `vercel.json` تنظیم شده‌اند
- ✅ Cache: Assets به‌صورت خودکار cache می‌شوند
- ✅ Performance: Bundle size بهینه شده است

## عیب‌یابی

### مشکل: Mini App باز نمی‌شود

- بررسی کنید که URL در BotFather درست است
- بررسی کنید که HTTPS فعال است
- بررسی کنید که فایل `index.html` در root قرار دارد

### مشکل: استایل‌ها درست نمایش داده نمی‌شوند

- بررسی کنید که فایل‌های CSS در `dist/assets/` قرار دارند
- بررسی کنید که `vercel.json` درست تنظیم شده است

### مشکل: Telegram SDK کار نمی‌کند

- بررسی کنید که script در `index.html` اضافه شده است
- بررسی کنید که در محیط Telegram اجرا می‌شود (نه در browser عادی)

## پشتیبانی

برای مشکلات بیشتر، لطفاً Issue ایجاد کنید.

