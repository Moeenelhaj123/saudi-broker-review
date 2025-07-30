#!/bin/bash

# وسطاء السعودية - إعداد النشر
echo "🚀 إعداد موقع وسطاء السعودية للنشر..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ خطأ: npm غير مثبت. يرجى تثبيت Node.js أولاً"
    exit 1
fi

echo "📦 تثبيت التبعيات..."
npm install

echo "🔨 بناء المشروع..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ تم بناء المشروع بنجاح!"
    echo ""
    echo "📁 ملفات النشر جاهزة في مجلد: dist/"
    echo ""
    echo "🌐 خيارات النشر:"
    echo "1. Vercel: ارفع على https://vercel.com"
    echo "2. Netlify: ارفع على https://netlify.com" 
    echo "3. GitHub Pages: فعل GitHub Actions"
    echo ""
    echo "📖 للمزيد من التفاصيل، راجع: DEPLOYMENT.md"
else
    echo "❌ فشل في بناء المشروع. تحقق من الأخطاء أعلاه."
    exit 1
fi