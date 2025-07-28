import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle, ArrowLeft, Shield, TrendUp, DollarSign, ThumbsUp, ThumbsDown, Warning } from "@phosphor-icons/react";
import { brokers } from "@/lib/data";
import { useEffect } from "react";

export function BrokerReviewPage() {
  const { brokerId } = useParams<{ brokerId: string }>();
  const broker = brokers.find(b => b.id === brokerId);

  // Update document title for SEO
  useEffect(() => {
    if (broker) {
      document.title = `مراجعة شركة ${broker.nameAr} ${broker.name} - تقييم شامل وآراء المتداولين`;
      
      // Add meta description for SEO
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `مراجعة شاملة لشركة ${broker.nameAr} ${broker.name} - تقييم ${broker.rating}/5 من ${broker.reviewCount} متداول سعودي.`
        );
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = `مراجعة شاملة لشركة ${broker.nameAr} ${broker.name} - تقييم ${broker.rating}/5 من ${broker.reviewCount} متداول سعودي.`;
        document.head.appendChild(meta);
      }

      // Add JSON-LD structured data for SEO
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "FinancialService",
          "name": `${broker.name} - ${broker.nameAr}`,
          "description": broker.descriptionAr,
          "url": broker.website,
          "telephone": broker.phone,
          "email": broker.email
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": broker.rating,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Organization",
          "name": "وسطاء السعودية"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": broker.rating,
          "reviewCount": broker.reviewCount,
          "bestRating": 5,
          "worstRating": 1
        },
        "datePublished": new Date().toISOString().split('T')[0],
        "headline": `مراجعة شركة ${broker.nameAr} ${broker.name}`,
        "reviewBody": `مراجعة شاملة لشركة ${broker.nameAr} تشمل التراخيص والتنظيم من ${broker.regulation.join(', ')}، الحد الأدنى للإيداع ${broker.minDeposit} دولار، وفروقات تبدأ من ${broker.spreads}.`
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);

      // Scroll to top
      window.scrollTo(0, 0);
      
      return () => {
        const script = document.querySelector('script[type="application/ld+json"]');
        if (script) script.remove();
      };
    }
  }, [broker]);

  if (!broker) {
    return <Navigate to="/" replace />;
  }

  const getLogoDisplay = () => {
    if (broker.name.toLowerCase() === 'exness') {
      return (
        <div className="w-20 h-20 rounded-xl bg-yellow-400 flex items-center justify-center text-base font-bold text-gray-800 shadow-lg">
          exness
        </div>
      );
    }
    if (broker.name.toLowerCase() === 'avatrade') {
      return (
        <div className="w-20 h-20 rounded-xl bg-green-500 flex items-center justify-center text-base font-bold text-white shadow-lg">
          AvaTrade
        </div>
      );
    }
    return (
      <div className="w-20 h-20 rounded-xl bg-blue-500 flex items-center justify-center text-2xl shadow-lg">
        {broker.logo}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
            <ArrowLeft size={16} className="text-gray-400" />
            <span>مراجعة شركة {broker.nameAr}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {getLogoDisplay()}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    مراجعة شركة {broker.nameAr}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">{broker.name}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            weight={i < Math.floor(broker.rating) ? "fill" : "regular"}
                            className={`w-5 h-5 ${i < Math.floor(broker.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold text-gray-900">{broker.rating}</span>
                      <span className="text-gray-500">({broker.reviewCount.toLocaleString()} تقييم)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 px-2 py-1">
                      <CheckCircle size={14} className="ml-1" />
                      مرخص
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-blue-800 leading-relaxed">
                  {broker.descriptionAr}
                </p>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">ابدأ التداول الآن</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center space-y-1">
                    <p className="text-xl font-bold text-green-600">حد أدنى: ${broker.minDeposit}</p>
                    <p className="text-sm text-gray-600">الفروقات من {broker.spreads}</p>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    asChild
                  >
                    <a href={broker.website} target="_blank" rel="noopener noreferrer">
                      افتح حساب مع {broker.name}
                    </a>
                  </Button>
                  <div className="text-xs text-gray-500 text-center">
                    * CFDs قد تؤدي إلى خسارة رأس المال
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Quick Facts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            معلومات أساسية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-900 flex items-center gap-2">
                <Shield size={20} />
                التراخيص
              </h3>
              <p className="text-gray-700">
                {broker.regulation.join(', ')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-900 flex items-center gap-2">
                <DollarSign size={20} />
                الحد الأدنى
              </h3>
              <p className="text-gray-700">
                ${broker.minDeposit}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-orange-900 flex items-center gap-2">
                <TrendUp size={20} />
                الفروقات
              </h3>
              <p className="text-gray-700">
                من {broker.spreads}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-900">
                المنصات
              </h3>
              <p className="text-gray-700">
                {broker.platforms.join(', ')}
              </p>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المزايا والعيوب</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <ThumbsUp size={20} />
                المزايا
              </h3>
              <div className="space-y-2">
                {broker.pros.map((pro, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 text-sm">{pro}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                <ThumbsDown size={20} />
                العيوب
              </h3>
              <div className="space-y-2">
                {broker.cons.map((con, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Warning className="text-red-600 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 text-sm">{con}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">نظرة عامة</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">عن الشركة</h3>
              <p className="text-gray-700 leading-relaxed">
                شركة {broker.nameAr} ({broker.name}) من الوسطاء الماليين المعروفين عالمياً. 
                تقدم خدمات تداول متنوعة للعملات، المؤشرات، والسلع.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">أنواع الحسابات</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {broker.accountTypes.map((account, index) => (
                  <li key={index}>{account}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">التقييم النهائي</h3>
              <p className="text-gray-700 leading-relaxed">
                شركة {broker.nameAr} خيار جيد للمتداولين السعوديين نظراً لتراخيصها المتعددة 
                وخدماتها المتنوعة. ننصح بقراءة الشروط والأحكام قبل بدء التداول.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات الاتصال</h2>
          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <p><strong>الموقع الإلكتروني:</strong> <a href={broker.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{broker.website}</a></p>
            <p><strong>الهاتف:</strong> {broker.phone}</p>
            <p><strong>البريد الإلكتروني:</strong> {broker.email}</p>
          </div>
        </section>
        
        {/* Action Button */}
        <div className="text-center pt-6">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            asChild
          >
            <a href={broker.website} target="_blank" rel="noopener noreferrer">
              زيارة موقع {broker.name}
            </a>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}