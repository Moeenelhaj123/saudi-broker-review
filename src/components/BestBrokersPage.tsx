import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrokerCard } from "@/components/BrokerCard";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@phosphor-icons/react";
import { useKV } from "@github/spark/hooks";
import { brokers, Broker } from "@/lib/data";

// Convert admin broker to standard broker format for compatibility
const convertAdminBrokerToBroker = (adminBroker: any): Broker => ({
  id: adminBroker.id,
  name: adminBroker.name,
  nameAr: adminBroker.nameAr || adminBroker.name,
  logo: adminBroker.logoUrl || "", // Use admin logoUrl
  rating: adminBroker.rating,
  reviewCount: adminBroker.reviews,
  regulation: adminBroker.license ? adminBroker.license.split(', ') : [],
  minDeposit: parseInt(adminBroker.minDeposit) || 0,
  spreads: adminBroker.spreadFrom || "متغيرة",
  platforms: adminBroker.platforms || ["MetaTrader 4", "MetaTrader 5"],
  accountTypes: adminBroker.accountTypes || ["حساب قياسي", "حساب إسلامي"],
  website: adminBroker.website || "",
  phone: adminBroker.phone || "",
  email: adminBroker.email || "",
  description: adminBroker.description || "",
  descriptionAr: adminBroker.description || "",
  pros: adminBroker.pros || [],
  cons: adminBroker.cons || [],
  fees: {
    commission: "0%",
    withdrawal: "مجاني",
    inactivity: "غير متاح"
  }
});

export function BestBrokersPage() {
  // Get admin-managed brokers and best brokers list
  const [adminBrokers] = useKV("admin-brokers", []);
  const [bestBrokers] = useKV("admin-best-brokers", [
    { id: "exness", name: "Exness", enabled: true },
    { id: "avatrade", name: "AvaTrade", enabled: true },
    { id: "etoro", name: "eToro", enabled: true }
  ]);
  
  // Use admin best brokers if available, otherwise fallback to static data
  const enabledBestBrokers = (bestBrokers || []).filter(broker => broker.enabled);
  const rawDisplayBrokers = enabledBestBrokers.length > 0 
    ? enabledBestBrokers.map(adminBroker => {
        // Find the broker data from admin-brokers or fallback to static brokers
        const fullBrokerData = adminBrokers.find((broker: any) => broker.id === adminBroker.id) || 
                              brokers.find(broker => broker.id === adminBroker.id);
        return fullBrokerData || { 
          id: adminBroker.id, 
          name: adminBroker.name, 
          nameAr: adminBroker.name,
          rating: 4.5,
          reviewCount: 100,
          regulation: ["مرخص"],
          minDeposit: 100,
          spreads: "متغيرة",
          platforms: ["MetaTrader"],
          accountTypes: ["حساب قياسي"],
          website: "",
          phone: "",
          email: "",
          description: "",
          descriptionAr: "",
          pros: [],
          cons: [],
          fees: { commission: "0%", withdrawal: "مجاني", inactivity: "غير متاح" }
        };
      })
    : brokers;
  
  const displayBrokers = Array.isArray(rawDisplayBrokers)
    ? rawDisplayBrokers.filter(Boolean)
    : [];
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
          {Array.isArray(displayBrokers) && displayBrokers.map((broker) => (
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