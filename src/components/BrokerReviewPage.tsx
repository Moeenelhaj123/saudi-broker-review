import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle, ArrowRight, User, ThumbsUp, Plus } from "@phosphor-icons/react";
import { brokers, reviews } from "@/lib/data";
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
  const broker = brokers.find(b => b.id === brokerId);
  
  // State for comment form
  const [commentForm, setCommentForm] = useState({
    name: '',
    comment: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get reviews for this broker
  const brokerReviews = reviews.filter(review => review.brokerId === brokerId);

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

        {/* Reviews Section */}
        {brokerReviews.length > 0 && (
          <section id="reviews" className="mt-12 pt-8 border-t">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
</h2>
              <p className="text-gray-600">
</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {brokerReviews.map((review) => (
                <Card key={review.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Star 
                                key={index}
                                size={14} 
                                weight={index < review.rating ? "fill" : "regular"}
                                className={index < review.rating ? "text-yellow-500" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">{review.title}</h4>
                        <p className="text-gray-600 leading-relaxed mb-3">{review.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{new Date(review.date).toLocaleDateString('ar-SA')}</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={14} />
                            <span>{review.helpful} مفيد</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Overall Rating Summary */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{broker.rating}/5.0</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      weight={i < Math.floor(broker.rating) ? "fill" : "regular"}
                      className={`w-6 h-6 ${i < Math.floor(broker.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  بناءً على {broker.reviewCount.toLocaleString()} تقييم من متداولين سعوديين
                </p>
              </div>
            </div>
          </section>
        )}

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
                          onClick={() => setCommentForm(prev => ({ ...prev, rating: star }))}
                          className="hover:scale-110 transition-transform"
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