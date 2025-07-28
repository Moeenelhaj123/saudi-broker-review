import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrokerCard } from "@/components/BrokerCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useKV } from '@github/spark/hooks';
import { brokers, Broker } from "@/lib/data";
import { ArrowUp } from "@phosphor-icons/react";

function App() {
  const [comparingBrokers, setComparingBrokers] = useKV<Broker[]>("comparing-brokers", []);

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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            أفضل وسطاء التداول
            <br />
            <span className="text-primary">في السعودية</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            اكتشف وقارن بين أفضل وسطاء التداول العالميين المتاحين للمتداولين السعوديين. 
            منصات موثقة، رسوم شفافة، وتقييمات حقيقية لمساعدتك في اتخاذ القرار الصحيح.
          </p>
          
          {comparingBrokers.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                مقارنة ({comparingBrokers.length}) وسطاء
              </Badge>
              <Button 
                className="bg-accent hover:bg-accent/90 text-lg px-6"
                disabled={comparingBrokers.length < 2}
              >
                عرض المقارنة التفصيلية
              </Button>
            </div>
          )}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-lg text-muted-foreground">
              <span className="font-bold text-primary">{brokers.length}</span> وسيط متاح للمتداولين السعوديين
            </p>
          </div>
          {comparingBrokers.length >= 3 && (
            <p className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              يمكنك مقارنة حتى 3 وسطاء فقط
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {brokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              onCompare={handleCompare}
              isComparing={comparingBrokers.some(b => b.id === broker.id)}
            />
          ))}
        </div>
      </main>

      <Footer />

      <Button
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-110"
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
}

export default App;