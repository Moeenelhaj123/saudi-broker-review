import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrokerCard } from "@/components/BrokerCard";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@phosphor-icons/react";

const brokers = [
  {
    id: "exness",
    name: "اكسنس",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 156,
    minDeposit: "10 دولار",
    leverage: "1:2000",
    spreads: "من 0.3 نقطة",
    regulation: "CySEC, FCA",
    features: ["تنفيذ فوري", "حماية الرصيد السالب", "أدوات تداول متقدمة"],
    website: "https://www.exness.com"
  },
  {
    id: "avatrade",
    name: "أفا تريد",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=80&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 203,
    minDeposit: "100 دولار",
    leverage: "1:400",
    spreads: "من 0.9 نقطة",
    regulation: "ASIC, CBI",
    features: ["منصات متعددة", "تعليم مجاني", "دعم عربي"],
    website: "https://www.avatrade.com"
  },
  {
    id: "xm",
    name: "اكس ام",
    logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=80&h=80&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 189,
    minDeposit: "5 دولار",
    leverage: "1:888",
    spreads: "من 1.0 نقطة",
    regulation: "CySEC, ASIC",
    features: ["مكافآت الإيداع", "تحليلات يومية", "ندوات مجانية"],
    website: "https://www.xm.com"
  },
  {
    id: "pepperstone",
    name: "بيبر ستون",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 142,
    minDeposit: "200 دولار",
    leverage: "1:500",
    spreads: "من 0.0 نقطة",
    regulation: "ASIC, FCA",
    features: ["سبريد منخفض", "تنفيذ سريع", "أدوات احترافية"],
    website: "https://pepperstone.com"
  },
  {
    id: "ic-markets",
    name: "آي سي ماركتس",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=80&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 167,
    minDeposit: "200 دولار",
    leverage: "1:500",
    spreads: "من 0.0 نقطة",
    regulation: "ASIC, CySEC",
    features: ["منصة MT4/MT5", "تداول الخوارزميات", "خدمة VPS"],
    website: "https://www.icmarkets.com"
  },
  {
    id: "fxpro",
    name: "اف اكس برو",
    logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=80&h=80&fit=crop&crop=center",
    rating: 4.4,
    reviewCount: 134,
    minDeposit: "100 دولار",
    leverage: "1:500",
    spreads: "من 1.2 نقطة",
    regulation: "CySEC, FCA",
    features: ["حماية الأموال", "تعليم شامل", "تطبيق جوال متقدم"],
    website: "https://www.fxpro.com"
  }
];

export function BestBrokersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            أفضل الوسطاء الماليين
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اكتشف أفضل الوسطاء الماليين المرخصين والموثوقين في السعودية. جميع الوسطاء مراجعين ومختبرين من قبل خبراء التداول لضمان أعلى مستويات الأمان والجودة.
          </p>
        </div>

        {/* Brokers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {brokers.map((broker) => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-card rounded-lg p-8 border">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            لماذا نختار هؤلاء الوسطاء؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                معايير الاختيار
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• ترخيص من جهات رقابية موثوقة</li>
                <li>• سجل حافل في الأمان والموثوقية</li>
                <li>• تقييمات إيجابية من المتداولين</li>
                <li>• شروط تداول تنافسية</li>
                <li>• دعم عملاء باللغة العربية</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                نصائح للاختيار
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• تأكد من التراخيص والتنظيم</li>
                <li>• اقرأ تجارب المتداولين الآخرين</li>
                <li>• قارن الرسوم والعمولات</li>
                <li>• جرب الحساب التجريبي أولاً</li>
                <li>• تأكد من سهولة السحب والإيداع</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-muted-foreground text-sm">
              <strong>تحذير:</strong> التداول في الأسواق المالية ينطوي على مخاطر عالية وقد يؤدي إلى خسارة كامل رأس المال المستثمر. تأكد من فهم المخاطر قبل البدء في التداول.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}