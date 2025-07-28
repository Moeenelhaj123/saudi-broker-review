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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            الوسطاء الموصى بهم
          </h2>
          <p className="text-gray-600">
            {brokers.length} وسيط مرخص
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
            {/* Article 1 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-sm">تحليل السوق</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>15 يناير 2025</span>
                  <span className="mx-2">•</span>
                  <span>5 دقائق قراءة</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  كيفية اختيار الوسيط المناسب للتداول
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  دليل شامل لمساعدتك في اختيار أفضل وسيط تداول يناسب احتياجاتك. تعرف على أهم المعايير والعوامل التي يجب مراعاتها عند اتخاذ هذا القرار المهم.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  اقرأ المزيد
                </Button>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <p className="text-sm">استراتيجيات التداول</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>12 يناير 2025</span>
                  <span className="mx-2">•</span>
                  <span>8 دقائق قراءة</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  إدارة المخاطر في التداول للمبتدئين
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  تعلم أساسيات إدارة المخاطر في التداول وكيفية حماية رأس مالك. استراتيجيات مجربة لتقليل الخسائر وزيادة فرص النجاح في الأسواق المالية.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  اقرأ المزيد
                </Button>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-sm">التحليل الفني</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>8 يناير 2025</span>
                  <span className="mx-2">•</span>
                  <span>6 دقائق قراءة</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  التداول الحلال وفقاً للشريعة الإسلامية
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  فهم ضوابط التداول الحلال في الأسواق المالية. دليل مفصل حول الحسابات الإسلامية وكيفية التداول وفقاً لأحكام الشريعة الإسلامية.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  اقرأ المزيد
                </Button>
              </div>
            </article>
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