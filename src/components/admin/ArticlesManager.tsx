import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  FileText,
  ExternalLink,
  Save,
  X,
  Calendar
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  isPublished: boolean;
  slug: string;
}

export function ArticlesManager() {
  const [articles, setArticles] = useKV("admin-articles", [
    {
      id: "1",
      title: "دليل شامل لاختيار أفضل وسيط للتداول",
      excerpt: "تعرف على أهم المعايير التي يجب مراعاتها عند اختيار وسيط التداول المناسب لك",
      content: "المحتوى التفصيلي للمقال...",
      author: "فريق التحرير",
      publishDate: "2024-01-15",
      category: "دليل المتداول",
      isPublished: true,
      slug: "guide-choosing-best-broker"
    },
    {
      id: "2", 
      title: "أهم استراتيجيات إدارة المخاطر في التداول",
      excerpt: "تعلم كيفية حماية رأس مالك وإدارة المخاطر بطريقة احترافية",
      content: "المحتوى التفصيلي للمقال...",
      author: "محمد الأحمد",
      publishDate: "2024-01-10",
      category: "استراتيجيات التداول",
      isPublished: true,
      slug: "risk-management-strategies"
    },
    {
      id: "3",
      title: "التحليل الفني للمبتدئين: الأساسيات والمبادئ",
      excerpt: "دليل مبسط لفهم التحليل الفني وأهم الأدوات المستخدمة",
      content: "المحتوى التفصيلي للمقال...",
      author: "سارة المطيري",
      publishDate: "2024-01-05",
      category: "تعليم التداول",
      isPublished: true,
      slug: "technical-analysis-basics"
    }
  ]);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    publishDate: new Date().toISOString().split('T')[0],
    category: "",
    isPublished: false,
    slug: ""
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFFa-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.excerpt || !newArticle.content) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const article: Article = {
      ...newArticle as Article,
      id: Date.now().toString(),
      slug: newArticle.slug || generateSlug(newArticle.title || "")
    };

    setArticles(prev => [...prev, article]);
    setNewArticle({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      publishDate: new Date().toISOString().split('T')[0],
      category: "",
      isPublished: false,
      slug: ""
    });
    setShowAddForm(false);
    toast.success("تم إضافة المقال بنجاح");
  };

  const handleUpdateArticle = () => {
    if (!editingArticle) return;

    setArticles(prev => 
      prev.map(article => 
        article.id === editingArticle.id ? editingArticle : article
      )
    );
    setEditingArticle(null);
    toast.success("تم تحديث المقال بنجاح");
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(article => article.id !== articleId));
    toast.success("تم حذف المقال بنجاح");
  };

  const togglePublished = (articleId: string) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, isPublished: !article.isPublished }
          : article
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المقالات</h2>
          <p className="text-muted-foreground">إضافة وتعديل وحذف مقالات الموقع</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة مقال جديد
        </Button>
      </div>

      {/* Add Article Form */}
      {showAddForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              إضافة مقال جديد
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="new-title">عنوان المقال *</Label>
                <Input
                  id="new-title"
                  value={newArticle.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setNewArticle(prev => ({ 
                      ...prev, 
                      title,
                      slug: generateSlug(title)
                    }));
                  }}
                  placeholder="عنوان المقال"
                />
              </div>
              <div>
                <Label htmlFor="new-author">الكاتب</Label>
                <Input
                  id="new-author"
                  value={newArticle.author}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="اسم الكاتب"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="new-category">التصنيف</Label>
                <Input
                  id="new-category"
                  value={newArticle.category}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="تصنيف المقال"
                />
              </div>
              <div>
                <Label htmlFor="new-date">تاريخ النشر</Label>
                <Input
                  id="new-date"
                  type="date"
                  value={newArticle.publishDate}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, publishDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="new-slug">الرابط (slug)</Label>
                <Input
                  id="new-slug"
                  value={newArticle.slug}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-url-slug"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="new-excerpt">الملخص *</Label>
              <Textarea
                id="new-excerpt"
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="ملخص قصير للمقال"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="new-content">المحتوى *</Label>
              <Textarea
                id="new-content"
                value={newArticle.content}
                onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                placeholder="محتوى المقال الكامل"
                rows={8}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddArticle} className="gap-2">
                <Save className="h-4 w-4" />
                حفظ المقال
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {editingArticle?.id === article.id ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>عنوان المقال</Label>
                      <Input
                        value={editingArticle.title}
                        onChange={(e) => setEditingArticle(prev => ({ 
                          ...prev!, 
                          title: e.target.value 
                        }))}
                      />
                    </div>
                    <div>
                      <Label>الكاتب</Label>
                      <Input
                        value={editingArticle.author}
                        onChange={(e) => setEditingArticle(prev => ({ 
                          ...prev!, 
                          author: e.target.value 
                        }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>الملخص</Label>
                    <Textarea
                      value={editingArticle.excerpt}
                      onChange={(e) => setEditingArticle(prev => ({ 
                        ...prev!, 
                        excerpt: e.target.value 
                      }))}
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>المحتوى</Label>
                    <Textarea
                      value={editingArticle.content}
                      onChange={(e) => setEditingArticle(prev => ({ 
                        ...prev!, 
                        content: e.target.value 
                      }))}
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleUpdateArticle} size="sm" className="gap-2">
                      <Save className="h-4 w-4" />
                      حفظ
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingArticle(null)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      {article.isPublished ? (
                        <Badge className="bg-green-100 text-green-800">منشور</Badge>
                      ) : (
                        <Badge variant="secondary">مسودة</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.publishDate}
                      </span>
                      <span>بواسطة: {article.author}</span>
                      <span>التصنيف: {article.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={article.isPublished ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePublished(article.id)}
                    >
                      {article.isPublished ? "إلغاء النشر" : "نشر"}
                    </Button>

                    <Link to={`/articles/${article.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        معاينة
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingArticle(article)}
                      className="gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteArticle(article.id)}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد مقالات</h3>
            <p className="text-muted-foreground mb-4">ابدأ بإضافة أول مقال للموقع</p>
            <Button onClick={() => setShowAddForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة مقال جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}