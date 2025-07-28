import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrokerCard } from "@/components/BrokerCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/data";
import { ArrowUp } from "@phosphor-icons/react";

export function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            أفضل وسطاء التداول في السعودية
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            اكتشف وقارن بين أفضل وسطاء التداول المرخصين والموثوقين للمتداولين السعوديين
          </p>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            <span className="font-bold text-blue-600">{brokers.length}</span> وسيط مرخص ومتاح للمتداولين السعوديين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {brokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
            />
          ))}
        </div>

        {/* Fraud Companies Warning Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
            الشركات النصابة وأساليب الاحتيال الشائعة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fraud Company 1 */}
            <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-700 mb-2">
                    تحذير من منصة أتلانتيس Atlantis
                  </h3>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                    25/05/2025
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <span className="text-red-700 text-lg">⚠️</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                تحذر من التعامل مع منصة ATL-T منصة تداول نصابة. نشاهدهم.
              </p>
            </div>

            {/* Fraud Company 2 */}
            <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-700 mb-2">
                    موقع AQRL Trade
                  </h3>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                    18/05/2025
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <span className="text-red-700 text-lg">⚠️</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                تحذر من التعامل مع AQRL Trade موقع وهمي، يقدم منصة تداول...
              </p>
            </div>

            {/* Fraud Company 3 */}
            <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-700 mb-2">
                    مؤسسة الشرقري للاستثمار
                  </h3>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                    06/05/2025
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <span className="text-red-700 text-lg">⚠️</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                تحذر من التعامل مع مؤسسة الشرقري للاستثمار، منصة وهمية.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-red-100 rounded-lg">
            <h3 className="text-xl font-bold text-red-700 mb-4">
              كيفية تجنب عمليات الاحتيال:
            </h3>
            <ul className="space-y-3 text-red-700">
              <li className="flex items-start">
                <span className="ml-3 text-red-600">•</span>
                <span>تأكد من أن الوسيط مرخص من هيئة السوق المالية السعودية</span>
              </li>
              <li className="flex items-start">
                <span className="ml-3 text-red-600">•</span>
                <span>احذر من الوعود بأرباح مضمونة وعوائد خيالية</span>
              </li>
              <li className="flex items-start">
                <span className="ml-3 text-red-600">•</span>
                <span>لا تتعامل مع الشركات التي تطلب إيداعات كبيرة مقدماً</span>
              </li>
              <li className="flex items-start">
                <span className="ml-3 text-red-600">•</span>
                <span>تجنب الشركات التي تتصل بك هاتفياً دون طلب مسبق</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />

      <Button
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-110 text-white"
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
}