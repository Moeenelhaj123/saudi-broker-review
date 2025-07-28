import DisplayCards from "./DisplayCards";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-secondary/10 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="text-right lg:text-right space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              أفضل وسطاء التداول
              <br />
              <span className="text-primary">في السعودية</span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                دليلك الشامل لاختيار الوسيط المالي المناسب لك. تقييمات حقيقية ومفصلة من متداولين سعوديين، مقارنات شاملة للرسوم والخدمات، ونصائح الخبراء لمساعدتك في اتخاذ القرار الصحيح.
              </p>
              <p className="text-lg text-muted-foreground">
                جميع الوسطاء مرخصون من هيئة السوق المالية ومؤسسة النقد العربي السعودي لضمان أمان استثماراتك.
              </p>
            </div>
          </div>
          
          {/* Right Side - Display Cards */}
          <div className="lg:block hidden">
            <DisplayCards />
          </div>
        </div>
      </div>
    </section>
  );
}