export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-secondary/10 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content - Left Side */}
          <div className="text-right lg:text-right space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              أفضل وسطاء التداول
              <br />
              <span className="text-primary">في السعودية</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              تقييمات ومراجعات شاملة للوسطاء الماليين المرخصين
            </p>
          </div>
          
          {/* Right Side - Space for future element */}
          <div className="lg:block hidden">
            {/* Space reserved for future element */}
            <div className="w-full h-64 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">مساحة محجوزة للعنصر القادم</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}