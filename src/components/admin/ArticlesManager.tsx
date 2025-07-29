import { useState, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { articles as initialArticles, Article as ArticleInterface } from "@/lib/articles";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  FileText,
  ExternalLink,
  Save,
  X,
  Calendar,
  ChevronUp,
  ChevronDown,
  Type,
  AlignLeft,
  Image,
  Upload,
  Eye,
  Check
} from "lucide-react";

// Import existing article images
import articleCryptoTrading from "@/assets/images/article-crypto-trading.svg";
import articleHalalTrading from "@/assets/images/article-halal-trading.svg";
import articlePsychology from "@/assets/images/article-psychology.svg";
import articleRiskManagement from "@/assets/images/article-risk-management.svg";
import articleTechnicalAnalysis from "@/assets/images/article-technical-analysis.svg";
import articleTradingBasics from "@/assets/images/article-trading-basics.svg";

interface ContentSection {
  id: string;
  type: 'heading' | 'subheading' | 'paragraph';
  content: string;
  order: number;
}

// Available images with metadata
interface ImageOption {
  id: string;
  name: string;
  src: string;
  size: 'small' | 'medium' | 'large';
  aspectRatio: string;
  description: string;
  category: string;
}

const availableImages: ImageOption[] = [
  {
    id: 'crypto-trading',
    name: 'تداول العملات الرقمية',
    src: articleCryptoTrading,
    size: 'large',
    aspectRatio: '16:9',
    description: 'صورة مخصصة لمقالات تداول العملات الرقمية والكريبتو',
    category: 'تداول'
  },
  {
    id: 'halal-trading',
    name: 'التداول الحلال',
    src: articleHalalTrading,
    size: 'large',
    aspectRatio: '16:9',
    description: 'صورة مخصصة لمقالات التداول الإسلامي والحساب الإسلامي',
    category: 'إسلامي'
  },
  {
    id: 'psychology',
    name: 'علم النفس التداولي',
    src: articlePsychology,
    size: 'large',
    aspectRatio: '16:9',
    description: 'صورة مخصصة لمقالات علم النفس في التداول والسيطرة على المشاعر',
    category: 'تعليم'
  },
  {
    id: 'risk-management',
    name: 'إدارة المخاطر',
    src: articleRiskManagement,
    size: 'large',
    aspectRatio: '16:9',
    description: 'صورة مخصصة لمقالات إدارة المخاطر والحماية في التداول',
    category: 'تعليم'
  },
  {
    id: 'technical-analysis',
    name: 'التحليل الفني',
    src: articleTechnicalAnalysis,
    size: 'large',
    aspectRatio: '16:9',
    description: 'صورة مخصصة لمقالات التحليل الفني والمؤشرات',
    category: 'تحليل'
  },
  {
    id: 'trading-basics',
    name: 'أساسيات التداول',
    src: articleTradingBasics,
    size: 'large',
    aspectRatio: '16:9',
    description: 'صورة مخصصة لمقالات تعليم أساسيات التداول للمبتدئين',
    category: 'تعليم'
  }
];

interface AdminArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  contentSections?: ContentSection[]; // New structured content
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

