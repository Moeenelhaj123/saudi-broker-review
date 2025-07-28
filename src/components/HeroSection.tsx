import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendUp, Shield, Star, Users } from "@phosphor-icons/react";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">وسطاء منظمون</h3>
              <p className="text-muted-foreground">
                جميع الوسطاء مرخصون من هيئة السوق المالية ومؤسسة النقد العربي السعودي
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="text-accent" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">تقييمات حقيقية</h3>
              <p className="text-muted-foreground">
                آراء وتجارب حقيقية من متداولين سعوديين لمساعدتك في اتخاذ القرار الصحيح
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">مقارنات شاملة</h3>
              <p className="text-muted-foreground">
                قارن الرسوم والمنصات والخدمات بسهولة لتجد الوسيط الأنسب لك
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">إحصائيات الموقع</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">وسيط مرخص</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-muted-foreground">تقييم حقيقي</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">مستخدم نشط</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-muted-foreground">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}