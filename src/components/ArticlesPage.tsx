import { useState, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/articles";
import { ArrowUp, Clock, Calendar } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface AdminArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  contentSections?: any[];
  author: string;
  publishDate: string;
  category: string;
  isPublished: boolean;
  slug: string;
  readTime?: string;
  image?: string;
  metaDescription?: string;
  tags?: string[];
}

export function ArticlesPage() {
  const [adminArticles] = useKV<AdminArticle[]>("admin-articles", []);
  const [allArticles, setAllArticles] = useState<any[]>([]);

  // Combine admin articles and static articles
  useEffect(() => {
    const publishedAdminArticles = (adminArticles || []).filter(article => article.isPublished);
    const combined = [...publishedAdminArticles, ...articles];
    // Sort by date (newest first)
    combined.sort((a, b) => {
      const dateA = new Date(a.publishDate || a.date || '2024-01-01');
      const dateB = new Date(b.publishDate || b.date || '2024-01-01');
      return dateB.getTime() - dateA.getTime();
    });
    setAllArticles(combined);
  }, [adminArticles]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مقالات ونصائح التداول
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث المقالات والنصائح المتخصصة في التداول والاستثمار. 
            مقالات مكتوبة بخبرة عملية لمساعدتك في تطوير مهاراتك التداولية وتحقيق النجاح في الأسواق المالية.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <Link key={article.id} to={`/articles/${article.slug}`} className="group block">
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Article Image */}
                {article.image && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                {/* Article Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{article.date || article.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime || "5 دقائق قراءة"}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  {/* Read More Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    اقرأ المقال كاملاً
                  </Button>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter Subscription Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            اشترك في النشرة الإخبارية
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-lg mx-auto">
            احصل على أحدث المقالات والنصائح التداولية مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
              dir="rtl"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              اشترك الآن
            </Button>
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            هل تريد المزيد من المقالات المفيدة؟
          </p>
          <Button variant="outline" size="lg">
            تحميل المزيد من المقالات
          </Button>
        </div>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <Button
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-110 text-white"
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
}