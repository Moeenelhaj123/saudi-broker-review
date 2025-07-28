import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/articles";
import { ArrowUp, ArrowRight, Clock, Calendar, Tag } from "@phosphor-icons/react";

interface AdminArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  contentSections?: ContentSection[];
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

interface ContentSection {
  id: string;
  type: 'heading' | 'subheading' | 'paragraph';
  content: string;
  order: number;
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [adminArticles] = useKV<AdminArticle[]>("admin-articles", []);
  const [currentArticle, setCurrentArticle] = useState<any>(null);

  // Find article from either source
  useEffect(() => {
    // First check admin articles
    const adminArticle = adminArticles?.find(a => a.slug === slug && a.isPublished);
    if (adminArticle) {
      setCurrentArticle(adminArticle);
    } else {
      // Fall back to static articles
      const staticArticle = articles.find(a => a.slug === slug);
      setCurrentArticle(staticArticle);
    }
  }, [slug, adminArticles]);

  const article = currentArticle;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO Meta tags and Structured Data
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | وسطاء السعودية`;
      
      // Meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      const description = article.metaDescription || article.excerpt || "";
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }

      // Keywords meta tag
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const keywords = article.tags ? article.tags.join(', ') : '';
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else if (keywords) {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywords;
        document.head.appendChild(meta);
      }

      // Open Graph tags
      const updateOrCreateOGTag = (property: string, content: string) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (ogTag) {
          ogTag.setAttribute('content', content);
        } else {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          ogTag.setAttribute('content', content);
          document.head.appendChild(ogTag);
        }
      };

      updateOrCreateOGTag('og:title', article.title);
      updateOrCreateOGTag('og:description', article.metaDescription);
      updateOrCreateOGTag('og:image', article.image);
      updateOrCreateOGTag('og:type', 'article');
      updateOrCreateOGTag('og:url', window.location.href);

      // Structured Data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDescription,
        "image": article.image,
        "datePublished": article.date,
        "author": {
          "@type": "Organization",
          "name": "وسطاء السعودية"
        },
        "publisher": {
          "@type": "Organization",
          "name": "وسطاء السعودية",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          }
        },
        "keywords": article.tags,
        "articleSection": article.category,
        "inLanguage": "ar"
      };

      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Reset title when component unmounts
      document.title = 'وسطاء السعودية - دليل شامل للوسطاء الماليين';
      // Remove structured data
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.remove();
      }
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المقال غير موجود</h1>
          <Link to="/articles">
            <Button>العودة للمقالات</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowRight size={14} />
            <Link to="/articles" className="hover:text-primary">المقالات</Link>
            <ArrowRight size={14} />
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{article.date || article.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime || "5 دقائق قراءة"}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2">
                  <span>بواسطة: {article.author}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-8">
                <Tag size={16} className="text-gray-500" />
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Article Image */}
          {article.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <article className="prose prose-lg max-w-none">
          
          {/* Check if it's an admin article with structured content */}
          {article.contentSections && article.contentSections.length > 0 ? (
            // Render structured content from admin
            <div className="space-y-6">
              {article.contentSections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <div key={section.id}>
                    {section.type === 'heading' && (
                      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary/20 pb-2 mt-8 mb-4">
                        {section.content}
                      </h2>
                    )}
                    {section.type === 'subheading' && (
                      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        {section.content}
                      </h3>
                    )}
                    {section.type === 'paragraph' && (
                      <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                        {section.content.split('\n').map((paragraph, pIndex) => (
                          paragraph.trim() && (
                            <p key={pIndex} className="leading-8">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : article.content && typeof article.content === 'string' ? (
            // Render plain text content from admin (parse markdown-style headings)
            <div className="space-y-6">
              {article.content.split('\n').map((line, index) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                } else if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 border-b-2 border-primary/20 pb-2 mt-8 mb-4">
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed text-lg leading-8">
                      {trimmed}
                    </p>
                  );
                }
              })}
            </div>
          ) : article.content ? (
            // Render legacy structured content format
            <>
              {/* Introduction */}
              <div className="bg-primary/5 border-r-4 border-primary p-6 rounded-lg mb-8">
                <p className="text-lg leading-relaxed text-gray-800 m-0">
                  {article.content.introduction}
                </p>
              </div>

              {/* Article Sections */}
              <div className="space-y-8">
                {article.content.sections.map((section, index) => (
                  <section key={index} className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary/20 pb-2">
                      {section.title}
                    </h2>
                    <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                      {section.content.split('\n').map((paragraph, pIndex) => (
                        paragraph.trim() && (
                          <p key={pIndex} className="leading-8">
                            {paragraph.trim()}
                          </p>
                        )
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Conclusion */}
              <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">الخلاصة</h3>
                <p className="text-lg leading-relaxed text-gray-800 m-0">
                  {article.content.conclusion}
                </p>
              </div>
            </>
          ) : (
            // Fallback for articles with just excerpt
            <div className="text-gray-700 leading-relaxed text-lg">
              <p className="leading-8">{article.excerpt}</p>
            </div>
          )}

        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">شارك المقال</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              تويتر
            </Button>
            <Button variant="outline" size="sm">
              فيسبوك
            </Button>
            <Button variant="outline" size="sm">
              لينكدإن
            </Button>
            <Button variant="outline" size="sm">
              نسخ الرابط
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">مقالات ذات صلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link 
                  key={relatedArticle.id} 
                  to={`/articles/${relatedArticle.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img 
                        src={relatedArticle.image} 
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {relatedArticle.category}
                      </Badge>
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            احصل على المزيد من المقالات المفيدة
          </h3>
          <p className="text-primary-foreground/90 mb-6">
            اشترك في النشرة الإخبارية واحصل على أحدث النصائح والاستراتيجيات
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
              dir="rtl"
            />
            <Button variant="secondary">
              اشترك الآن
            </Button>
          </div>
        </div>

        {/* Back to Articles */}
        <div className="text-center mt-12">
          <Link to="/articles">
            <Button variant="outline" size="lg">
              العودة لجميع المقالات
            </Button>
          </Link>
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