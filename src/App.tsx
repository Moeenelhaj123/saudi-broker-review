import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrokerCard } from "@/components/BrokerCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { brokers } from "@/lib/data";
import { ArrowUp } from "@phosphor-icons/react";

function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            أفضل وسطاء التداول في السعودية
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            اكتشف وقارن بين أفضل وسطاء التداول المرخصين والموثوقين للمتداولين السعوديين
          </p>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            <span className="font-bold text-blue-600">{brokers.length}</span> وسيط مرخص ومتاح للمتداولين السعوديين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {brokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
            />
          ))}
        </div>
      </main>

      <Footer />

      <Button
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-110 text-white"
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
}

export default App;