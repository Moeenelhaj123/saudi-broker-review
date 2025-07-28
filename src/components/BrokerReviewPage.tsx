import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { brokers } from "@/lib/data";
import { useEffect } from "react";
import { 
  ExnessContent, 
  AvaTradeContent, 
  XMContent, 
  PepperstoneContent, 
  ICMarketsContent, 
  EToroContent 
} from "@/components/broker-content";

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
        "reviewBody": `مراجعة شاملة لشركة ${broker.nameAr} تشمل التراخيص والتنظيم من ${broker.regulation && Array.isArray(broker.regulation) ? broker.regulation.join(', ') : 'مؤسسات مالية مرخصة'}، الحد الأدنى للإيداع ${broker.minDeposit} دولار، وفروقات تبدأ من ${broker.spreads}.`
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

  const getBrokerContent = () => {
    switch (broker.id) {
      case 'exness':
        return <ExnessContent />;
      case 'avatrade':
        return <AvaTradeContent />;
      case 'xm':
        return <XMContent />;
      case 'pepperstone':
        return <PepperstoneContent />;
      case 'ic-markets':
        return <ICMarketsContent />;
      case 'etoro':
        return <EToroContent />;
      default:
        return <div>محتوى غير متاح</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
            <ArrowRight size={16} className="text-gray-400" />
            <span>مراجعة شركة {broker.nameAr}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="mb-4">
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
                      <CheckCircle size={14} className="mr-1" />
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SEO-Optimized Comprehensive Content */}
        <section>
          {getBrokerContent()}
        </section>
        
        {/* Action Button */}
        <div className="text-center pt-8 mt-8 border-t">
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