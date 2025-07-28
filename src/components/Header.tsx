import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            
            <Link to="/best-brokers" className="text-foreground hover:text-primary transition-colors">
              أفضل الوسطاء
            </Link>
            
            <Link to="/articles" className="text-foreground hover:text-primary transition-colors">
              مقالات
            </Link>
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
              
              <Link 
                to="/best-brokers" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                أفضل الوسطاء
              </Link>
              
              <Link 
                to="/articles" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                مقالات
              </Link>
              
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