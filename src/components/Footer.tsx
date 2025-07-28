export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold">
              و
            </div>
            <h3 className="text-lg font-bold">وسطاء السعودية</h3>
          </div>
          <p className="text-primary-foreground/80 mb-4 max-w-md mx-auto">
            دليلك لأفضل الوسطاء الماليين في السعودية
          </p>
          
          <div className="border-t border-primary-foreground/20 pt-6 mt-6">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 وسطاء السعودية. جميع الحقوق محفوظة.
            </p>
            <p className="text-primary-foreground/60 text-xs mt-2">
              تحذير: التداول ينطوي على مخاطر
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}