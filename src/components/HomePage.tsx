import { useState, useRef, useEffect } from "react";
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
import { brokers } from "@/lib/data";
import { articles } from "@/lib/articles";
import { ArrowUp, Question } from "@phosphor-icons/react";

export function HomePage() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll functionality for mobile slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % brokers.length;
        const cardWidth = sliderRef.current.scrollWidth / brokers.length;
        sliderRef.current.scrollTo({
          left: nextSlide * cardWidth,
          behavior: 'smooth'
        });
        setCurrentSlide(nextSlide);
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Handle manual scroll to update current slide indicator
  const handleScroll = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / brokers.length;
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideIndex = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            الوسطاء الموصى بهم
          </h2>
          <p className="text-gray-600">
            {brokers.length} وسيط مرخص
          </p>
        </div>

        {/* Mobile Sliding Cards */}
        <div className="md:hidden mb-16">
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="mobile-slider overflow-x-auto scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex gap-4 pb-4 px-2">
              {brokers.map((broker) => (
                <div 
                  key={broker.id} 
                  className="flex-shrink-0 w-[85vw] max-w-[320px]"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <BrokerCard broker={broker} />
                </div>
              ))}
            </div>
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center mt-4 gap-2">
            {brokers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (sliderRef.current) {
                    const cardWidth = sliderRef.current.scrollWidth / brokers.length;
                    sliderRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                    setCurrentSlide(index);
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
          {brokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
            />
          ))}
        </div>

        {/* Fraud Companies Warning Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-16">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
            تحذيرات الشركات النصابة
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
              نصائح لتجنب الاحتيال:
            </h3>
            <ul className="space-y-2 text-red-700 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>تأكد من الترخيص من هيئة السوق المالية</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>احذر الوعود بأرباح مضمونة</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>تجنب الإيداعات الكبيرة المسبقة</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              مقالات ونصائح التداول
            </h2>
            <p className="text-gray-600">
              أحدث المقالات والنصائح لتطوير مهاراتك في التداول
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="group block">
                <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
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
                عرض جميع المقالات
              </Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              الأسئلة الشائعة
            </h2>
            <p className="text-gray-600">
              إجابات على أهم الأسئلة حول اختيار الوسطاء الماليين
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="question-1" className="bg-white rounded-lg border shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                  <span className="text-lg font-medium">كيف أختار الوسيط المالي المناسب؟</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  <p>
                    عند اختيار الوسيط المالي، يجب التأكد من حصوله على ترخيص من هيئة السوق المالية السعودية أو مؤسسة النقد العربي السعودي. كما يُنصح بمراجعة هيكل الرسوم، جودة منصة التداول، خدمة العملاء، والمنتجات المالية المتاحة. تأكد أيضاً من قراءة تقييمات العملاء والتحقق من سمعة الشركة في السوق.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="question-2" className="bg-white rounded-lg border shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                  <span className="text-lg font-medium">ما هي الرسوم المتوقعة عند التداول؟</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  <p>
                    تختلف الرسوم بين الوسطاء، ولكن عادة تشمل: رسوم العمولة على كل صفقة (تتراوح من 0.05% إلى 0.25%)، رسوم حفظ الأوراق المالية، رسوم التحويل والسحب، ورسوم عدم النشاط في بعض الحالات. يُنصح بمقارنة إجمالي التكاليف بدلاً من التركيز على رسم واحد فقط.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="question-3" className="bg-white rounded-lg border shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                  <span className="text-lg font-medium">هل التداول آمن مع الوسطاء المرخصين؟</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  <p>
                    نعم، التداول مع الوسطاء المرخصين من الجهات التنظيمية السعودية آمن بشكل كبير. هذه الشركات تخضع لرقابة صارمة وتلتزم بمعايير الأمان والشفافية. أموال العملاء محمية ومفصولة عن أموال الشركة، كما أن هناك صندوق حماية المستثمرين لضمان حقوق المتداولين.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="question-4" className="bg-white rounded-lg border shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                  <span className="text-lg font-medium">ما هو الحد الأدنى للاستثمار؟</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  <p>
                    يختلف الحد الأدنى للاستثمار بين الوسطاء، ولكن معظم الشركات تتطلب حداً أدنى يتراوح بين 1,000 إلى 10,000 ريال سعودي لفتح الحساب. بعض الوسطاء قد يطلبون مبالغ أعلى للحصول على خدمات مميزة أو للاستثمار في منتجات معينة مثل الصناديق الاستثمارية.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="question-5" className="bg-white rounded-lg border shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                  <span className="text-lg font-medium">كم من الوقت يستغرق فتح حساب التداول؟</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  <p>
                    عادة ما يستغرق فتح حساب التداول من يوم إلى 3 أيام عمل، حسب الوسيط ومدى اكتمال المستندات المطلوبة. تحتاج إلى تقديم صورة الهوية الوطنية، إثبات الدخل، وملء نماذج التقييم المالي. بعض الوسطاء يوفرون خدمة الفتح الفوري إلكترونياً للعملاء السعوديين.
                  </p>
                </AccordionContent>
              </AccordionItem>
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
                لديك سؤال آخر؟
              </h3>
              <p className="text-gray-600 mb-6">
                لا تتردد في التواصل معنا للحصول على إجابات مخصصة لاستفساراتك
              </p>
              <Button 
                onClick={() => setIsContactDialogOpen(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                اطرح سؤالك الآن
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