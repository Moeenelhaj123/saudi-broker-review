import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              و
            </div>
            <h1 className="text-xl font-bold text-foreground">وسطاء السعودية</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              الوسطاء
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              التقييمات
            </a>
          </nav>

          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            اتصل بنا
          </Button>
        </div>
      </div>
    </header>
  );
}