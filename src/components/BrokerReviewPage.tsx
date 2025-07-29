import { useParams, Link } from "react-router-dom";
import { useKV } from "@github/spark/hooks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle, ArrowRight, User, ThumbsUp, Plus, X, Settings, Heart } from "@phosphor-icons/react";
import { brokers, reviews } from "@/lib/data";
import { brokerLogos } from "@/lib/logos";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  
  // Get admin-managed brokers and recommended brokers
  const [adminBrokers] = useKV("admin-brokers", []);
  const [rawBrokerContent] = useKV(`broker-content-${brokerId}`, {});
  const [bestBrokers, setBestBrokers] = useKV("admin-best-brokers", []);
  
  // Get current user to check if admin
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    // Check if user is admin
    const checkUser = async () => {
      try {
        const user = await spark.user();
        setCurrentUser(user);
      } catch (error) {
        console.log('User not authenticated');
      }
    };
    checkUser();
  }, []);
  
  // Map admin content to expected format for the review page
  const brokerContent = rawBrokerContent ? {
    companyOverview: rawBrokerContent.overview,
    regulation: rawBrokerContent.regulation,
    tradingPlatforms: rawBrokerContent.tradingPlatforms,
    accountTypes: rawBrokerContent.accountTypes,
    fees: rawBrokerContent.fees,
    pros: rawBrokerContent.pros,
    cons: rawBrokerContent.cons,
    conclusion: rawBrokerContent.conclusion,
    contact: rawBrokerContent.contact,
    summary: rawBrokerContent.summary,
    customSections: rawBrokerContent.customSections
  } : {};
  
  // Use admin broker if available, otherwise fallback to static data
  const broker = adminBrokers.find((b: any) => b.id === brokerId) || brokers.find(b => b.id === brokerId);
  
  // State for comment form
  const [commentForm, setCommentForm] = useState({
    name: '',
    comment: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Contact messages for admin
  const [contactMessages, setContactMessages] = useKV("admin-contact-messages", []);

  // Check if broker is already in recommended list
  const isInRecommended = bestBrokers.some((b: any) => b.id === brokerId);
  
  // Function to add/remove broker from recommended list
  const toggleRecommended = () => {
    if (isInRecommended) {
      // Remove from recommended
      setBestBrokers((current: any[]) => 
        current.filter(b => b.id !== brokerId)
      );
      toast.success(`تم إزالة ${broker.nameAr} من قائمة الوسطاء الموصى بهم`);
    } else {
      // Add to recommended
      const newRecommendedBroker = {
        id: broker.id,
        name: broker.name,
        enabled: true
      };
      setBestBrokers((current: any[]) => [...current, newRecommendedBroker]);
      toast.success(`تم إضافة ${broker.nameAr} إلى قائمة الوسطاء الموصى بهم`);
    }
  };

  // Get reviews for this broker
  const brokerReviews = reviews.filter(review => review.brokerId === brokerId);

  // Update document title for SEO
  useEffect(() => {
    if (broker) {
      // Use admin-managed SEO content if available
      const title = brokerContent?.metaTitle || `مراجعة شركة ${broker.nameAr} ${broker.name} - تقييم شامل وآراء المتداولين`;
      const description = brokerContent?.metaDescription || `مراجعة شاملة لشركة ${broker.nameAr} ${broker.name} - تقييم ${broker.rating}/5 من ${broker.reviewCount} متداول سعودي.`;
      
      document.title = title;
      
      // Add meta description for SEO
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
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
          "description": brokerContent?.companyOverview || broker.descriptionAr,
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
        "headline": title,
        "reviewBody": brokerContent?.companyOverview || `مراجعة شاملة لشركة ${broker.nameAr} تشمل التراخيص والتنظيم من ${broker.regulation && Array.isArray(broker.regulation) ? broker.regulation.join(', ') : 'مؤسسات مالية مرخصة'}، الحد الأدنى للإيداع ${broker.minDeposit} دولار، وفروقات تبدأ من ${broker.spreads}.`
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
  }, [broker, brokerContent]);

  if (!broker) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">الوسيط غير موجود</h1>
            <p className="text-gray-600 mb-4">عذراً، لم نتمكن من العثور على الوسيط المطلوب.</p>
            <p className="text-sm text-gray-500 mb-6">معرف الوسيط: {brokerId}</p>
            <p className="text-sm text-gray-500 mb-6">
              الوسطاء المتاحة: {brokers.map(b => b.id).join(", ")}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              وسطاء الإدارة: {adminBrokers.map((b: any) => b.id).join(", ")}
            </p>
            <Link to="/" className="inline-block">
              <Button>العودة إلى الرئيسية</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getBrokerContent = () => {
    // If we have comprehensive admin content, use it
    if (brokerContent && Object.keys(brokerContent).length > 0) {
      return (
        <div className="space-y-8">
          {/* Company Overview */}
          {brokerContent.companyOverview && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نظرة عامة على الشركة</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.companyOverview}
                </p>
                {(brokerContent.foundedYear || brokerContent.headquarters || brokerContent.employeeCount) && (
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {brokerContent.foundedYear && (
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{brokerContent.foundedYear}</div>
                        <div className="text-sm text-gray-600">سنة التأسيس</div>
                      </div>
                    )}
                    {brokerContent.headquarters && (
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{brokerContent.headquarters}</div>
                        <div className="text-sm text-gray-600">المقر الرئيسي</div>
                      </div>
                    )}
                    {brokerContent.employeeCount && (
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{brokerContent.employeeCount}</div>
                        <div className="text-sm text-gray-600">عدد الموظفين</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Regulation & Licenses */}
          {brokerContent.regulation && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">التنظيم والتراخيص</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.regulation}
                </p>
                {brokerContent.licenses && brokerContent.licenses.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">التراخيص الحالية:</h3>
                    <div className="flex flex-wrap gap-2">
                      {brokerContent.licenses.map((license, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {license}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Trading Platforms */}
          {brokerContent.tradingPlatforms && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">منصات التداول</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.tradingPlatforms}
                </p>
                {brokerContent.platformsList && brokerContent.platformsList.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {brokerContent.platformsList.map((platform, index) => (
                      <div key={index} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-center font-medium">
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Account Types */}
          {brokerContent.accountTypes && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أنواع الحسابات</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.accountTypes}
                </p>
                {brokerContent.accountTypesList && brokerContent.accountTypesList.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brokerContent.accountTypesList.map((accountType, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="font-semibold text-gray-900">{accountType}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Spreads & Commissions */}
          {brokerContent.spreadsCommissions && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الفروقات والعمولات</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.spreadsCommissions}
                </p>
                {(brokerContent.minimumDeposit || brokerContent.maximumLeverage) && (
                  <div className="bg-yellow-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brokerContent.minimumDeposit && (
                      <div>
                        <div className="text-lg font-bold text-gray-900">{brokerContent.minimumDeposit}</div>
                        <div className="text-sm text-gray-600">الحد الأدنى للإيداع</div>
                      </div>
                    )}
                    {brokerContent.maximumLeverage && (
                      <div>
                        <div className="text-lg font-bold text-gray-900">{brokerContent.maximumLeverage}</div>
                        <div className="text-sm text-gray-600">أقصى رافعة مالية</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Advantages & Disadvantages */}
          {(brokerContent.advantages?.length > 0 || brokerContent.disadvantages?.length > 0) && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">المزايا والعيوب</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {brokerContent.advantages?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      المزايا
                    </h3>
                    <ul className="space-y-2">
                      {brokerContent.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {brokerContent.disadvantages?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <X size={20} />
                      العيوب
                    </h3>
                    <ul className="space-y-2">
                      {brokerContent.disadvantages.map((disadvantage, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X size={16} className="text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Customer Support */}
          {brokerContent.customerSupport && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">دعم العملاء</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.customerSupport}
                </p>
                {(brokerContent.supportHours || brokerContent.supportLanguages?.length > 0) && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    {brokerContent.supportHours && (
                      <div className="mb-3">
                        <span className="font-semibold text-gray-900">ساعات الدعم: </span>
                        <span className="text-gray-700">{brokerContent.supportHours}</span>
                      </div>
                    )}
                    {brokerContent.supportLanguages?.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900">اللغات المتاحة: </span>
                        <span className="text-gray-700">{brokerContent.supportLanguages.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Deposit & Withdrawal */}
          {brokerContent.depositWithdrawal && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الإيداع والسحب</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.depositWithdrawal}
                </p>
                {(brokerContent.depositMethods?.length > 0 || brokerContent.withdrawalMethods?.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brokerContent.depositMethods?.length > 0 && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">طرق الإيداع:</h4>
                        <ul className="space-y-1">
                          {brokerContent.depositMethods.map((method, index) => (
                            <li key={index} className="text-gray-700 text-sm">• {method}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {brokerContent.withdrawalMethods?.length > 0 && (
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">طرق السحب:</h4>
                        <ul className="space-y-1">
                          {brokerContent.withdrawalMethods.map((method, index) => (
                            <li key={index} className="text-gray-700 text-sm">• {method}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {brokerContent.processingTimes && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-900">أوقات المعالجة: </span>
                    <span className="text-gray-700">{brokerContent.processingTimes}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Security & Additional Features */}
          {(brokerContent.securityMeasures || brokerContent.islamicAccounts || brokerContent.bonusesPromotions) && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الأمان والميزات الإضافية</h2>
              <div className="space-y-4">
                {brokerContent.securityMeasures && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">إجراءات الأمان</h3>
                    <p className="text-gray-700 leading-relaxed">{brokerContent.securityMeasures}</p>
                  </div>
                )}
                {brokerContent.islamicAccounts && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">الحسابات الإسلامية</h3>
                    <p className="text-gray-700 leading-relaxed">{brokerContent.islamicAccounts}</p>
                  </div>
                )}
                {brokerContent.bonusesPromotions && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">العروض والمكافآت</h3>
                    <p className="text-gray-700 leading-relaxed">{brokerContent.bonusesPromotions}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {brokerContent.customSections && brokerContent.customSections.length > 0 && (
            brokerContent.customSections.map((section) => (
              <section key={section.id}>
                {section.type === 'heading' && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                )}
                {section.type === 'subheading' && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                )}
                {section.type === 'content' && section.title && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                )}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg mb-4 whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </section>
            ))
          )}

          {/* Final Assessment */}
          {brokerContent.conclusion && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الخلاصة والتوصية</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {brokerContent.conclusion}
                </p>
                {brokerContent.recommendation && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star size={20} className="text-primary fill-current" />
                      <span className="font-semibold text-primary">توصيتنا</span>
                    </div>
                    <p className="text-gray-700">{brokerContent.recommendation}</p>
                  </div>
                )}
                {brokerContent.targetAudience && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-900">الجمهور المستهدف: </span>
                    <span className="text-gray-700">{brokerContent.targetAudience}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      );
    }

    // Fallback to static content for existing brokers
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
        return (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نظرة عامة على الشركة</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {broker.descriptionAr || broker.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">${broker.minDeposit}</div>
                    <div className="text-sm text-gray-600">الحد الأدنى للإيداع</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{broker.spreads}</div>
                    <div className="text-sm text-gray-600">الفروقات</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{broker.rating}/5</div>
                    <div className="text-sm text-gray-600">التقييم</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">التنظيم والتراخيص</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  شركة {broker.nameAr} مرخصة ومنظمة من قبل جهات تنظيمية موثوقة لضمان بيئة تداول آمنة ومحمية.
                </p>
                {broker.regulation && broker.regulation.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">التراخيص الحالية:</h3>
                    <div className="flex flex-wrap gap-2">
                      {broker.regulation.map((license, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {license}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">منصات التداول</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  يوفر وسيط {broker.nameAr} مجموعة متنوعة من منصات التداول المتقدمة لتلبية احتياجات جميع أنواع المتداولين.
                </p>
                {broker.platforms && broker.platforms.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {broker.platforms.map((platform, index) => (
                      <div key={index} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-center font-medium">
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أنواع الحسابات</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  تقدم شركة {broker.nameAr} أنواع حسابات متعددة تناسب مختلف مستويات الخبرة وأهداف التداول.
                </p>
                {broker.accountTypes && broker.accountTypes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {broker.accountTypes.map((accountType, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="font-semibold text-gray-900">{accountType}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الرسوم والعمولات</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  يتميز وسيط {broker.nameAr} بهيكل رسوم شفاف وتنافسي يناسب المتداولين من جميع المستويات.
                </p>
                <div className="bg-yellow-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{broker.fees?.commission || "حسب نوع الحساب"}</div>
                    <div className="text-sm text-gray-600">العمولة</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{broker.fees?.withdrawal || "حسب طريقة السحب"}</div>
                    <div className="text-sm text-gray-600">رسوم السحب</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{broker.fees?.inactivity || "غير محدد"}</div>
                    <div className="text-sm text-gray-600">رسوم عدم النشاط</div>
                  </div>
                </div>
              </div>
            </section>

            {(broker.pros?.length > 0 || broker.cons?.length > 0) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">المزايا والعيوب</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {broker.pros?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                        <CheckCircle size={20} />
                        المزايا
                      </h3>
                      <ul className="space-y-2">
                        {broker.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {broker.cons?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                        <X size={20} />
                        العيوب
                      </h3>
                      <ul className="space-y-2">
                        {broker.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X size={16} className="text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات الاتصال</h2>
              <div className="prose max-w-none">
                <div className="bg-blue-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{broker.website}</div>
                    <div className="text-sm text-gray-600">الموقع الإلكتروني</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{broker.phone}</div>
                    <div className="text-sm text-gray-600">رقم الهاتف</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{broker.email}</div>
                    <div className="text-sm text-gray-600">البريد الإلكتروني</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الخلاصة والتوصية</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  يعتبر وسيط {broker.nameAr} خياراً جيداً للمتداولين الذين يبحثون عن وسيط مرخص وموثوق. 
                  مع تقييم {broker.rating}/5 من {broker.reviewCount.toLocaleString()} متداول، تظهر الشركة 
                  التزامها بتقديم خدمات عالية الجودة.
                </p>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={20} className="text-primary fill-current" />
                    <span className="font-semibold text-primary">تقييمنا</span>
                  </div>
                  <p className="text-gray-700">
                    بناءً على التراخيص والخدمات المتاحة، نوصي بالنظر في هذا الوسيط كخيار لتداولاتك. 
                    ننصح دائماً بالبدء بحساب تجريبي لتجربة المنصة قبل التداول بأموال حقيقية.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800 font-medium">ملاحظة للإدارة</p>
              <p className="text-yellow-700 text-sm mt-1">
                يمكن إضافة محتوى مخصص لهذا الوسيط من لوحة التحكم لتحسين تجربة الزوار
              </p>
            </div>
          </div>
        );
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

      {/* Admin Controls - Only show for admins */}
      {currentUser?.isOwner && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">إدارة الوسيط</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleRecommended}
                  size="sm"
                  variant={isInRecommended ? "destructive" : "default"}
                  className="gap-2"
                >
                  <Heart 
                    size={16} 
                    weight={isInRecommended ? "fill" : "regular"}
                  />
                  {isInRecommended ? "إزالة من الموصى بهم" : "إضافة للموصى بهم"}
                </Button>
                <Link to={`/cadmin/brokers/${broker.id}`}>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    تحرير المحتوى
                  </Button>
                </Link>
                <Link to="/cadmin/brokers">
                  <Button size="sm" variant="outline" className="gap-2">
                    إدارة الوسطاء
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={brokerLogos[broker.id] || broker.logo} 
                    alt={`${broker.name} logo`}
                    className="w-20 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
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



        {/* Latest Comments Section */}
        <section className="mt-12 pt-8 border-t">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">أحدث التعليقات</h2>
            <p className="text-gray-600">آخر التعليقات والخبرات من المتداولين</p>
          </div>
          
          <div className="space-y-6">
            {/* Comment 1 */}
            <Card className="bg-white border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">أحمد الشمري</h3>
                      <span className="text-sm text-gray-500">منذ ساعتين</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      أتداول مع {broker.nameAr} منذ 8 أشهر وأنا راضي جداً عن الخدمة. المنصة سريعة وموثوقة، وفريق الدعم يرد بسرعة على الأسئلة. الفروقات السعرية تنافسية جداً خاصة في الفوركس. أنصح المبتدئين بالبدء معهم.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>12 مفيد</span>
                      </div>
                      <button className="hover:text-blue-600 transition-colors">
                        رد
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comment 2 */}
            <Card className="bg-white border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <User size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">فاطمة القحطاني</h3>
                      <span className="text-sm text-gray-500">منذ 4 ساعات</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      تجربتي مع {broker.nameAr} إيجابية جداً. سحبت أرباحي عدة مرات بدون أي مشاكل، عادة يوصل المبلغ خلال يومين كحد أقصى. التحليلات والأدوات المتاحة ممتازة للتداول اليومي. التطبيق سهل الاستخدام ومناسب للمبتدئين.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>8 مفيد</span>
                      </div>
                      <button className="hover:text-blue-600 transition-colors">
                        رد
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comment 3 */}
            <Card className="bg-white border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 rounded-full p-2">
                    <User size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">محمد العتيبي</h3>
                      <span className="text-sm text-gray-500">منذ 6 ساعات</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      بصراحة كان عندي تحفظات في البداية، لكن بعد 3 أشهر من التداول مع {broker.nameAr} تغير رأيي تماماً. الشركة منظمة ومرخصة، والأهم أن السحوبات تتم بسرعة. جربت منصات أخرى لكن هذه الأفضل حتى الآن من ناحية الشفافية.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>15 مفيد</span>
                      </div>
                      <button className="hover:text-blue-600 transition-colors">
                        رد
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comment 4 */}
            <Card className="bg-white border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-2">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">سارة المطيري</h3>
                      <span className="text-sm text-gray-500">منذ 8 ساعات</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      أول مرة أتداول والحمدلله اخترت {broker.nameAr}. الموقع واضح وفيه شروحات مفيدة للمبتدئين. فريق الدعم ساعدني كثير في البداية ووضحوا لي كل الخطوات. الحساب التجريبي ممتاز لتعلم التداول قبل المخاطرة بأموال حقيقية.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>6 مفيد</span>
                      </div>
                      <button className="hover:text-blue-600 transition-colors">
                        رد
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comment 5 */}
            <Card className="bg-white border-l-4 border-l-indigo-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 rounded-full p-2">
                    <User size={20} className="text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">خالد الراشد</h3>
                      <span className="text-sm text-gray-500">منذ 12 ساعة</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      متداول محترف منذ 5 سنوات وجربت شركات كثيرة. {broker.nameAr} من أفضل الشركات اللي تعاملت معها من ناحية السرعة في التنفيذ والشفافية في الأسعار. المنصة مستقرة حتى وقت الأخبار المهمة. أنصح بها بقوة للمتداولين الجادين.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>23 مفيد</span>
                      </div>
                      <button className="hover:text-blue-600 transition-colors">
                        رد
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Comment and Show More Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button variant="outline" className="px-6 py-2">
              عرض المزيد من التعليقات
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                  <Plus size={20} className="ml-2" />
                  إضافة تعليق
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-right">إضافة تعليق جديد</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    
                    if (!commentForm.name || !commentForm.comment) {
                      toast.error("يرجى ملء جميع الحقول المطلوبة");
                      setIsSubmitting(false);
                      return;
                    }
                    
                    // Create contact message for the review/comment
                    const newMessage = {
                      id: Date.now().toString(),
                      firstName: commentForm.name.split(' ')[0] || commentForm.name,
                      lastName: commentForm.name.split(' ').slice(1).join(' ') || "",
                      email: "", // Email not collected in comment form
                      phone: "", // Phone not collected in comment form
                      message: `تقييم وتعليق على وسيط ${broker.nameAr || broker.name}: ${commentForm.comment} (التقييم: ${commentForm.rating}/5)`,
                      type: "review" as const,
                      status: "new" as const,
                      date: new Date().toISOString()
                    };
                    
                    // Save to contact messages
                    setContactMessages((prev: any[]) => Array.isArray(prev) ? [newMessage, ...prev] : [newMessage]);
                    
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Reset form
                    setCommentForm({ name: '', comment: '', rating: 5 });
                    setIsSubmitting(false);
                    setIsDialogOpen(false);
                    
                    // Show success toast
                    toast.success('تم إضافة تعليقك بنجاح! سيظهر بعد المراجعة.');
                  }}
                  className="space-y-6 mt-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right block">الاسم</Label>
                    <Input
                      id="name"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="أدخل اسمك"
                      required
                      disabled={isSubmitting}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rating" className="text-right block">التقييم</Label>
                    <div className="flex justify-end gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setCommentForm(prev => ({ ...prev, rating: star }))}
                          className="hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Star
                            size={24}
                            weight={star <= commentForm.rating ? "fill" : "regular"}
                            className={star <= commentForm.rating ? "text-yellow-400" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="comment" className="text-right block">التعليق</Label>
                    <Textarea
                      id="comment"
                      value={commentForm.comment}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="شاركنا تجربتك مع هذا الوسيط..."
                      required
                      disabled={isSubmitting}
                      className="min-h-[100px] text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setCommentForm({ name: '', comment: '', rating: 5 });
                        setIsDialogOpen(false);
                      }}
                      disabled={isSubmitting}
                      className="px-6"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
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