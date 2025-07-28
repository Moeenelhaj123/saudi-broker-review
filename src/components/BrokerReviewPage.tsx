import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-blue-600" size={24} />
              معلومات سريعة عن شركة {broker.nameAr}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-1">التراخيص</div>
                <div className="font-semibold">{broker.regulation.join(', ')}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-1">الحد الأدنى</div>
                <div className="font-semibold">${broker.minDeposit}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <TrendUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-1">الفروقات</div>
                <div className="font-semibold">{broker.spreads}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-1">المنصات</div>
                <div className="font-semibold">{broker.platforms.length} منصات</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Review */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* About the Broker */}
            <Card>
              <CardHeader>
                <CardTitle>نبذة تفصيلية عن شركة {broker.nameAr}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">تاريخ وخلفية الشركة</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    شركة {broker.nameAr} ({broker.name}) هي من الشركات الرائدة في مجال الوساطة المالية وتداول العملات الأجنبية. 
                    تأسست الشركة بهدف تقديم خدمات تداول متطورة ومبتكرة للمتداولين حول العالم، وقد نجحت في بناء سمعة قوية 
                    في السوق من خلال التزامها بأعلى معايير الجودة والشفافية.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    تخدم الشركة ملايين العملاء في أكثر من 150 دولة حول العالم، وتقدم مجموعة واسعة من الأدوات المالية 
                    التي تشمل العملات الأجنبية، المؤشرات، السلع، الأسهم، والعملات الرقمية. كما تتميز بتقديم أدوات تداول 
                    متقدمة وتحليلات السوق المتخصصة.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">التراخيص والتنظيم</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    تحمل شركة {broker.nameAr} تراخيص من عدة جهات تنظيمية مرموقة عالمياً، مما يضمن أعلى مستويات 
                    الحماية والأمان للعملاء. الجهات المنظمة تشمل:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {broker.regulation.map((reg, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="font-medium">{reg}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    هذه التراخيص تضمن أن الشركة تلتزم بأعلى معايير الحماية المالية وفصل أموال العملاء، 
                    مما يوفر بيئة تداول آمنة وموثوقة للمتداولين السعوديين.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">المنصات والأدوات</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    توفر شركة {broker.nameAr} مجموعة متنوعة من منصات التداول المتطورة التي تناسب جميع مستويات المتداولين:
                  </p>
                  <div className="space-y-3">
                    {broker.platforms.map((platform, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                        <TrendUp className="text-blue-600" size={24} />
                        <div>
                          <div className="font-medium">{platform}</div>
                          <div className="text-sm text-gray-600">
                            منصة تداول متقدمة مع أدوات تحليل شاملة
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">أنواع الحسابات</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    تقدم الشركة مجموعة متنوعة من أنواع الحسابات لتناسب احتياجات المتداولين المختلفة:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {broker.accountTypes.map((account, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">{account}</div>
                        <div className="text-sm text-gray-600">
                          مناسب للمتداولين من جميع المستويات
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pros and Cons */}
            <Card>
              <CardHeader>
                <CardTitle>المزايا والعيوب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <ThumbsUp size={20} />
                      المزايا
                    </h3>
                    <div className="space-y-3">
                      {broker.pros.map((pro, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-700">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                      <ThumbsDown size={20} />
                      العيوب
                    </h3>
                    <div className="space-y-3">
                      {broker.cons.map((con, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Warning className="text-red-600 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-700">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fees and Costs */}
            <Card>
              <CardHeader>
                <CardTitle>الرسوم والتكاليف</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    فهم هيكل الرسوم أمر بالغ الأهمية عند اختيار وسيط التداول. إليك تفصيل شامل للرسوم والتكاليف 
                    المرتبطة بالتداول مع شركة {broker.nameAr}:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-900 mb-2">رسوم العمولة</div>
                      <div className="text-2xl font-bold text-blue-700">{broker.fees.commission}</div>
                      <div className="text-sm text-blue-600 mt-1">لكل صفقة</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-900 mb-2">رسوم السحب</div>
                      <div className="text-2xl font-bold text-green-700">{broker.fees.withdrawal}</div>
                      <div className="text-sm text-green-600 mt-1">عملية سحب</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-orange-900 mb-2">رسوم عدم النشاط</div>
                      <div className="text-2xl font-bold text-orange-700">{broker.fees.inactivity}</div>
                      <div className="text-sm text-orange-600 mt-1">بعد فترة عدم نشاط</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">تفاصيل إضافية حول الرسوم:</h3>
                    <div className="prose prose-gray max-w-none">
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>الفروقات:</strong> تبدأ من {broker.spreads} للأزواج الرئيسية</li>
                        <li>• <strong>رسوم التبييت:</strong> تطبق على الصفقات المفتوحة بين عشية وضحاها</li>
                        <li>• <strong>رسوم التحويل:</strong> قد تختلف حسب طريقة الدفع المختارة</li>
                        <li>• <strong>رسوم تحويل العملة:</strong> تطبق عند التداول بعملة مختلفة عن عملة الحساب</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>ظروف التداول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    تقدم شركة {broker.nameAr} ظروف تداول تنافسية مصممة لتلبية احتياجات المتداولين من جميع المستويات. 
                    إليك تفصيل شامل لظروف التداول:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">المواصفات العامة</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحد الأدنى للإيداع:</span>
                          <span className="font-semibold">${broker.minDeposit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">أقل حجم صفقة:</span>
                          <span className="font-semibold">0.01 لوت</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الرافعة المالية:</span>
                          <span className="font-semibold">حتى 1:500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">طريقة التنفيذ:</span>
                          <span className="font-semibold">تنفيذ فوري</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">الأدوات المتاحة</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">أزواج العملات:</span>
                          <span className="font-semibold">50+ زوج</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المؤشرات:</span>
                          <span className="font-semibold">20+ مؤشر</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">السلع:</span>
                          <span className="font-semibold">الذهب، الفضة، النفط</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">العملات الرقمية:</span>
                          <span className="font-semibold">Bitcoin، Ethereum</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">مزايا ظروف التداول:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">تنفيذ سريع</h4>
                        <p className="text-blue-800 text-sm">تنفيذ الأوامر في أقل من 100 ميلي ثانية</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">شفافية كاملة</h4>
                        <p className="text-green-800 text-sm">لا توجد رسوم خفية أو تلاعب بالأسعار</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">حماية الرصيد السالب</h4>
                        <p className="text-purple-800 text-sm">حماية من الخسائر التي تتجاوز رصيد الحساب</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2">دعم 24/7</h4>
                        <p className="text-orange-800 text-sm">دعم فني متاح على مدار الساعة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Rating Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>تفصيل التقييمات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(ratingDistribution).reverse().map(([stars, percentage]) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-8">{stars} ⭐</span>
                    <Progress value={percentage} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-10">{percentage}%</span>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{broker.rating}</div>
                    <div className="text-sm text-gray-600">من 5 نجوم</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {broker.reviewCount.toLocaleString()} تقييم
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="text-blue-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">الموقع الإلكتروني</div>
                    <a href={broker.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      {broker.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-green-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">رقم الهاتف</div>
                    <div className="font-medium">{broker.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-orange-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">البريد الإلكتروني</div>
                    <div className="font-medium">{broker.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <Warning size={20} />
                  تحذير مهم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800 text-sm leading-relaxed">
                  CFDs هي أدوات معقدة وتحمل مخاطر عالية لفقدان الأموال بسرعة بسبب الرافعة المالية. 
                  يجب أن تفكر فيما إذا كنت تفهم كيفية عمل CFDs وما إذا كان بإمكانك تحمل المخاطر العالية لفقدان أموالك.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <Card>
          <CardHeader>
            <CardTitle>كيفية البدء في التداول مع شركة {broker.nameAr}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                إذا كنت مهتماً بالبدء في التداول مع شركة {broker.nameAr}، إليك دليل مفصل للخطوات المطلوبة:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">الخطوات الأساسية:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-1">1</div>
                      <div>
                        <div className="font-medium">فتح الحساب</div>
                        <div className="text-sm text-gray-600">املأ نموذج التسجيل الإلكتروني</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-1">2</div>
                      <div>
                        <div className="font-medium">التحقق من الهوية</div>
                        <div className="text-sm text-gray-600">رفع الوثائق المطلوبة (هوية، إثبات عنوان)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-1">3</div>
                      <div>
                        <div className="font-medium">الإيداع الأول</div>
                        <div className="text-sm text-gray-600">إيداع ${broker.minDeposit} كحد أدنى</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-1">4</div>
                      <div>
                        <div className="font-medium">البدء في التداول</div>
                        <div className="text-sm text-gray-600">تحميل المنصة والبدء في التداول</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">نصائح للمبتدئين:</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <strong>ابدأ بحساب تجريبي:</strong> تدرب على الأدوات والاستراتيجيات بدون مخاطر
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <strong>تعلم إدارة المخاطر:</strong> لا تستثمر أكثر مما يمكنك تحمل خسارته
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <strong>استخدم الموارد التعليمية:</strong> استفد من الندوات والتحليلات المجانية
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <strong>ابدأ بصفقات صغيرة:</strong> تدرج في زيادة أحجام الصفقات
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison with Competitors */}
        <Card>
          <CardHeader>
            <CardTitle>مقارنة شركة {broker.nameAr} مع المنافسين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                عند اختيار وسيط التداول، من المهم مقارنة الخيارات المتاحة. إليك مقارنة شركة {broker.nameAr} مع أهم المنافسين في السوق:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-3 text-right">المقارنة</th>
                      <th className="border border-gray-200 p-3 text-center font-bold text-blue-600">{broker.nameAr}</th>
                      <th className="border border-gray-200 p-3 text-center">المتوسط في السوق</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 p-3 font-medium">التقييم</td>
                      <td className="border border-gray-200 p-3 text-center font-bold text-green-600">{broker.rating}/5</td>
                      <td className="border border-gray-200 p-3 text-center">4.1/5</td>
                    </tr>
                    <tr className="bg-gray-25">
                      <td className="border border-gray-200 p-3 font-medium">الحد الأدنى للإيداع</td>
                      <td className="border border-gray-200 p-3 text-center font-bold text-green-600">${broker.minDeposit}</td>
                      <td className="border border-gray-200 p-3 text-center">$250</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3 font-medium">الفروقات</td>
                      <td className="border border-gray-200 p-3 text-center font-bold text-green-600">{broker.spreads}</td>
                      <td className="border border-gray-200 p-3 text-center">من 1.5 نقطة</td>
                    </tr>
                    <tr className="bg-gray-25">
                      <td className="border border-gray-200 p-3 font-medium">عدد التراخيص</td>
                      <td className="border border-gray-200 p-3 text-center font-bold text-green-600">{broker.regulation.length}</td>
                      <td className="border border-gray-200 p-3 text-center">2</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3 font-medium">الحساب الإسلامي</td>
                      <td className="border border-gray-200 p-3 text-center font-bold text-green-600">✓ متوفر</td>
                      <td className="border border-gray-200 p-3 text-center">محدود</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">نقاط القوة</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• تقييم أعلى من المتوسط ({broker.rating}/5)</li>
                    <li>• حد أدنى منخفض للإيداع (${broker.minDeposit})</li>
                    <li>• تراخيص متعددة ومعترف بها دولياً</li>
                    <li>• دعم شامل للحسابات الإسلامية</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">مجالات التطوير</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• توسيع نطاق الأدوات المالية</li>
                    <li>• تحسين أدوات التحليل الفني</li>
                    <li>• زيادة المحتوى التعليمي باللغة العربية</li>
                    <li>• تطوير التطبيق المحمول</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>تحليل السوق وتوقعات المستقبل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                في ظل التطورات المستمرة في الأسواق المالية السعودية والعالمية، تواصل شركة {broker.nameAr} 
                تطوير خدماتها لتواكب احتياجات المتداولين المتغيرة.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">اتجاهات السوق 2024</h3>
                  <div className="space-y-3">
                    <div className="p-3 border-r-4 border-blue-500 bg-blue-50">
                      <div className="font-medium text-blue-900">نمو التداول الرقمي</div>
                      <div className="text-sm text-blue-700">زيادة الاعتماد على المنصات الرقمية والتطبيقات المحمولة</div>
                    </div>
                    <div className="p-3 border-r-4 border-green-500 bg-green-50">
                      <div className="font-medium text-green-900">الذكاء الاصطناعي</div>
                      <div className="text-sm text-green-700">دمج تقنيات AI في التحليل والتوصيات</div>
                    </div>
                    <div className="p-3 border-r-4 border-purple-500 bg-purple-50">
                      <div className="font-medium text-purple-900">التداول الاجتماعي</div>
                      <div className="text-sm text-purple-700">نمو منصات النسخ التلقائي والتداول الاجتماعي</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">رؤية السعودية 2030</h3>
                  <div className="space-y-3">
                    <div className="p-3 border-r-4 border-orange-500 bg-orange-50">
                      <div className="font-medium text-orange-900">تطوير السوق المالية</div>
                      <div className="text-sm text-orange-700">مبادرات لتطوير البنية التحتية المالية</div>
                    </div>
                    <div className="p-3 border-r-4 border-red-500 bg-red-50">
                      <div className="font-medium text-red-900">تنويع الاقتصاد</div>
                      <div className="text-sm text-red-700">فرص استثمار جديدة في القطاعات المختلفة</div>
                    </div>
                    <div className="p-3 border-r-4 border-teal-500 bg-teal-50">
                      <div className="font-medium text-teal-900">التحول الرقمي</div>
                      <div className="text-sm text-teal-700">دعم الابتكار والتقنيات المالية الحديثة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security and Safety */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-green-600" size={24} />
              الأمان وحماية الأموال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                تأخذ شركة {broker.nameAr} أمان وحماية أموال العملاء على محمل الجد، وتطبق أعلى معايير الحماية المالية والتقنية:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">الحماية المالية</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <div className="font-medium">فصل أموال العملاء</div>
                        <div className="text-sm text-gray-600">أموال العملاء منفصلة عن أموال الشركة في بنوك من الدرجة الأولى</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <div className="font-medium">التأمين على الودائع</div>
                        <div className="text-sm text-gray-600">حماية إضافية للودائع من خلال صناديق تعويض المستثمرين</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <div className="font-medium">حماية الرصيد السالب</div>
                        <div className="text-sm text-gray-600">ضمان عدم خسارة أكثر من رصيد الحساب</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">الأمان التقني</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <div className="font-medium">تشفير SSL 256-bit</div>
                        <div className="text-sm text-gray-600">حماية جميع البيانات المنقولة بأعلى مستوى تشفير</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <div className="font-medium">المصادقة الثنائية</div>
                        <div className="text-sm text-gray-600">طبقة حماية إضافية لتسجيل الدخول</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <div className="font-medium">مراقبة الأنشطة</div>
                        <div className="text-sm text-gray-600">مراقبة مستمرة للأنشطة المشبوهة والحماية من الاختراقات</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">شهادات الأمان</h4>
                <p className="text-green-800 text-sm">
                  حاصلة على شهادات أمان دولية من جهات مستقلة تؤكد التزام الشركة بأعلى معايير الحماية والأمان المالي.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-blue-600" size={24} />
              خدمة العملاء والدعم الفني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                تقدم شركة {broker.nameAr} خدمة عملاء متميزة باللغة العربية مع فريق متخصص لمساعدة المتداولين السعوديين:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-900">24/7</div>
                  <div className="text-sm text-blue-700">دعم على مدار الساعة</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-green-900">هاتف مباشر</div>
                  <div className="text-sm text-green-700">خط ساخن مخصص</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-purple-900">دردشة مباشرة</div>
                  <div className="text-sm text-purple-700">استجابة فورية</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">قنوات التواصل</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Phone className="text-green-600" size={20} />
                      <div>
                        <div className="font-medium">الهاتف</div>
                        <div className="text-sm text-gray-600">{broker.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <div className="font-medium">البريد الإلكتروني</div>
                        <div className="text-sm text-gray-600">{broker.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Globe className="text-purple-600" size={20} />
                      <div>
                        <div className="font-medium">الموقع الإلكتروني</div>
                        <div className="text-sm text-gray-600">نموذج اتصال متاح</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">مزايا خدمة العملاء</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm">دعم باللغة العربية من متخصصين</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm">استجابة سريعة خلال دقائق</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm">مساعدة في جميع الاستفسارات التقنية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm">دعم في حل مشاكل التداول</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm">مساعدة في فتح وإدارة الحسابات</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Verdict */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900 text-xl">الحكم النهائي على شركة {broker.nameAr}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 p-6 bg-white rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{broker.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        weight={i < Math.floor(broker.rating) ? "fill" : "regular"}
                        className={`w-6 h-6 ${i < Math.floor(broker.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">التقييم الإجمالي</div>
                </div>
                <div className="text-center px-6 border-r border-gray-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">ممتاز</div>
                  <div className="text-sm text-gray-600">التصنيف العام</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{broker.reviewCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">تقييم عميل</div>
                </div>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <strong>خلاصة المراجعة:</strong> تعتبر شركة {broker.nameAr} خياراً ممتازاً للمتداولين السعوديين الباحثين عن 
                  وسيط موثوق ومرخص. تتميز الشركة بـ{broker.descriptionAr.toLowerCase()}، بالإضافة إلى حد أدنى منخفض للإيداع 
                  يبلغ ${broker.minDeposit} فقط وفروقات تنافسية تبدأ من {broker.spreads}.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  النقاط الإيجابية الرئيسية تشمل التراخيص المتعددة من {broker.regulation.join(' و')}، 
                  الدعم الشامل للحسابات الإسلامية، ومجموعة متنوعة من المنصات المتقدمة. 
                  أما التحديات فتتمثل في {broker.cons[0]?.toLowerCase() || 'بعض القيود البسيطة'}.
                </p>
                
                <div className="bg-green-100 border-r-4 border-green-500 p-4 my-4">
                  <p className="text-green-800 font-medium">
                    <strong>التوصية:</strong> نوصي بشركة {broker.nameAr} للمتداولين من جميع المستويات، خاصة أولئك الذين يبحثون عن 
                    وسيط مرخص وموثوق مع دعم ممتاز للسوق السعودي والحسابات الإسلامية.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>الأسئلة الشائعة حول شركة {broker.nameAr}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">هل شركة {broker.nameAr} مرخصة ومنظمة؟</h3>
                <p className="text-gray-700 leading-relaxed">
                  نعم، شركة {broker.nameAr} مرخصة ومنظمة من قبل عدة جهات تنظيمية مرموقة عالمياً تشمل {broker.regulation.join(', ')}. 
                  هذا يضمن أعلى مستويات الحماية والأمان للعملاء.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">ما هو الحد الأدنى للإيداع؟</h3>
                <p className="text-gray-700 leading-relaxed">
                  الحد الأدنى للإيداع مع شركة {broker.nameAr} هو ${broker.minDeposit} فقط، مما يجعلها متاحة للمتداولين المبتدئين 
                  والذين يريدون البدء برأس مال صغير.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">هل تقدم الشركة حسابات إسلامية؟</h3>
                <p className="text-gray-700 leading-relaxed">
                  نعم، تقدم شركة {broker.nameAr} حسابات تداول إسلامية متوافقة مع أحكام الشريعة الإسلامية، 
                  بدون فوائد ربوية أو رسوم تبييت.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">ما هي المنصات المتاحة للتداول؟</h3>
                <p className="text-gray-700 leading-relaxed">
                  تقدم الشركة عدة منصات تداول متطورة تشمل {broker.platforms.join(', ')}، 
                  جميعها مصممة لتوفير تجربة تداول سلسة ومتقدمة.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">كم تستغرق عملية السحب؟</h3>
                <p className="text-gray-700 leading-relaxed">
                  عادة ما تتم معالجة طلبات السحب خلال 1-3 أيام عمل، اعتماداً على طريقة السحب المختارة. 
                  الشركة تسعى لمعالجة جميع الطلبات في أسرع وقت ممكن.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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