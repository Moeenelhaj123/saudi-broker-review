import { useKV } from "@github/spark/hooks";
import DisplayCards from "./DisplayCards";

export function HeroSection() {
  const [heroContent] = useKV("admin-hero-content", {
    headline: "أفضل وسطاء التداول في السعودية",
    subheadline: "دليلك الشامل لاختيار الوسيط المالي المناسب لك. تقييمات حقيقية ومفصلة من متداولين سعوديين، مقارنات شاملة للرسوم والخدمات، ونصائح الخبراء لمساعدتك في اتخاذ القرار الصحيح. جميع الوسطاء مرخصون من هيئة السوق المالية ومؤسسة النقد العربي السعودي لضمان أمان استثماراتك."
  });

  return (
    <section className="bg-gradient-to-b from-secondary/10 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="text-right lg:text-right space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {heroContent.headline.split(" ").slice(0, 3).join(" ")}
              <br />
              <span className="text-primary">{heroContent.headline.split(" ").slice(3).join(" ")}</span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {heroContent.subheadline}
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