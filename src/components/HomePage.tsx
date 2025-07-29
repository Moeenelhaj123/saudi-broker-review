import { useState, useRef, useEffect, useCallback } from "react";
import { useKV } from "@github/spark/hooks";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrokerCard } from "@/components/BrokerCard";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { brokers, Broker } from "@/lib/data";
import { articles } from "@/lib/articles";
import { ArrowUp, Question } from "@phosphor-icons/react";

// Convert admin broker to standard broker format for compatibility
const convertAdminBrokerToBroker = (adminBroker: any): Broker => ({
  id: adminBroker.id,
  name: adminBroker.name,
  nameAr: adminBroker.nameAr || adminBroker.name,
  logo: "", // Admin brokers don't have logos managed currently
  rating: adminBroker.rating,
  reviewCount: adminBroker.reviews,
  regulation: adminBroker.license ? adminBroker.license.split(', ') : [],
  minDeposit: parseInt(adminBroker.minDeposit) || 0,
  spreads: adminBroker.spreadFrom || "متغيرة",
  platforms: adminBroker.platforms || ["MetaTrader 4", "MetaTrader 5"],
  accountTypes: adminBroker.accountTypes || ["حساب قياسي", "حساب إسلامي"],
  website: adminBroker.website || "",
  phone: adminBroker.phone || "",
  email: adminBroker.email || "",
  description: adminBroker.description || "",
  descriptionAr: adminBroker.description || "",
  pros: adminBroker.pros || [],
  cons: adminBroker.cons || [],
  fees: {
    commission: "0%",
    withdrawal: "مجاني",
    inactivity: "غير متاح"
  }
});

