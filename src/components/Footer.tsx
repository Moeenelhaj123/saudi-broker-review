import { Button } from "@/components/ui/button";
import { TwitterLogo, InstagramLogo, LinkedinLogo, TelegramLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold">
                و
              </div>
              <h3 className="text-lg font-bold">وسطاء السعودية</h3>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              دليلك الشامل لاختيار أفضل الوسطاء الماليين في المملكة العربية السعودية
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <TwitterLogo size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <InstagramLogo size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <LinkedinLogo size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <TelegramLogo size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">الوسطاء</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">جميع الوسطاء</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الوسطاء المحليون</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الوسطاء الدوليون</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الحسابات الإسلامية</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">الموارد</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">دليل التداول</a></li>
              <li><a href="#" className="hover:text-white transition-colors">مقالات تعليمية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أخبار السوق</a></li>
              <li><a href="#" className="hover:text-white transition-colors">التحليل الفني</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 وسطاء السعودية. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-white text-sm transition-colors">
              إخلاء المسؤولية
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-white text-sm transition-colors">
              تحذيرات المخاطر
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}