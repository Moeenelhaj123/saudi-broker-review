import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle, ArrowLeft, Shield, TrendUp, Clock, Phone, Mail, Globe, Warning, ThumbsUp, ThumbsDown, Users, Award, DollarSign, ArrowRight } from "@phosphor-icons/react";
import { brokers, reviews } from "@/lib/data";
import { useEffect } from "react";

export function BrokerReviewPage() {
  const { brokerId } = useParams<{ brokerId: string }>();
  const broker = brokers.find(b => b.id === brokerId);
  const brokerReviews = reviews.filter(r => r.brokerId === brokerId);

  // Update document title for SEO
  useEffect(() => {
    document.title = `مراجعة شركة ${broker.nameAr} ${broker.name} - تقييم شامل وآراء المتداولين`;
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `مراجعة شاملة لشركة ${broker.nameAr} ${broker.name} - تقييم ${broker.rating}/5 من ${broker.reviewCount} متداول سعودي. اكتشف المزايا والعيوب والرسوم وظروف التداول.`
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = `مراجعة شاملة لشركة ${broker.nameAr} ${broker.name} - تقييم ${broker.rating}/5 من ${broker.reviewCount} متداول سعودي. اكتشف المزايا والعيوب والرسوم وظروف التداول.`;
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
        "email": broker.email,
        "sameAs": [broker.website]
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
  }, [broker]);

  if (!broker) {
    return <Navigate to="/" replace />;
  }

  const getLogoDisplay = () => {
    if (broker.name.toLowerCase() === 'exness') {
      return (
        <div className="w-24 h-24 rounded-2xl bg-yellow-400 flex items-center justify-center text-lg font-bold text-gray-800 shadow-lg">
          exness
        </div>
      );
    }
    if (broker.name.toLowerCase() === 'avatrade') {
      return (
        <div className="w-24 h-24 rounded-2xl bg-green-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
          AvaTrade
        </div>
      );
    }
    return (
      <div className="w-24 h-24 rounded-2xl bg-blue-500 flex items-center justify-center text-4xl shadow-lg">
        {broker.logo}
      </div>
    );
  };

  const calculateRatingDistribution = () => {
    // Mock rating distribution for SEO content
    return {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2
    };
  };

  const ratingDistribution = calculateRatingDistribution();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
            <ArrowLeft size={16} className="text-gray-400" />
            <span>مراجعة شركة {broker.nameAr}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-6">
                {getLogoDisplay()}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    مراجعة شركة {broker.nameAr}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">{broker.name}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            weight={i < Math.floor(broker.rating) ? "fill" : "regular"}
                            className={`w-6 h-6 ${i < Math.floor(broker.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{broker.rating}</span>
                      <span className="text-gray-500">({broker.reviewCount.toLocaleString()} تقييم)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 px-3 py-1">
                      <CheckCircle size={16} className="ml-1" />
                      مرخص ومنظم
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-blue-900 mb-3">نظرة عامة على الشركة</h2>
                <p className="text-blue-800 leading-relaxed text-lg">
                  {broker.descriptionAr}. يعتبر {broker.nameAr} من بين أفضل الوسطاء الماليين المتاحين للمتداولين السعوديين، 
                  حيث يقدم خدمات تداول متطورة مع التزام كامل بالمعايير التنظيمية الدولية.
                </p>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-center">ابدأ التداول الآن</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-bold text-green-600">حد أدنى: ${broker.minDeposit}</p>
                    <p className="text-sm text-gray-600">الفروقات من {broker.spreads}</p>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Quick Facts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="text-blue-600" size={32} />
            معلومات سريعة عن شركة {broker.nameAr}
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">
                  <Shield className="inline ml-2" size={24} />
                  التراخيص والتنظيم
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  شركة {broker.nameAr} مرخصة ومنظمة من قبل: <strong>{broker.regulation.join(', ')}</strong>. 
                  هذه التراخيص تضمن أعلى مستويات الحماية والشفافية في التداول.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-900">
                  <DollarSign className="inline ml-2" size={24} />
                  متطلبات الحساب
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  الحد الأدنى للإيداع يبلغ <strong>${broker.minDeposit}</strong> فقط، مما يجعل الشركة 
                  متاحة للمتداولين من جميع المستويات والميزانيات.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-900">
                  <TrendUp className="inline ml-2" size={24} />
                  تكاليف التداول
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  تقدم الشركة فروقات تنافسية تبدأ من <strong>{broker.spreads}</strong> للأزواج الرئيسية، 
                  مع شفافية كاملة في هيكل الرسوم.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-900">
                  <Users className="inline ml-2" size={24} />
                  منصات التداول
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  توفر <strong>{broker.platforms.length} منصات</strong> تداول متطورة تشمل {broker.platforms.join(', ')}، 
                  مع أدوات تحليل متقدمة لجميع المستويات.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Review */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* About the Broker */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">نبذة تفصيلية عن شركة {broker.nameAr}</h2>
              
              <div className="prose prose-lg max-w-none space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-900">تاريخ وخلفية الشركة</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    شركة {broker.nameAr} ({broker.name}) هي من الشركات الرائدة في مجال الوساطة المالية وتداول العملات الأجنبية. 
                    تأسست الشركة بهدف تقديم خدمات تداول متطورة ومبتكرة للمتداولين حول العالم، وقد نجحت في بناء سمعة قوية 
                    في السوق من خلال التزامها بأعلى معايير الجودة والشفافية.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    تخدم الشركة ملايين العملاء في أكثر من 150 دولة حول العالم، وتقدم مجموعة واسعة من الأدوات المالية 
                    التي تشمل العملات الأجنبية، المؤشرات، السلع، الأسهم، والعملات الرقمية. كما تتميز بتقديم أدوات تداول 
                    متقدمة وتحليلات السوق المتخصصة.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-900">التراخيص والتنظيم</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    تحمل شركة {broker.nameAr} تراخيص من عدة جهات تنظيمية مرموقة عالمياً، مما يضمن أعلى مستويات 
                    الحماية والأمان للعملاء. الجهات المنظمة تشمل:
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">الجهات التنظيمية:</h4>
                  <ul className="space-y-2 mb-4">
                    {broker.regulation.map((reg, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                        <span className="font-medium text-gray-700">{reg}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-gray-700 leading-relaxed">
                    هذه التراخيص تضمن أن الشركة تلتزم بأعلى معايير الحماية المالية وفصل أموال العملاء، 
                    مما يوفر بيئة تداول آمنة وموثوقة للمتداولين السعوديين.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-purple-900">المنصات والأدوات</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    توفر شركة {broker.nameAr} مجموعة متنوعة من منصات التداول المتطورة التي تناسب جميع مستويات المتداولين:
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">منصات التداول المتاحة:</h4>
                  <ul className="space-y-3 mb-6">
                    {broker.platforms.map((platform, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <TrendUp className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <div className="font-medium text-gray-900">{platform}</div>
                          <div className="text-gray-600">
                            منصة تداول متقدمة مع أدوات تحليل شاملة وواجهة سهلة الاستخدام
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-orange-900">أنواع الحسابات</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    تقدم الشركة مجموعة متنوعة من أنواع الحسابات لتناسب احتياجات المتداولين المختلفة:
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">أنواع الحسابات المتاحة:</h4>
                  <ul className="space-y-2">
                    {broker.accountTypes.map((account, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <DollarSign className="text-green-600 flex-shrink-0" size={16} />
                        <span className="font-medium text-gray-700">{account}</span>
                        <span className="text-gray-500 text-sm">- مناسب للمتداولين من جميع المستويات</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Pros and Cons */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">المزايا والعيوب</h2>
              
              <div className="prose prose-lg max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                      <ThumbsUp size={24} />
                      المزايا والنقاط الإيجابية
                    </h3>
                    <div className="space-y-4">
                      {broker.pros.map((pro, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                          <p className="text-gray-700 leading-relaxed">{pro}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-lg font-semibold mt-6 mb-3 text-green-800">لماذا تعتبر هذه المزايا مهمة؟</h4>
                    <p className="text-gray-700 leading-relaxed">
                      تتميز شركة {broker.nameAr} بمجموعة من المزايا التي تجعلها خياراً مفضلاً للمتداولين السعوديين. 
                      التراخيص المتعددة تضمن الحماية القانونية، بينما الفروقات المنخفضة تقلل من تكاليف التداول، 
                      والدعم الشامل للحسابات الإسلامية يجعلها مناسبة للمتداولين المسلمين.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center gap-3">
                      <ThumbsDown size={24} />
                      العيوب والتحديات
                    </h3>
                    <div className="space-y-4">
                      {broker.cons.map((con, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Warning className="text-red-600 mt-1 flex-shrink-0" size={20} />
                          <p className="text-gray-700 leading-relaxed">{con}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-lg font-semibold mt-6 mb-3 text-red-800">كيف يمكن التعامل مع هذه التحديات؟</h4>
                    <p className="text-gray-700 leading-relaxed">
                      رغم وجود بعض التحديات، فإن معظمها يمكن التغلب عليه من خلال التخطيط الجيد والاستفادة من 
                      الموارد التعليمية المتاحة. كما تعمل الشركة باستمرار على تحسين خدماتها ومعالجة نقاط الضعف.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fees and Costs */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">الرسوم والتكاليف</h2>
              
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  فهم هيكل الرسوم أمر بالغ الأهمية عند اختيار وسيط التداول. إليك تفصيل شامل للرسوم والتكاليف 
                  المرتبطة بالتداول مع شركة {broker.nameAr}:
                </p>
                
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">هيكل الرسوم الأساسي</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">رسوم العمولة</h4>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{broker.fees.commission}</p>
                    <p className="text-gray-600">لكل صفقة يتم تنفيذها</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">رسوم السحب</h4>
                    <p className="text-3xl font-bold text-green-600 mb-2">{broker.fees.withdrawal}</p>
                    <p className="text-gray-600">عن كل عملية سحب</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-orange-800 mb-2">رسوم عدم النشاط</h4>
                    <p className="text-3xl font-bold text-orange-600 mb-2">{broker.fees.inactivity}</p>
                    <p className="text-gray-600">بعد فترة عدم نشاط طويلة</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">تفاصيل إضافية حول التكاليف</h3>
                
                <h4 className="text-xl font-semibold mb-3 text-blue-800">الفروقات (Spreads)</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  تبدأ الفروقات من <strong>{broker.spreads}</strong> للأزواج الرئيسية مثل EUR/USD و GBP/USD. 
                  هذه الفروقات تعتبر تنافسية جداً في السوق وتختلف حسب ظروف السوق ونوع الحساب.
                </p>
                
                <h4 className="text-xl font-semibold mb-3 text-green-800">رسوم التبييت (Swap)</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  تطبق رسوم التبييت على الصفقات المفتوحة بين عشية وضحاها. هذه الرسوم قد تكون إيجابية أو سلبية 
                  حسب اتجاه الصفقة وأسعار الفائدة للعملات المتداولة.
                </p>
                
                <h4 className="text-xl font-semibold mb-3 text-purple-800">رسوم التحويل والإيداع</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  معظم طرق الإيداع مجانية، لكن قد تطبق رسوم على بعض طرق الدفع. رسوم التحويل البنكي 
                  تختلف حسب البنك المستخدم والمبلغ المحول.
                </p>
                
                <h4 className="text-xl font-semibold mb-3 text-orange-800">رسوم تحويل العملة</h4>
                <p className="text-gray-700 leading-relaxed">
                  عند التداول بعملة مختلفة عن عملة الحساب، قد تطبق رسوم تحويل صغيرة. 
                  يُنصح بفتح حساب بالعملة التي تنوي التداول بها لتجنب هذه الرسوم.
                </p>
              </div>
            </section>

            {/* Trading Conditions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">ظروف التداول</h2>
              
              <div className="prose prose-lg max-w-none space-y-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  تقدم شركة {broker.nameAr} ظروف تداول تنافسية مصممة لتلبية احتياجات المتداولين من جميع المستويات. 
                  إليك تفصيل شامل لظروف التداول:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-blue-900">المواصفات العامة</h3>
                    
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">متطلبات الحساب</h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">الحد الأدنى للإيداع:</span>
                        <span className="text-blue-600 font-bold">${broker.minDeposit}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">أقل حجم صفقة:</span>
                        <span className="text-green-600 font-bold">0.01 لوت</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">الرافعة المالية:</span>
                        <span className="text-purple-600 font-bold">حتى 1:500</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">طريقة التنفيذ:</span>
                        <span className="text-orange-600 font-bold">تنفيذ فوري</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-green-900">الأدوات المالية المتاحة</h3>
                    
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">تنوع الأسواق</h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">أزواج العملات:</span>
                        <span className="text-blue-600 font-bold">50+ زوج</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">المؤشرات:</span>
                        <span className="text-green-600 font-bold">20+ مؤشر</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">السلع:</span>
                        <span className="text-yellow-600 font-bold">الذهب، الفضة، النفط</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">العملات الرقمية:</span>
                        <span className="text-purple-600 font-bold">Bitcoin، Ethereum</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-purple-900">المزايا التنافسية</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-800 mb-3">التنفيذ والسرعة</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        تنفيذ الأوامر في أقل من 100 ميلي ثانية مع عدم وجود إعادة تسعير في الظروف العادية. 
                        هذا يضمن حصولك على الأسعار التي تراها على الشاشة.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-green-800 mb-3">الشفافية</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        لا توجد رسوم خفية أو تلاعب بالأسعار. جميع التكاليف واضحة ومعلنة مسبقاً، 
                        مما يساعدك على حساب أرباحك وخسائرك بدقة.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-purple-800 mb-3">حماية الرصيد السالب</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        حماية تلقائية من الخسائر التي تتجاوز رصيد الحساب، مما يعني أنك لن تخسر 
                        أكثر من المبلغ الذي أودعته في حسابك.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-orange-800 mb-3">الدعم المتواصل</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        دعم فني وعملاء متاح على مدار الساعة طوال أيام الأسبوع باللغة العربية، 
                        مع فريق متخصص لحل جميع استفساراتك ومشاكلك التقنية.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Rating Breakdown */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">تفصيل التقييمات</h3>
              
              <div className="space-y-4 mb-6">
                {Object.entries(ratingDistribution).reverse().map(([stars, percentage]) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-8 font-medium">{stars} ⭐</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10 font-medium">{percentage}%</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl font-bold text-gray-900 mb-2">{broker.rating}</div>
                <div className="text-gray-600 mb-2">من 5 نجوم</div>
                <div className="text-sm text-gray-500">
                  بناءً على {broker.reviewCount.toLocaleString()} تقييم
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Globe size={20} />
                    الموقع الإلكتروني
                  </h4>
                  <a href={broker.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline text-lg">
                    {broker.website.replace('https://', '')}
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Phone size={20} />
                    رقم الهاتف
                  </h4>
                  <p className="font-medium text-lg">{broker.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    <Mail size={20} />
                    البريد الإلكتروني
                  </h4>
                  <p className="font-medium text-lg">{broker.email}</p>
                </div>
              </div>
            </section>

            {/* Safety Notice */}
            <section className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <Warning size={24} />
                تحذير مهم للمتداولين
              </h3>
              <p className="text-orange-800 leading-relaxed">
                CFDs هي أدوات معقدة وتحمل مخاطر عالية لفقدان الأموال بسرعة بسبب الرافعة المالية. 
                يجب أن تفكر فيما إذا كنت تفهم كيفية عمل CFDs وما إذا كان بإمكانك تحمل المخاطر العالية لفقدان أموالك.
              </p>
            </section>
          </div>
        </div>

        {/* Educational Content */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">كيفية البدء في التداول مع شركة {broker.nameAr}</h2>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              إذا كنت مهتماً بالبدء في التداول مع شركة {broker.nameAr}، إليك دليل مفصل للخطوات المطلوبة:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">الخطوات الأساسية للبدء</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">1</span>
                      فتح الحساب
                    </h4>
                    <p className="text-gray-700 leading-relaxed mr-11">
                      املأ نموذج التسجيل الإلكتروني على الموقع الرسمي للشركة. ستحتاج إلى تقديم معلومات أساسية 
                      مثل الاسم وتاريخ الميلاد ومعلومات الاتصال.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">2</span>
                      التحقق من الهوية
                    </h4>
                    <p className="text-gray-700 leading-relaxed mr-11">
                      رفع الوثائق المطلوبة (هوية وطنية أو جواز سفر، إثبات عنوان). هذه خطوة ضرورية 
                      للامتثال للوائح مكافحة غسل الأموال.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">3</span>
                      الإيداع الأول
                    </h4>
                    <p className="text-gray-700 leading-relaxed mr-11">
                      قم بإيداع ${broker.minDeposit} كحد أدنى باستخدام إحدى طرق الدفع المتاحة. 
                      معظم الطرق فورية ومجانية.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">4</span>
                      البدء في التداول
                    </h4>
                    <p className="text-gray-700 leading-relaxed mr-11">
                      حمل منصة التداول المفضلة لديك وابدأ التداول. يُنصح بالبدء بحساب تجريبي أولاً.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-green-900">نصائح للمبتدئين</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">ابدأ بحساب تجريبي</h4>
                    <p className="text-gray-700 leading-relaxed">
                      تدرب على الأدوات والاستراتيجيات بدون مخاطر مالية. هذا يساعدك على فهم 
                      المنصة وتطوير مهاراتك.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">تعلم إدارة المخاطر</h4>
                    <p className="text-gray-700 leading-relaxed">
                      لا تستثمر أكثر مما يمكنك تحمل خسارته. استخدم أوامر وقف الخسارة 
                      وحدد نسبة مئوية معقولة من رأس المال لكل صفقة.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">استخدم الموارد التعليمية</h4>
                    <p className="text-gray-700 leading-relaxed">
                      استفد من الندوات والتحليلات المجانية التي تقدمها الشركة. 
                      التعليم المستمر هو مفتاح النجاح في التداول.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-2">ابدأ بصفقات صغيرة</h4>
                    <p className="text-gray-700 leading-relaxed">
                      تدرج في زيادة أحجام الصفقات كلما اكتسبت المزيد من الخبرة والثقة. 
                      الصبر والانضباط أهم من السرعة في تحقيق الأرباح.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison with Competitors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">مقارنة شركة {broker.nameAr} مع المنافسين</h2>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              عند اختيار وسيط التداول، من المهم مقارنة الخيارات المتاحة. إليك مقارنة شركة {broker.nameAr} مع أهم المنافسين في السوق:
            </p>
            
            <h3 className="text-2xl font-semibold mb-6 text-blue-900">مقارنة المؤشرات الرئيسية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-green-800">أداء شركة {broker.nameAr}</h4>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                    <div className="font-semibold text-green-900">التقييم العام</div>
                    <div className="text-2xl font-bold text-green-700">{broker.rating}/5</div>
                    <div className="text-green-600 text-sm">أعلى من متوسط السوق (4.1/5)</div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                    <div className="font-semibold text-blue-900">الحد الأدنى للإيداع</div>
                    <div className="text-2xl font-bold text-blue-700">${broker.minDeposit}</div>
                    <div className="text-blue-600 text-sm">أقل من المتوسط ($250)</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                    <div className="font-semibold text-purple-900">الفروقات</div>
                    <div className="text-2xl font-bold text-purple-700">{broker.spreads}</div>
                    <div className="text-purple-600 text-sm">تنافسية مقابل (1.5+ نقطة)</div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                    <div className="font-semibold text-orange-900">التراخيص</div>
                    <div className="text-2xl font-bold text-orange-700">{broker.regulation.length}</div>
                    <div className="text-orange-600 text-sm">أكثر من المتوسط (2 تراخيص)</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-800">المزايا التنافسية</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">الحسابات الإسلامية</h5>
                    <p className="text-gray-700 leading-relaxed">
                      بينما تقدم معظم الشركات حسابات إسلامية محدودة، توفر {broker.nameAr} 
                      دعماً شاملاً ومتخصصاً للحسابات المتوافقة مع الشريعة.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">الدعم باللغة العربية</h5>
                    <p className="text-gray-700 leading-relaxed">
                      دعم فني شامل باللغة العربية على مدار الساعة، مما يميزها عن 
                      العديد من المنافسين الذين يقدمون دعماً محدوداً بالعربية.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-purple-700 mb-2">التنوع في المنصات</h5>
                    <p className="text-gray-700 leading-relaxed">
                      تقدم {broker.platforms.length} منصات تداول مختلفة، مما يوفر مرونة 
                      أكبر للمتداولين مقارنة بالشركات التي تقتصر على منصة أو منصتين.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="text-xl font-semibold text-green-900 mb-4">نقاط القوة الرئيسية</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    تقييم أعلى من المتوسط ({broker.rating}/5)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    حد أدنى منخفض للإيداع (${broker.minDeposit})
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    تراخيص متعددة ومعترف بها دولياً
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    دعم شامل للحسابات الإسلامية
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    فروقات تنافسية ومنخفضة
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">مجالات التطوير المستقبلي</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center gap-2">
                    <TrendUp size={16} className="text-blue-600" />
                    توسيع نطاق الأدوات المالية المتاحة
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendUp size={16} className="text-blue-600" />
                    تحسين أدوات التحليل الفني المتقدمة
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendUp size={16} className="text-blue-600" />
                    زيادة المحتوى التعليمي باللغة العربية
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendUp size={16} className="text-blue-600" />
                    تطوير التطبيق المحمول وإضافة ميزات جديدة
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendUp size={16} className="text-blue-600" />
                    إدخال أدوات التداول الاجتماعي والنسخ
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">تحليل السوق وتوقعات المستقبل</h2>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              في ظل التطورات المستمرة في الأسواق المالية السعودية والعالمية، تواصل شركة {broker.nameAr} 
              تطوير خدماتها لتواكب احتياجات المتداولين المتغيرة.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">اتجاهات السوق 2024</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">نمو التداول الرقمي</h4>
                    <p className="text-gray-700 leading-relaxed">
                      يشهد السوق السعودي نمواً متسارعاً في الاعتماد على المنصات الرقمية والتطبيقات المحمولة للتداول. 
                      هذا التوجه يدفع الشركات لتطوير تقنيات أكثر تطوراً وسهولة في الاستخدام.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-3">الذكاء الاصطناعي في التداول</h4>
                    <p className="text-gray-700 leading-relaxed">
                      دمج تقنيات الذكاء الاصطناعي والتعلم الآلي في التحليل والتوصيات أصبح أولوية قصوى. 
                      هذه التقنيات تساعد المتداولين في اتخاذ قرارات أكثر دقة وسرعة.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">التداول الاجتماعي</h4>
                    <p className="text-gray-700 leading-relaxed">
                      نمو كبير في منصات النسخ التلقائي والتداول الاجتماعي، حيث يمكن للمتداولين المبتدئين 
                      نسخ استراتيجيات المتداولين المحترفين تلقائياً.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-green-900">رؤية السعودية 2030 والتأثير على التداول</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">تطوير السوق المالية</h4>
                    <p className="text-gray-700 leading-relaxed">
                      مبادرات حكومية شاملة لتطوير البنية التحتية المالية وتسهيل الاستثمار. 
                      هذا يخلق فرصاً جديدة للوسطاء لتوسيع خدماتهم وتحسين جودتها.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-red-800 mb-3">تنويع الاقتصاد</h4>
                    <p className="text-gray-700 leading-relaxed">
                      فرص استثمار جديدة في القطاعات المختلفة مثل التقنية والسياحة والطاقة المتجددة. 
                      هذا التنويع يفتح أسواقاً جديدة للمتداولين السعوديين.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">التحول الرقمي</h4>
                    <p className="text-gray-700 leading-relaxed">
                      دعم الابتكار والتقنيات المالية الحديثة (FinTech) يسرع من تطوير حلول تداول 
                      أكثر تطوراً وأماناً للمستثمرين السعوديين.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">التوقعات المستقبلية لشركة {broker.nameAr}</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">خطط التوسع والتطوير</h4>
                <p className="text-blue-800 leading-relaxed mb-4">
                  تسعى شركة {broker.nameAr} لتعزيز مكانتها في السوق السعودي من خلال تطوير منصات جديدة، 
                  إضافة أدوات تحليل متقدمة، وتوسيع نطاق الأدوات المالية المتاحة للتداول.
                </p>
                <p className="text-blue-800 leading-relaxed">
                  كما تركز الشركة على تحسين تجربة المستخدم وزيادة المحتوى التعليمي باللغة العربية 
                  لتلبية احتياجات السوق السعودي المتنامي.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security and Safety */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Shield className="text-green-600" size={32} />
            الأمان وحماية الأموال
          </h2>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              تأخذ شركة {broker.nameAr} أمان وحماية أموال العملاء على محمل الجد، وتطبق أعلى معايير الحماية المالية والتقنية:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-green-900">الحماية المالية</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      فصل أموال العملاء
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      أموال العملاء منفصلة تماماً عن أموال الشركة ومحفوظة في بنوك من الدرجة الأولى. 
                      هذا يضمن عدم استخدام أموالك في أي أنشطة تجارية للشركة.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      التأمين على الودائع
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      حماية إضافية للودائع من خلال صناديق تعويض المستثمرين التي تغطي حسابات العملاء 
                      في حالات استثنائية نادرة.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      حماية الرصيد السالب
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      ضمان مطلق بعدم خسارة أكثر من رصيد الحساب، مما يحميك من المديونية 
                      حتى في ظروف السوق المتقلبة.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">الأمان التقني</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      تشفير SSL 256-bit
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      حماية جميع البيانات المنقولة بين المتصفح والخادم بأعلى مستوى تشفير متاح، 
                      مما يضمن عدم اعتراض أو تعديل معلوماتك الشخصية والمالية.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      المصادقة الثنائية
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      طبقة حماية إضافية لتسجيل الدخول تتطلب رمز تأكيد من هاتفك المحمول، 
                      مما يمنع الوصول غير المصرح به حتى لو تم اختراق كلمة المرور.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      مراقبة الأنشطة
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      مراقبة مستمرة على مدار الساعة للأنشطة المشبوهة والحماية من محاولات الاختراق 
                      باستخدام أحدث تقنيات الأمان السيبراني.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">شهادات الأمان والاعتماد</h3>
              <p className="text-green-800 leading-relaxed">
                حاصلة على شهادات أمان دولية من جهات مستقلة تؤكد التزام الشركة بأعلى معايير الحماية والأمان المالي. 
                هذه الشهادات تخضع للمراجعة الدورية لضمان استمرارية معايير الأمان.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            خدمة العملاء والدعم الفني
          </h2>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              تقدم شركة {broker.nameAr} خدمة عملاء متميزة باللغة العربية مع فريق متخصص لمساعدة المتداولين السعوديين:
            </p>
            
            <h3 className="text-2xl font-semibold mb-6 text-blue-900">مستوى الخدمة والتوفر</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-blue-900 mb-2">24/7</h4>
                  <p className="text-blue-700">دعم على مدار الساعة طوال أيام الأسبوع</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-900 mb-2">هاتف مباشر</h4>
                  <p className="text-green-700">خط ساخن مخصص للعملاء السعوديين</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-purple-900 mb-2">دردشة مباشرة</h4>
                  <p className="text-purple-700">استجابة فورية عبر الموقع الإلكتروني</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-green-900">قنوات التواصل المتاحة</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Phone size={20} />
                      الدعم الهاتفي
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <strong>الرقم:</strong> {broker.phone}
                    </p>
                    <p className="text-gray-600">
                      فريق دعم متخصص باللغة العربية متاح للرد على جميع استفساراتك ومساعدتك في حل أي مشاكل تقنية.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Mail size={20} />
                      البريد الإلكتروني
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <strong>العنوان:</strong> {broker.email}
                    </p>
                    <p className="text-gray-600">
                      للاستفسارات المفصلة والطلبات التي تحتاج توثيق، مع ضمان الرد خلال 24 ساعة.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <Globe size={20} />
                      الدردشة المباشرة
                    </h4>
                    <p className="text-gray-600">
                      متاحة على الموقع الإلكتروني مع إمكانية التواصل الفوري مع ممثلي خدمة العملاء 
                      لحل المشاكل العاجلة.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-orange-900">مزايا خدمة العملاء</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">الدعم المتخصص</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">دعم باللغة العربية من متخصصين محليين</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">استجابة سريعة خلال دقائق معدودة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">مساعدة شاملة في جميع الاستفسارات التقنية</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">نطاق الدعم</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">حل مشاكل التداول والمنصات</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">مساعدة في فتح وإدارة الحسابات</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">دعم في عمليات الإيداع والسحب</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-gray-700">إرشادات حول استخدام الأدوات والميزات</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">التزامنا بخدمة العملاء</h3>
              <p className="text-blue-800 leading-relaxed">
                نحن في شركة {broker.nameAr} نؤمن بأن خدمة العملاء الممتازة هي أساس النجاح. لذلك نستثمر باستمرار 
                في تدريب فريق الدعم وتطوير قنوات التواصل لضمان حصولك على أفضل تجربة ممكنة.
              </p>
            </div>
          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-12">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">الحكم النهائي على شركة {broker.nameAr}</h2>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <div className="flex items-center justify-center gap-8 p-8 bg-white rounded-xl shadow-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-3">{broker.rating}</div>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        weight={i < Math.floor(broker.rating) ? "fill" : "regular"}
                        className={`w-7 h-7 ${i < Math.floor(broker.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">التقييم الإجمالي</div>
                </div>
                <div className="text-center px-8 border-r border-gray-200">
                  <div className="text-3xl font-bold text-green-600 mb-3">ممتاز</div>
                  <div className="text-gray-600">التصنيف العام للشركة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-3">{broker.reviewCount.toLocaleString()}</div>
                  <div className="text-gray-600">تقييم عميل حقيقي</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">خلاصة المراجعة الشاملة</h3>
                
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  <strong>النتيجة النهائية:</strong> تعتبر شركة {broker.nameAr} خياراً ممتازاً ومتميزاً للمتداولين السعوديين الباحثين عن 
                  وسيط موثوق ومرخص بمعايير عالمية. تتميز الشركة بـ{broker.descriptionAr.toLowerCase()}، بالإضافة إلى حد أدنى منخفض للإيداع 
                  يبلغ ${broker.minDeposit} فقط وفروقات تنافسية تبدأ من {broker.spreads}.
                </p>
                
                <h4 className="text-xl font-semibold mb-4 text-green-800">النقاط الإيجابية الرئيسية</h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  تشمل أبرز نقاط القوة التراخيص المتعددة من {broker.regulation.join(' و')}، 
                  الدعم الشامل والمتخصص للحسابات الإسلامية، مجموعة متنوعة من المنصات المتقدمة، 
                  وخدمة عملاء ممتازة باللغة العربية على مدار الساعة.
                </p>
                
                <h4 className="text-xl font-semibold mb-4 text-orange-800">التحديات والاعتبارات</h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  أما التحديات فتتمثل في {broker.cons[0]?.toLowerCase() || 'بعض القيود البسيطة التي يمكن التغلب عليها'}. 
                  هذه النقاط لا تؤثر بشكل كبير على الجودة الإجمالية للخدمة المقدمة.
                </p>
                
                <div className="bg-green-100 border-r-4 border-green-500 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-3">توصيتنا النهائية</h4>
                  <p className="text-green-800 leading-relaxed text-lg">
                    <strong>نوصي بقوة</strong> بشركة {broker.nameAr} للمتداولين من جميع المستويات، خاصة أولئك الذين يبحثون عن 
                    وسيط مرخص وموثوق مع دعم ممتاز للسوق السعودي والحسابات الإسلامية. الشركة تقدم قيمة استثنائية 
                    مقابل التكلفة وتلبي احتياجات المتداولين العرب بشكل مثالي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">الأسئلة الشائعة حول شركة {broker.nameAr}</h2>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">هل شركة {broker.nameAr} مرخصة ومنظمة؟</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نعم، شركة {broker.nameAr} مرخصة ومنظمة من قبل عدة جهات تنظيمية مرموقة عالمياً تشمل {broker.regulation.join(', ')}. 
                  هذا يضمن أعلى مستويات الحماية والأمان للعملاء ويؤكد التزام الشركة بالمعايير الدولية للشفافية والأمان المالي.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-green-900">ما هو الحد الأدنى للإيداع؟</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  الحد الأدنى للإيداع مع شركة {broker.nameAr} هو ${broker.minDeposit} فقط، مما يجعلها متاحة للمتداولين المبتدئين 
                  والذين يريدون البدء برأس مال صغير. هذا المبلغ المنخفض يتيح للمتداولين الجدد اختبار الخدمات دون التزام مالي كبير.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-900">هل تقدم الشركة حسابات إسلامية؟</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نعم، تقدم شركة {broker.nameAr} حسابات تداول إسلامية متوافقة تماماً مع أحكام الشريعة الإسلامية، 
                  بدون فوائد ربوية أو رسوم تبييت. هذه الحسابات مصممة خصيصاً للمتداولين المسلمين الذين يرغبون في التداول 
                  وفقاً لمبادئهم الدينية.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-900">ما هي المنصات المتاحة للتداول؟</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  تقدم الشركة عدة منصات تداول متطورة تشمل {broker.platforms.join(', ')}. 
                  جميع هذه المنصات مصممة لتوفير تجربة تداول سلسة ومتقدمة مع أدوات تحليل شاملة وواجهات سهلة الاستخدام. 
                  كل منصة تلبي احتياجات مختلفة للمتداولين حسب مستوى خبرتهم وتفضيلاتهم.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-red-900">كم تستغرق عملية السحب؟</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  عادة ما تتم معالجة طلبات السحب خلال 1-3 أيام عمل، اعتماداً على طريقة السحب المختارة والبنك المستخدم. 
                  الشركة تسعى لمعالجة جميع الطلبات في أسرع وقت ممكن، مع إعطاء أولوية للطلبات العاجلة. 
                  المحافظ الإلكترونية عادة ما تكون أسرع من التحويلات البنكية التقليدية.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-teal-900">هل يمكنني تجربة التداول قبل إيداع الأموال؟</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  بالطبع! توفر شركة {broker.nameAr} حسابات تجريبية مجانية تماماً تحتوي على أموال افتراضية للتدريب. 
                  هذا يتيح لك تعلم كيفية استخدام المنصات واختبار استراتيجيات التداول دون أي مخاطر مالية. 
                  الحساب التجريبي متاح لفترة غير محدودة ويحاكي ظروف السوق الحقيقية تماماً.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك في التداول مع {broker.nameAr}</h2>
          <p className="text-xl mb-6 text-blue-100">
            انضم إلى آلاف المتداولين الذين يثقون في {broker.nameAr} لتحقيق أهدافهم المالية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium"
              asChild
            >
              <a href={broker.website} target="_blank" rel="noopener noreferrer">
                افتح حساب تداول مجاني
                <ArrowRight className="mr-2" size={20} />
              </a>
            </Button>
            <p className="text-sm text-blue-200">
              * تداول العملات والـ CFDs قد يؤدي إلى خسارة رأس المال
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}