import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { brokers } from "@/lib/data";
import { ChevronDown, List, X } from "@phosphor-icons/react";

export function Header() {
  const [isBrokersDropdownOpen, setIsBrokersDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrokersDropdownOpen(false);
      }
    }

    if (isBrokersDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBrokersDropdownOpen]);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              و
            </div>
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              وسطاء السعودية
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              الرئيسية
            </Link>
            
            {/* Best Brokers Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsBrokersDropdownOpen(!isBrokersDropdownOpen)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                أفضل الوسطاء
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${isBrokersDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isBrokersDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-border rounded-lg shadow-lg z-50">
                  <div className="py-2 max-h-96 overflow-y-auto">
                    {brokers.map((broker) => (
                      <Link
                        key={broker.id}
                        to={`/broker/${broker.id}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        onClick={() => setIsBrokersDropdownOpen(false)}
                      >
                        <span className="text-lg">{broker.logo}</span>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{broker.nameAr}</div>
                          <div className="text-sm text-muted-foreground">
                            ★ {broker.rating} ({broker.reviewCount} تقييم)
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              التقييمات
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground hidden sm:inline-flex">
              اتصل بنا
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="py-4 space-y-4">
              <Link 
                to="/" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              
              <div className="px-4">
                <div className="text-sm font-medium text-muted-foreground mb-2">أفضل الوسطاء</div>
                <div className="space-y-1 mr-4">
                  {brokers.map((broker) => (
                    <Link
                      key={broker.id}
                      to={`/broker/${broker.id}`}
                      className="flex items-center gap-2 py-2 text-sm text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{broker.logo}</span>
                      <span>{broker.nameAr}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <a 
                href="#" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                التقييمات
              </a>
              
              <div className="px-4 pt-2">
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  اتصل بنا
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}