import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchFilters, FilterOptions } from "@/components/SearchFilters";
import { BrokerCard } from "@/components/BrokerCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useKV } from '@github/spark/hooks';
import { brokers, Broker } from "@/lib/data";
import { ArrowUp } from "@phosphor-icons/react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [comparingBrokers, setComparingBrokers] = useKV<Broker[]>("comparing-brokers", []);

  const filteredBrokers = useMemo(() => {
    return brokers.filter(broker => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!broker.nameAr.toLowerCase().includes(query) && 
            !broker.name.toLowerCase().includes(query) &&
            !broker.descriptionAr.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Regulation filter
      if (filters.regulation) {
        if (!broker.regulation.includes(filters.regulation)) {
          return false;
        }
      }

      // Min deposit filter
      if (filters.minDeposit) {
        const [min, max] = filters.minDeposit.split('-').map(s => parseInt(s.replace('+', '').replace(',', '')));
        if (max) {
          if (broker.minDeposit < min || broker.minDeposit > max) {
            return false;
          }
        } else {
          if (broker.minDeposit < min) {
            return false;
          }
        }
      }

      // Rating filter
      if (filters.rating) {
        const minRating = parseInt(filters.rating.replace('+', ''));
        if (broker.rating < minRating) {
          return false;
        }
      }

      // Account type filter
      if (filters.accountType) {
        const accountTypeMap: Record<string, string> = {
          'islamic': 'إسلامي',
          'standard': 'قياسي',
          'vip': 'VIP'
        };
        const arabicAccountType = accountTypeMap[filters.accountType];
        if (!broker.accountTypes.some(type => type.includes(arabicAccountType))) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleCompare = (broker: Broker) => {
    setComparingBrokers((current) => {
      const isAlreadyComparing = current.some(b => b.id === broker.id);
      if (isAlreadyComparing) {
        return current.filter(b => b.id !== broker.id);
      } else if (current.length < 3) {
        return [...current, broker];
      } else {
        return current;
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">الوسطاء الماليون</h2>
              <p className="text-muted-foreground">
                اكتشف أفضل الوسطاء المرخصين في المملكة العربية السعودية
              </p>
            </div>
            {comparingBrokers.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  مقارنة ({comparingBrokers.length})
                </Badge>
                <Button 
                  className="bg-accent hover:bg-accent/90"
                  disabled={comparingBrokers.length < 2}
                >
                  عرض المقارنة
                </Button>
              </div>
            )}
          </div>

          <SearchFilters onSearch={setSearchQuery} onFilter={setFilters} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            عرض {filteredBrokers.length} من {brokers.length} وسيط
          </p>
          {comparingBrokers.length >= 3 && (
            <p className="text-sm text-muted-foreground">
              يمكنك مقارنة حتى 3 وسطاء فقط
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBrokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              onCompare={handleCompare}
              isComparing={comparingBrokers.some(b => b.id === broker.id)}
            />
          ))}
        </div>

        {filteredBrokers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">لم نجد أي نتائج</h3>
            <p className="text-muted-foreground mb-4">
              جرب تعديل معايير البحث أو الفلاتر للعثور على وسطاء مناسبين
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setFilters({});
              }}
            >
              مسح جميع الفلاتر
            </Button>
          </div>
        )}
      </main>

      <Footer />

      <Button
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        onClick={scrollToTop}
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
}

export default App;