export function HomePage() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  
  // Get admin-managed content
  const [adminBrokers] = useKV("admin-brokers", []);
  const [adminArticles] = useKV("admin-articles", []);
  
  // Get section content from admin
  const [brokersSection] = useKV("admin-brokers-section", {
    title: "الوسطاء الموصى بهم",
    subtitle: "وسيط مرخص"
  });
  
  const [faqSection] = useKV("admin-faq-section", {
    title: "الأسئلة الشائعة",
    subtitle: "إجابات على أهم الأسئلة حول اختيار الوسطاء الماليين",
    contactCta: {
      title: "لديك سؤال آخر؟",
      subtitle: "لا تتردد في التواصل معنا للحصول على إجابات مخصصة لاستفساراتك",
      buttonText: "اطرح سؤالك الآن"
    }
  });
  
  const [faqItems] = useKV("admin-faq-items", [
    {
      id: "q1",
      question: "كيف أختار الوسيط المالي المناسب؟",
      answer: "عند اختيار الوسيط المالي، يجب التأكد من حصوله على ترخيص من هيئة السوق المالية السعودية أو مؤسسة النقد العربي السعودي. كما يُنصح بمراجعة هيكل الرسوم، جودة منصة التداول، خدمة العملاء، والمنتجات المالية المتاحة. تأكد أيضاً من قراءة تقييمات العملاء والتحقق من سمعة الشركة في السوق."
    },
    {
      id: "q2", 
      question: "ما هي الرسوم المتوقعة عند التداول؟",
      answer: "تختلف الرسوم بين الوسطاء، ولكن عادة تشمل: رسوم العمولة على كل صفقة (تتراوح من 0.05% إلى 0.25%)، رسوم حفظ الأوراق المالية، رسوم التحويل والسحب، ورسوم عدم النشاط في بعض الحالات. يُنصح بمقارنة إجمالي التكاليف بدلاً من التركيز على رسم واحد فقط."
    }
  ]);
  
  const [fraudSection] = useKV("admin-fraud-section", {
    title: "تحذيرات الشركات النصابة",
    tips: {
      title: "نصائح لتجنب الاحتيال:",
      items: [
        "تأكد من الترخيص من هيئة السوق المالية",
        "احذر الوعود بأرباح مضمونة", 
        "تجنب الإيداعات الكبيرة المسبقة"
      ]
    }
  });
  
  const [articlesSection] = useKV("admin-articles-section", {
    title: "مقالات ونصائح التداول",
    subtitle: "أحدث المقالات والنصائح لتطوير مهاراتك في التداول",
    buttonText: "عرض جميع المقالات"
  });
  
  // Use admin brokers if available, otherwise fallback to static data
  const rawDisplayBrokers = Array.isArray(adminBrokers) && adminBrokers.length > 0 
    ? adminBrokers.filter((broker: any) => broker.isFeatured) 
    : brokers;
  const displayBrokers = Array.isArray(rawDisplayBrokers) 
    ? rawDisplayBrokers.map((broker: any) => 
        broker.hasOwnProperty('isFeatured') ? convertAdminBrokerToBroker(broker) : broker
      )
    : [];
  
  // Get scam brokers for warning section
  const scamBrokers = Array.isArray(adminBrokers) && adminBrokers.length > 0 
    ? adminBrokers.filter((broker: any) => broker.isScam) 
    : [];
  
  const displayArticles = Array.isArray(adminArticles) && adminArticles.length > 0 
    ? adminArticles.filter((article: any) => article.isPublished).slice(0, 3) 
    : articles.slice(0, 3);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll functionality for mobile slider
  useEffect(() => {
    if (!Array.isArray(displayBrokers) || displayBrokers.length === 0) return;
    
    const interval = setInterval(() => {
      if (sliderRef.current && !isAutoScrolling) {
        setIsAutoScrolling(true);
        const nextSlide = (currentSlide + 1) % displayBrokers.length;
        
        const container = sliderRef.current;
        const targetCard = container.children[nextSlide] as HTMLElement;
        
        if (targetCard) {
          const cardWidth = targetCard.offsetWidth;
          const gap = 16; // 4 * 4px (gap-4)
          const scrollPosition = (cardWidth + gap) * nextSlide;
          
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
          
          setCurrentSlide(nextSlide);
        }
        
        // Reset auto-scrolling flag after animation
        setTimeout(() => setIsAutoScrolling(false), 500);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoScrolling, displayBrokers.length]);

  // Handle manual scroll to update current slide indicator with throttling
  const handleScroll = useCallback(() => {
    if (sliderRef.current && !isAutoScrolling) {
      const container = sliderRef.current;
      const scrollLeft = Math.abs(container.scrollLeft); // Handle RTL
      const cardWidth = container.children[0] ? (container.children[0] as HTMLElement).offsetWidth : 0;
      const gap = 16;
      
      if (cardWidth > 0) {
        const newSlide = Math.round(scrollLeft / (cardWidth + gap));
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < displayBrokers.length) {
          setCurrentSlide(newSlide);
        }
      }
    }
  }, [isAutoScrolling, currentSlide, brokers.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {brokersSection.title}
          </h2>
          <p className="text-gray-600">
            {displayBrokers.length} {brokersSection.subtitle}
          </p>
        </div>

        {/* Mobile Sliding Cards */}
        <div className="md:hidden mb-16">
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => {
                if (sliderRef.current && currentSlide > 0) {
                  setIsAutoScrolling(true);
                  const container = sliderRef.current;
                  const targetIndex = currentSlide - 1;
                  
                  // Use scrollIntoView for better RTL support
                  const targetCard = container.children[targetIndex] as HTMLElement;
                  if (targetCard) {
                    targetCard.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    });
                    setCurrentSlide(targetIndex);
                  }
                  
                  setTimeout(() => setIsAutoScrolling(false), 500);
                }
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border flex items-center justify-center transition-all ${
                currentSlide === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 active:scale-95'
              }`}
              disabled={currentSlide === 0}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                if (sliderRef.current && currentSlide < brokers.length - 1) {
                  setIsAutoScrolling(true);
                  const container = sliderRef.current;
                  const targetIndex = currentSlide + 1;
                  
                  // Use scrollIntoView for better RTL support
                  const targetCard = container.children[targetIndex] as HTMLElement;
                  if (targetCard) {
                    targetCard.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    });
                    setCurrentSlide(targetIndex);
                  }
                  
                  setTimeout(() => setIsAutoScrolling(false), 500);
                }
              }}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border flex items-center justify-center transition-all ${
                currentSlide === displayBrokers.length - 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 active:scale-95'
              }`}
              disabled={currentSlide === displayBrokers.length - 1}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div 
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex gap-4 pb-4 px-2 overflow-x-auto mobile-slider scroll-snap-x"
            >
              {Array.isArray(displayBrokers) && displayBrokers.map((broker, index) => (
                <div 
                  key={broker.id} 
                  className="flex-shrink-0 w-[85vw] max-w-[320px] scroll-snap-center"
                >
                  <BrokerCard broker={broker} />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.isArray(displayBrokers) && displayBrokers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (sliderRef.current) {
                    setIsAutoScrolling(true);
                    
                    const container = sliderRef.current;
                    const targetCard = container.children[index] as HTMLElement;
                    
                    if (targetCard) {
                      // Use scrollIntoView for better RTL support
                      targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                      });
                      setCurrentSlide(index);
                    }
                    
                    setTimeout(() => setIsAutoScrolling(false), 500);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Array.isArray(displayBrokers) && displayBrokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
            />
          ))}
        </div>

        {/* Fraud Companies Warning Section */}
        {scamBrokers.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-16">
            <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
              {fraudSection.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scamBrokers.slice(0, 3).map((broker: any) => (
                <div key={broker.id} className="bg-white border border-red-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-red-700 mb-1">
                        {broker.nameAr || broker.name}
                      </h3>
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium inline-block mb-2">
                        تم التحديث مؤخراً
                      </div>
                    </div>
                    <div className="bg-red-100 p-1 rounded-full">
                      <span className="text-red-700 text-sm">⚠️</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs">
                    {broker.description || "منصة تداول نصابة - تجنب التعامل معها"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-bold text-red-700 mb-3">
                {fraudSection.tips.title}
              </h3>
              <ul className="space-y-2 text-red-700 text-sm">
                {fraudSection.tips.items.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-red-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Default fraud companies if no admin scam brokers */}
        {scamBrokers.length === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-16">
            <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
              {fraudSection.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fraud Company 1 */}
              <div className="bg-white border border-red-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-red-700 mb-1">
                      أتلانتيس Atlantis
                    </h3>
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium inline-block mb-2">
                      25/05/2025
                    </div>
                  </div>
                  <div className="bg-red-100 p-1 rounded-full">
                    <span className="text-red-700 text-sm">⚠️</span>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">
                  منصة تداول نصابة - تجنب التعامل معها
                </p>
              </div>

              {/* Fraud Company 2 */}
              <div className="bg-white border border-red-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-red-700 mb-1">
                      AQRL Trade
                    </h3>
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium inline-block mb-2">
                      18/05/2025
                    </div>
                  </div>
                  <div className="bg-red-100 p-1 rounded-full">
                    <span className="text-red-700 text-sm">⚠️</span>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">
                  موقع وهمي - لا تستثمر أموالك
                </p>
              </div>

              {/* Fraud Company 3 */}
              <div className="bg-white border border-red-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-red-700 mb-1">
                      مؤسسة الشرقري
                    </h3>
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium inline-block mb-2">
                      06/05/2025
                    </div>
                  </div>
                  <div className="bg-red-100 p-1 rounded-full">
                    <span className="text-red-700 text-sm">⚠️</span>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">
                  مؤسسة وهمية للاستثمار
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-bold text-red-700 mb-3">
                {fraudSection.tips.title}
              </h3>
              <ul className="space-y-2 text-red-700 text-sm">
                {fraudSection.tips.items.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-red-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Articles Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {articlesSection.title}
            </h2>
            <p className="text-gray-600">
              {articlesSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(displayArticles) && displayArticles.map((article) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="group block">
                <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={article.image || "/api/placeholder/400/200"} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{article.publishDate || article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime || "5 دقائق"}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      اقرأ المزيد
                    </Button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {/* View All Articles Button */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/articles">
                {articlesSection.buttonText}
              </Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {faqSection.title}
            </h2>
            <p className="text-gray-600">
              {faqSection.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="bg-white rounded-lg border shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                    <span className="text-lg font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Question size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {faqSection.contactCta.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {faqSection.contactCta.subtitle}
              </p>
              <Button 
                onClick={() => setIsContactDialogOpen(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {faqSection.contactCta.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ContactDialog 
        open={isContactDialogOpen} 
        onOpenChange={setIsContactDialogOpen} 
      />

      <Button
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-110 text-white"
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
}