export function ArticlesManager() {
  // Convert the initial articles to admin format
  const convertToAdminFormat = (article: ArticleInterface): AdminArticle => {
    // Combine all content into a single string for editing
    let fullContent = article.content.introduction + "\n\n";
    article.content.sections.forEach(section => {
      fullContent += `## ${section.title}\n\n${section.content}\n\n`;
    });
    fullContent += `## الخلاصة\n\n${article.content.conclusion}`;

    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: fullContent,
      author: "فريق التحرير", // Default author
      publishDate: article.date,
      category: article.category,
      isPublished: true,
      slug: article.slug,
      readTime: article.readTime,
      image: article.image,
      metaDescription: article.metaDescription,
      tags: article.tags
    };
  };

  // Initialize articles from stored data or convert from initial articles
  const [articles, setArticles] = useKV<AdminArticle[]>("admin-articles", []);
  
  // Ensure articles is always an array
  const safeArticles = Array.isArray(articles) ? articles : [];
  
  // Initialize articles if empty
  useEffect(() => {
    if (!safeArticles || safeArticles.length === 0) {
      const convertedArticles = initialArticles.map(convertToAdminFormat);
      setArticles(convertedArticles);
    }
  }, [safeArticles]);

  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [useStructuredEditor, setUseStructuredEditor] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [selectedImageField, setSelectedImageField] = useState<'new' | 'edit'>('new');
  const [newArticle, setNewArticle] = useState<Partial<AdminArticle>>({
    title: "",
    excerpt: "",
    content: "",
    contentSections: [],
    author: "",
    publishDate: new Date().toISOString().split('T')[0],
    category: "",
    isPublished: false,
    slug: "",
    readTime: "5 دقائق قراءة",
    image: "",
    metaDescription: "",
    tags: []
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFFa-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Convert structured content to text
  const sectionsToText = (sections: ContentSection[]) => {
    return sections
      .sort((a, b) => a.order - b.order)
      .map(section => {
        switch (section.type) {
          case 'heading':
            return `## ${section.content}`;
          case 'subheading':
            return `### ${section.content}`;
          case 'paragraph':
            return section.content;
          default:
            return section.content;
        }
      })
      .join('\n\n');
  };

  // Convert text content to structured sections
  const textToSections = (text: string): ContentSection[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const sections: ContentSection[] = [];
    let order = 0;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        sections.push({
          id: Date.now().toString() + order,
          type: 'subheading',
          content: trimmed.replace('### ', ''),
          order: order++
        });
      } else if (trimmed.startsWith('## ')) {
        sections.push({
          id: Date.now().toString() + order,
          type: 'heading',
          content: trimmed.replace('## ', ''),
          order: order++
        });
      } else if (trimmed) {
        sections.push({
          id: Date.now().toString() + order,
          type: 'paragraph',
          content: trimmed,
          order: order++
        });
      }
    });

    return sections;
  };

  // Add new content section
  const addContentSection = (type: 'heading' | 'subheading' | 'paragraph', isEditing = false) => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type,
      content: '',
      order: isEditing 
        ? (editingArticle?.contentSections?.length || 0)
        : (newArticle.contentSections?.length || 0)
    };

    if (isEditing && editingArticle) {
      setEditingArticle(prev => ({
        ...prev!,
        contentSections: [...(prev!.contentSections || []), newSection]
      }));
    } else {
      setNewArticle(prev => ({
        ...prev,
        contentSections: [...(prev.contentSections || []), newSection]
      }));
    }
  };

  // Update content section
  const updateContentSection = (sectionId: string, content: string, isEditing = false) => {
    if (isEditing && editingArticle) {
      setEditingArticle(prev => ({
        ...prev!,
        contentSections: (prev!.contentSections || []).map(section =>
          section.id === sectionId ? { ...section, content } : section
        )
      }));
    } else {
      setNewArticle(prev => ({
        ...prev,
        contentSections: (prev.contentSections || []).map(section =>
          section.id === sectionId ? { ...section, content } : section
        )
      }));
    }
  };

  // Remove content section
  const removeContentSection = (sectionId: string, isEditing = false) => {
    if (isEditing && editingArticle) {
      setEditingArticle(prev => ({
        ...prev!,
        contentSections: (prev!.contentSections || []).filter(section => section.id !== sectionId)
      }));
    } else {
      setNewArticle(prev => ({
        ...prev,
        contentSections: (prev.contentSections || []).filter(section => section.id !== sectionId)
      }));
    }
  };

  // Move section up/down
  const moveSectionOrder = (sectionId: string, direction: 'up' | 'down', isEditing = false) => {
    const sections = isEditing ? editingArticle?.contentSections || [] : newArticle.contentSections || [];
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) return;
    
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      // Swap elements
      [newSections[sectionIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[sectionIndex]];
      
      // Update order values
      newSections.forEach((section, index) => {
        section.order = index;
      });

      if (isEditing && editingArticle) {
        setEditingArticle(prev => ({
          ...prev!,
          contentSections: newSections
        }));
      } else {
        setNewArticle(prev => ({
          ...prev,
          contentSections: newSections
        }));
      }
    }
  };

  // Handle image selection
  const handleImageSelect = (imageOption: ImageOption) => {
    if (selectedImageField === 'new') {
      setNewArticle(prev => ({ ...prev, image: imageOption.src }));
    } else if (editingArticle) {
      setEditingArticle(prev => ({ ...prev!, image: imageOption.src }));
    }
    setShowImageSelector(false);
    toast.success(`تم اختيار الصورة: ${imageOption.name}`);
  };

  // Image Selector Component
  const ImageSelectorDialog = () => (
    <Dialog open={showImageSelector} onOpenChange={setShowImageSelector}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>اختيار صورة للمقال</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Filter by category */}
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(availableImages.map(img => img.category))).map(category => (
              <Badge key={category} variant="outline" className="cursor-pointer">
                {category}
              </Badge>
            ))}
          </div>

          {/* Images grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableImages.map((imageOption) => (
              <Card 
                key={imageOption.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
                onClick={() => handleImageSelect(imageOption)}
              >
                <CardContent className="p-4">
                  <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={imageOption.src} 
                      alt={imageOption.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{imageOption.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {imageOption.size}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {imageOption.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>نسبة العرض: {imageOption.aspectRatio}</span>
                      <Badge variant="outline" className="text-xs">
                        {imageOption.category}
                      </Badge>
                    </div>
                    
                    <Button 
                      className="w-full gap-2" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSelect(imageOption);
                      }}
                    >
                      <Check className="h-3 w-3" />
                      اختيار هذه الصورة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom URL option */}
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">أو استخدم رابط صورة مخصص</h4>
            <div className="flex gap-2">
              <Input 
                placeholder="https://example.com/image.jpg"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const url = e.currentTarget.value.trim();
                    if (url) {
                      if (selectedImageField === 'new') {
                        setNewArticle(prev => ({ ...prev, image: url }));
                      } else if (editingArticle) {
                        setEditingArticle(prev => ({ ...prev!, image: url }));
                      }
                      setShowImageSelector(false);
                      toast.success("تم حفظ رابط الصورة المخصص");
                    }
                  }
                }}
              />
              <Button 
                variant="outline"
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="example.com"]') as HTMLInputElement;
                  const url = input?.value.trim();
                  if (url) {
                    if (selectedImageField === 'new') {
                      setNewArticle(prev => ({ ...prev, image: url }));
                    } else if (editingArticle) {
                      setEditingArticle(prev => ({ ...prev!, image: url }));
                    }
                    setShowImageSelector(false);
                    toast.success("تم حفظ رابط الصورة المخصص");
                  }
                }}
              >
                حفظ
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.excerpt) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Ensure we have content in either format
    let finalContent = newArticle.content || "";
    let finalSections = newArticle.contentSections || [];

    if (useStructuredEditor && finalSections.length > 0) {
      finalContent = sectionsToText(finalSections);
    } else if (!useStructuredEditor && finalContent) {
      finalSections = textToSections(finalContent);
    }

    if (!finalContent && finalSections.length === 0) {
      toast.error("يرجى إضافة محتوى للمقال");
      return;
    }

    const article: AdminArticle = {
      ...newArticle as AdminArticle,
      id: Date.now().toString(),
      slug: newArticle.slug || generateSlug(newArticle.title || ""),
      readTime: newArticle.readTime || "5 دقائق قراءة",
      image: newArticle.image || "",
      metaDescription: newArticle.metaDescription || newArticle.excerpt || "",
      tags: newArticle.tags || [],
      content: finalContent,
      contentSections: finalSections
    };

    setArticles((prev) => [...(prev || []), article]);
    setNewArticle({
      title: "",
      excerpt: "",
      content: "",
      contentSections: [],
      author: "",
      publishDate: new Date().toISOString().split('T')[0],
      category: "",
      isPublished: false,
      slug: "",
      readTime: "5 دقائق قراءة",
      image: "",
      metaDescription: "",
      tags: []
    });
    setShowAddForm(false);
    setUseStructuredEditor(false);
    toast.success("تم إضافة المقال بنجاح");
  };

  const handleUpdateArticle = () => {
    if (!editingArticle) return;

    // Sync content between text and structured formats
    let finalContent = editingArticle.content;
    let finalSections = editingArticle.contentSections || [];

    if (finalSections.length > 0) {
      finalContent = sectionsToText(finalSections);
    } else if (finalContent) {
      finalSections = textToSections(finalContent);
    }

    const updatedArticle = {
      ...editingArticle,
      content: finalContent,
      contentSections: finalSections
    };

    setArticles((prev) => 
      (prev || []).map(article => 
        article.id === editingArticle.id ? updatedArticle : article
      )
    );
    setEditingArticle(null);
    toast.success("تم تحديث المقال بنجاح");
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles((prev) => (prev || []).filter(article => article.id !== articleId));
    toast.success("تم حذف المقال بنجاح");
  };

  const togglePublished = (articleId: string) => {
    setArticles((prev) => 
      (prev || []).map(article => 
        article.id === articleId 
          ? { ...article, isPublished: !article.isPublished }
          : article
      )
    );
  };

  // Structured Content Editor Component
  const StructuredContentEditor = ({ 
    sections, 
    onAddSection, 
    onUpdateSection, 
    onRemoveSection, 
    onMoveSection 
  }: {
    sections: ContentSection[];
    onAddSection: (type: 'heading' | 'subheading' | 'paragraph') => void;
    onUpdateSection: (id: string, content: string) => void;
    onRemoveSection: (id: string) => void;
    onMoveSection: (id: string, direction: 'up' | 'down') => void;
  }) => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddSection('heading')}
          className="gap-2"
        >
          <Type className="h-4 w-4" />
          عنوان رئيسي
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddSection('subheading')}
          className="gap-2"
        >
          <Type className="h-3 w-3" />
          عنوان فرعي
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddSection('paragraph')}
          className="gap-2"
        >
          <AlignLeft className="h-4 w-4" />
          فقرة
        </Button>
      </div>

      {sections
        .sort((a, b) => a.order - b.order)
        .map((section, index) => (
          <Card key={section.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveSection(section.id, 'up')}
                  disabled={index === 0}
                  className="h-6 w-6 p-0"
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveSection(section.id, 'down')}
                  disabled={index === sections.length - 1}
                  className="h-6 w-6 p-0"
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={
                    section.type === 'heading' ? 'default' :
                    section.type === 'subheading' ? 'secondary' : 'outline'
                  }>
                    {section.type === 'heading' && 'عنوان رئيسي'}
                    {section.type === 'subheading' && 'عنوان فرعي'}
                    {section.type === 'paragraph' && 'فقرة'}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveSection(section.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {section.type === 'paragraph' ? (
                  <Textarea
                    value={section.content}
                    onChange={(e) => onUpdateSection(section.id, e.target.value)}
                    placeholder="اكتب محتوى الفقرة..."
                    rows={3}
                  />
                ) : (
                  <Input
                    value={section.content}
                    onChange={(e) => onUpdateSection(section.id, e.target.value)}
                    placeholder={section.type === 'heading' ? 'العنوان الرئيسي...' : 'العنوان الفرعي...'}
                  />
                )}
              </div>
            </div>
          </Card>
        ))}

      {sections.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <AlignLeft className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>لم يتم إضافة أي محتوى بعد</p>
          <p className="text-sm">استخدم الأزرار أعلاه لإضافة عناوين وفقرات</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <ImageSelectorDialog />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المقالات</h2>
          <p className="text-muted-foreground">
            إضافة وتعديل وحذف مقالات الموقع ({safeArticles.length} مقال)
          </p>
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
                <Label htmlFor="new-readTime">وقت القراءة</Label>
                <Input
                  id="new-readTime"
                  value={newArticle.readTime}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="5 دقائق قراءة"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="new-slug">الرابط (slug)</Label>
                <Input
                  id="new-slug"
                  value={newArticle.slug}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-url-slug"
                />
              </div>
              <div>
                <Label>صورة المقال</Label>
                <div className="space-y-2">
                  {newArticle.image && (
                    <div className="relative">
                      <img 
                        src={newArticle.image} 
                        alt="معاينة الصورة"
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setNewArticle(prev => ({ ...prev, image: "" }))}
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedImageField('new');
                        setShowImageSelector(true);
                      }}
                      className="gap-2 flex-1"
                    >
                      <Image className="h-4 w-4" />
                      اختيار صورة
                    </Button>
                    {newArticle.image && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(newArticle.image, '_blank')}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        معاينة
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="new-metaDescription">وصف SEO</Label>
              <Textarea
                id="new-metaDescription"
                value={newArticle.metaDescription}
                onChange={(e) => setNewArticle(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="وصف المقال لمحركات البحث"
                rows={2}
              />
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
              <div className="flex items-center justify-between mb-2">
                <Label>المحتوى *</Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="editor-toggle" className="text-sm font-normal">
                    محرر منظم
                  </Label>
                  <input
                    id="editor-toggle"
                    type="checkbox"
                    checked={useStructuredEditor}
                    onChange={(e) => {
                      setUseStructuredEditor(e.target.checked);
                      if (e.target.checked && newArticle.content) {
                        // Convert existing text to sections
                        setNewArticle(prev => ({
                          ...prev,
                          contentSections: textToSections(prev.content || "")
                        }));
                      }
                    }}
                    className="rounded"
                  />
                </div>
              </div>

              {useStructuredEditor ? (
                <StructuredContentEditor
                  sections={newArticle.contentSections || []}
                  onAddSection={(type) => addContentSection(type)}
                  onUpdateSection={(id, content) => updateContentSection(id, content)}
                  onRemoveSection={(id) => removeContentSection(id)}
                  onMoveSection={(id, direction) => moveSectionOrder(id, direction)}
                />
              ) : (
                <>
                  <Textarea
                    id="new-content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="محتوى المقال الكامل - استخدم ## للعناوين الفرعية"
                    rows={12}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    نصيحة: استخدم ## للعناوين الرئيسية و ### للعناوين الفرعية
                  </p>
                </>
              )}
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
        {safeArticles.map((article) => (
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

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>التصنيف</Label>
                      <Input
                        value={editingArticle.category}
                        onChange={(e) => setEditingArticle(prev => ({ 
                          ...prev!, 
                          category: e.target.value 
                        }))}
                      />
                    </div>
                    <div>
                      <Label>تاريخ النشر</Label>
                      <Input
                        value={editingArticle.publishDate}
                        onChange={(e) => setEditingArticle(prev => ({ 
                          ...prev!, 
                          publishDate: e.target.value 
                        }))}
                      />
                    </div>
                    <div>
                      <Label>وقت القراءة</Label>
                      <Input
                        value={editingArticle.readTime || ""}
                        onChange={(e) => setEditingArticle(prev => ({ 
                          ...prev!, 
                          readTime: e.target.value 
                        }))}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>الرابط (slug)</Label>
                      <Input
                        value={editingArticle.slug}
                        onChange={(e) => setEditingArticle(prev => ({ 
                          ...prev!, 
                          slug: e.target.value 
                        }))}
                      />
                    </div>
                    <div>
                      <Label>صورة المقال</Label>
                      <div className="space-y-2">
                        {editingArticle.image && (
                          <div className="relative">
                            <img 
                              src={editingArticle.image} 
                              alt="معاينة الصورة"
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => setEditingArticle(prev => ({ ...prev!, image: "" }))}
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setSelectedImageField('edit');
                              setShowImageSelector(true);
                            }}
                            className="gap-2 flex-1"
                          >
                            <Image className="h-4 w-4" />
                            اختيار صورة
                          </Button>
                          {editingArticle.image && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(editingArticle.image, '_blank')}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              معاينة
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>وصف SEO</Label>
                    <Textarea
                      value={editingArticle.metaDescription || ""}
                      onChange={(e) => setEditingArticle(prev => ({ 
                        ...prev!, 
                        metaDescription: e.target.value 
                      }))}
                      rows={2}
                    />
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
                    <div className="flex items-center justify-between mb-2">
                      <Label>المحتوى</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!editingArticle.contentSections || editingArticle.contentSections.length === 0) {
                            // Convert text to sections
                            setEditingArticle(prev => ({
                              ...prev!,
                              contentSections: textToSections(prev!.content)
                            }));
                          }
                        }}
                        className="gap-2"
                      >
                        <Type className="h-4 w-4" />
                        تبديل للمحرر المنظم
                      </Button>
                    </div>

                    {editingArticle.contentSections && editingArticle.contentSections.length > 0 ? (
                      <div className="space-y-4">
                        <StructuredContentEditor
                          sections={editingArticle.contentSections}
                          onAddSection={(type) => addContentSection(type, true)}
                          onUpdateSection={(id, content) => updateContentSection(id, content, true)}
                          onRemoveSection={(id) => removeContentSection(id, true)}
                          onMoveSection={(id, direction) => moveSectionOrder(id, direction, true)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingArticle(prev => ({ ...prev!, contentSections: [] }))}
                        >
                          العودة للمحرر النصي
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Textarea
                          value={editingArticle.content}
                          onChange={(e) => setEditingArticle(prev => ({ 
                            ...prev!, 
                            content: e.target.value 
                          }))}
                          rows={10}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          استخدم ## للعناوين الرئيسية و ### للعناوين الفرعية
                        </p>
                      </>
                    )}
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
                <div className="flex items-start gap-4">
                  {/* Article Image Preview */}
                  {article.image && (
                    <div className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
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
                    <div className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      المحتوى: {article.content.substring(0, 150)}...
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.publishDate}
                      </span>
                      <span>بواسطة: {article.author}</span>
                      <span>التصنيف: {article.category}</span>
                      {article.readTime && <span>{article.readTime}</span>}
                      {article.image && (
                        <span className="flex items-center gap-1 text-primary">
                          <Image className="h-3 w-3" />
                          صورة
                        </span>
                      )}
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

      {(!safeArticles || safeArticles.length === 0) && (
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