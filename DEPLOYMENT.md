# خطوات رفع التطبيق على Vercel

1. قم بإنشاء حساب مجاني على Vercel:
   - توجه إلى https://vercel.com
   - اضغط على "Sign Up"
   - قم بالتسجيل باستخدام حساب GitHub الخاص بك

2. قم برفع المشروع على GitHub:
   - قم بإنشاء repository جديد على GitHub
   - قم برفع الملفات عن طريق هذه الأوامر:
     ```bash
     git init
     git add .
     git commit -m "first commit"
     git branch -M main
     git remote add origin https://github.com/username/repository-name.git
     git push -u origin main
     ```

3. قم بربط المشروع مع Vercel:
   - ادخل إلى لوحة التحكم في Vercel
   - اضغط على "Add New Project"
   - اختر المشروع من قائمة مشاريع GitHub
   - اضغط على "Import"
   - اترك الإعدادات الافتراضية كما هي
   - اضغط على "Deploy"

4. انتظر حتى يكتمل الرفع:
   - سيقوم Vercel تلقائياً ببناء ونشر التطبيق
   - ستحصل على رابط للموقع مثل: https://your-app.vercel.app

ملاحظات هامة:
- التطبيق سيتم تحديثه تلقائياً عند كل push جديد على GitHub
- يمكنك إضافة domain خاص بك لاحقاً من خلال إعدادات المشروع
- Vercel يوفر SSL مجاني تلقائياً
- البيانات المخزنة في localStorage ستكون خاصة بكل متصفح على حدة

للمزيد من المعلومات:
- https://vercel.com/docs
- https://vercel.com/guides/deploying-react-with-vercel
