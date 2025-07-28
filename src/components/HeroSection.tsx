import { Button } from "@/components/ui/button";
import { TrendUp } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-secondary/10 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            اختر أفضل وسيط مالي
            <br />
            <span className="text-primary">في المملكة العربية السعودية</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            مقارنات شاملة وتقييمات حقيقية لمساعدتك في اختيار الوسيط المالي المناسب لاحتياجاتك الاستثمارية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              <TrendUp size={20} className="ml-2" />
              استكشف الوسطاء
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              اقرأ التقييمات
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}