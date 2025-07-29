import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Save, Edit3, Eye, Plus, Trash2, AlertTriangle, HelpCircle, Users, Star, TrendUp, ShieldWarning } from "@phosphor-icons/react";

export function HomePageManager() {
  // Hero Section State
  const [heroContent, setHeroContent] = useKV("admin-hero-content", {
    headline: "دليل شامل لأفضل الوسطاء الماليين في السعودية",
    subheadline: "اكتشف وقارن أفضل الوسطاء المرخصين في المملكة العربية السعودية. نوفر لك تقييمات شاملة وحقيقية من متداولين سعوديين لمساعدتك في اختيار الوسيط المناسب لاحتياجاتك الاستثمارية. جميع الوسطاء مرخصون ومنظمون من قبل هيئة السوق المالية."
  });

  // Recommended Brokers Section State
  const [brokersSection, setBrokersSection] = useKV("admin-brokers-section", {
    title: "الوسطاء الموصى بهم",
    subtitle: "وسيط مرخص",
    buttonText: "عرض جميع الوسطاء"
  });

  // FAQ Section State
  const [faqSection, setFaqSection] = useKV("admin-faq-section", {
    title: "الأسئلة الشائعة",
    subtitle: "إجابات على أهم الأسئلة حول اختيار الوسطاء الماليين",
    contactCta: {
      title: "لديك سؤال آخر؟",
      subtitle: "لا تتردد في التواصل معنا للحصول على إجابات مخصصة لاستفساراتك",
      buttonText: "اطرح سؤالك الآن"
    }
  });

  // FAQ Items State  
  const [faqItems, setFaqItems] = useKV("admin-faq-items", [
    {
      id: "q1",
      question: "كيف أختار الوسيط المالي المناسب؟",
      answer: "عند اختيار الوسيط المالي، يجب التأكد من حصوله على ترخيص من هيئة السوق المالية السعودية أو مؤسسة النقد العربي السعودي. كما يُنصح بمراجعة هيكل الرسوم، جودة منصة التداول، خدمة العملاء، والمنتجات المالية المتاحة."
    },
    {
      id: "q2", 
      question: "ما هي الرسوم المتوقعة عند التداول؟",
      answer: "تختلف الرسوم بين الوسطاء، ولكن عادة تشمل: رسوم العمولة على كل صفقة (تتراوح من 0.05% إلى 0.25%)، رسوم حفظ الأوراق المالية، رسوم التحويل والسحب، ورسوم عدم النشاط في بعض الحالات."
    }
  ]);

  // Best Brokers Management State
  const [bestBrokers, setBestBrokers] = useKV("admin-best-brokers", [
    { id: "exness", name: "Exness", enabled: true },
    { id: "avatrade", name: "AvaTrade", enabled: true },
    { id: "etoro", name: "eToro", enabled: true }
  ]);

  // Scam Brokers Management State  
  const [scamBrokers, setScamBrokers] = useKV("admin-scam-brokers", [
    { id: "scam1", name: "شركة وهمية 1", enabled: true },
    { id: "scam2", name: "شركة وهمية 2", enabled: true }
  ]);

  // Fraud Warning Section State
  const [fraudSection, setFraudSection] = useKV("admin-fraud-section", {
    title: "تحذيرات الشركات النصابة",
    tips: {
      title: "نصائح لتجنب الاحتيال:",
      items: [
        "تأكد من الترخيص من هيئة السوق المالية",
        "احذر الوعود بأرباح مضمونة", 
        "تجنب الإيداعات الكبيرة المسبقة"
      ]
    }
  });

  // Articles Section State
  const [articlesSection, setArticlesSection] = useKV("admin-articles-section", {
    title: "مقالات ونصائح التداول",
    subtitle: "أحدث المقالات والنصائح لتطوير مهاراتك في التداول",
    buttonText: "عرض جميع المقالات"
  });

  // Editing states
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<any>({});
  const [newFaqItem, setNewFaqItem] = useState({ question: "", answer: "" });
  const [newFraudTip, setNewFraudTip] = useState("");
  const [newBestBroker, setNewBestBroker] = useState({ id: "", name: "" });
  const [newScamBroker, setNewScamBroker] = useState({ id: "", name: "" });

  const handleSave = (section: string) => {
    const safeContent = tempContent || {};
    switch(section) {
      case 'hero':
        setHeroContent(safeContent);
        break;
      case 'brokers':
        setBrokersSection(safeContent);
        break;
      case 'faq':
        setFaqSection(safeContent);
        break;
      case 'fraud':
        setFraudSection(safeContent);
        break;
      case 'articles':
        setArticlesSection(safeContent);
        break;
    }
    setEditingSection(null);
    setTempContent({});
    toast.success("تم حفظ التغييرات بنجاح");
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempContent({});
  // Helper function to safely update temp content
  const updateTempContent = (updater: (prev: any) => any) => {
    setTempContent(prev => updater(prev || {}));
  };
    setEditingSection(section);
    
    // Ensure proper default structure for each section
    switch(section) {
      case 'hero':
        setTempContent(currentContent || { headline: "", subheadline: "" });
        break;
      case 'brokers':
        setTempContent(currentContent || { title: "", subtitle: "", buttonText: "" });
        break;
      case 'fraud':
        setTempContent(currentContent || { 
          title: "", 
          tips: { title: "", items: [] } 
        });
        break;
      case 'articles':
        setTempContent(currentContent || { title: "", subtitle: "", buttonText: "" });
        break;
      case 'faq':
        setTempContent(currentContent || { 
          title: "", 
          subtitle: "", 
          contactCta: { title: "", subtitle: "", buttonText: "" } 
        });
        break;
      default:
        setTempContent(currentContent || {});
    }
  };

  const addFaqItem = () => {
    if (newFaqItem.question.trim() && newFaqItem.answer.trim()) {
      const newItem = {
        id: `q${Date.now()}`,
        question: newFaqItem.question.trim(),
        answer: newFaqItem.answer.trim()
      };
      setFaqItems(current => [...(current || []), newItem]);
      setNewFaqItem({ question: "", answer: "" });
      toast.success("تم إضافة السؤال بنجاح");
    }
  };

  const deleteFaqItem = (id: string) => {
    setFaqItems(current => (current || []).filter(item => item.id !== id));
    toast.success("تم حذف السؤال بنجاح");
  };

  const addFraudTip = () => {
    if (newFraudTip.trim()) {
      setFraudSection(current => ({
        ...current,
        tips: {
          ...current.tips,
          items: [...(current.tips?.items || []), newFraudTip.trim()]
        }
      }));
      setNewFraudTip("");
      toast.success("تم إضافة النصيحة بنجاح");
    }
  };

  const deleteFraudTip = (index: number) => {
    setFraudSection(current => ({
      ...current,
      tips: {
        ...current.tips,
        items: ((current || {}).tips?.items || []).filter((_, i) => i !== index)
      }
    }));
    toast.success("تم حذف النصيحة بنجاح");
  };

  // Best Brokers Management Functions
  const addBestBroker = () => {
    if (newBestBroker.id.trim() && newBestBroker.name.trim()) {
      const newBroker = {
        id: newBestBroker.id.trim(),
        name: newBestBroker.name.trim(),
        enabled: true
      };
      setBestBrokers(current => [...(current || []), newBroker]);
      setNewBestBroker({ id: "", name: "" });
      toast.success("تم إضافة الوسيط بنجاح");
    }
  };

  const deleteBestBroker = (brokerId: string) => {
    setBestBrokers(current => (current || []).filter(broker => broker.id !== brokerId));
    toast.success("تم حذف الوسيط بنجاح");
  };

  const toggleBestBroker = (brokerId: string) => {
    if (!brokerId) return;
    setBestBrokers(current => 
      (current || []).filter(Boolean).map(broker => 
        broker?.id === brokerId ? { ...broker, enabled: !broker.enabled } : broker
      )
    );
    toast.success("تم تحديث حالة الوسيط");
  };

  // Scam Brokers Management Functions
  const addScamBroker = () => {
    if (newScamBroker.id.trim() && newScamBroker.name.trim()) {
      const newBroker = {
        id: newScamBroker.id.trim(),
        name: newScamBroker.name.trim(),
        enabled: true
      };
      setScamBrokers(current => [...(current || []), newBroker]);
      setNewScamBroker({ id: "", name: "" });
      toast.success("تم إضافة الشركة المحذرة بنجاح");
    }
  };

  const deleteScamBroker = (brokerId: string) => {
    if (!brokerId) return;
    setScamBrokers(current => (current || []).filter(broker => broker?.id !== brokerId));
    toast.success("تم حذف الشركة المحذرة بنجاح");
  };

  const toggleScamBroker = (brokerId: string) => {
    if (!brokerId) return;
    setScamBrokers(current => 
      (current || []).filter(Boolean).map(broker => 
        broker?.id === brokerId ? { ...broker, enabled: !broker.enabled } : broker
      )
    );
    toast.success("تم تحديث حالة الشركة المحذرة");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الصفحة الرئيسية</h2>
          <p className="text-muted-foreground">تحكم في جميع أقسام ومحتوى الصفحة الرئيسية</p>
        </div>
        <Button
          onClick={() => window.open('/', '_blank')}
          variant="outline"
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          معاينة الموقع
        </Button>
      </div>

      {/* Hero Section Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            قسم البطل (Hero Section)
          </CardTitle>
          {editingSection !== 'hero' && (
            <Button onClick={() => startEditing('hero', heroContent)} variant="outline" size="sm">
              تعديل
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'hero' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="headline">العنوان الرئيسي</Label>
                <Input
                  id="headline"
                  value={tempContent?.headline || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...(prev || {}), 
                    headline: e.target.value 
                  }))}
                  placeholder="أدخل العنوان الرئيسي"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subheadline">العنوان الفرعي</Label>
                <Textarea
                  id="subheadline"
                  value={tempContent?.subheadline || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...(prev || {}), 
                    subheadline: e.target.value 
                  }))}
                  placeholder="أدخل العنوان الفرعي"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('hero')} className="gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">عنوان القسم:</h3>
                <p className="p-4 bg-muted rounded-lg">{heroContent?.headline || "العنوان الرئيسي"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">العنوان الفرعي:</h3>
                <p className="p-4 bg-muted rounded-lg leading-relaxed">
                  {heroContent?.subheadline || "العنوان الفرعي"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Brokers Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            قسم الوسطاء الموصى بهم
          </CardTitle>
          {editingSection !== 'brokers' && (
            <Button onClick={() => startEditing('brokers', brokersSection)} variant="outline" size="sm">
              تعديل
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'brokers' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="brokers-title">عنوان القسم</Label>
                <Input
                  id="brokers-title"
                  value={tempContent?.title || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...(prev || {}), 
                    title: e.target.value 
                  }))}
                  placeholder="أدخل عنوان القسم"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brokers-subtitle">النص التوضيحي</Label>
                <Input
                  id="brokers-subtitle"
                  value={tempContent?.subtitle || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...(prev || {}), 
                    subtitle: e.target.value 
                  }))}
                  placeholder="أدخل النص التوضيحي"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brokers-button">نص زر عرض المزيد</Label>
                <Input
                  id="brokers-button"
                  value={tempContent?.buttonText || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    buttonText: e.target.value 
                  }))}
                  placeholder="أدخل نص الزر"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('brokers')} className="gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">عنوان القسم:</h3>
                <p className="p-4 bg-muted rounded-lg">{brokersSection?.title || "الوسطاء الموصى بهم"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">النص التوضيحي:</h3>
                <p className="p-4 bg-muted rounded-lg">{brokersSection?.subtitle || "وسيط مرخص"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">نص زر عرض المزيد:</h3>
                <p className="p-4 bg-muted rounded-lg">{brokersSection?.buttonText || "عرض جميع الوسطاء"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Brokers Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendUp className="h-5 w-5" />
            إدارة الوسطاء الموصى بهم
          </CardTitle>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  إضافة وسيط جديد
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة وسيط موصى به</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-broker-id">معرف الوسيط (ID)</Label>
                    <Input
                      id="new-broker-id"
                      value={newBestBroker.id}
                      onChange={(e) => setNewBestBroker(prev => ({ 
                        ...prev, 
                        id: e.target.value 
                      }))}
                      placeholder="مثل: exness, avatrade"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-broker-name">اسم الوسيط</Label>
                    <Input
                      id="new-broker-name"
                      value={newBestBroker.name}
                      onChange={(e) => setNewBestBroker(prev => ({ 
                        ...prev, 
                        name: e.target.value 
                      }))}
                      placeholder="أدخل اسم الوسيط"
                    />
                  </div>

                  <Button onClick={addBestBroker} className="w-full">
                    إضافة الوسيط
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            إدارة قائمة الوسطاء التي تظهر في قسم "الوسطاء الموصى بهم" في الصفحة الرئيسية
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>نصيحة:</strong> يمكنك أيضاً إضافة الوسطاء إلى قائمة الموصى بهم مباشرة من صفحة مراجعة الوسيط أو من صفحة إدارة الوسطاء.
            </p>
          </div>
          
          <div className="space-y-3">
            {(bestBrokers || []).map((broker) => (
              <div key={broker?.id || Math.random()} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={broker?.enabled ? "default" : "secondary"}>
                    {broker?.enabled ? "مفعل" : "معطل"}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{broker?.name || ''}</h4>
                    <p className="text-sm text-muted-foreground">ID: {broker?.id || ''}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleBestBroker(broker?.id)}
                  >
                    {broker.enabled ? "إلغاء التفعيل" : "تفعيل"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteBestBroker(broker.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {(bestBrokers || []).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <TrendUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد وسطاء موصى بهم حالياً</p>
                <p className="text-sm">انقر على "إضافة وسيط جديد" لبدء إنشاء القائمة</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scam Brokers Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShieldWarning className="h-5 w-5" />
            إدارة الشركات المحذرة (النصابة)
          </CardTitle>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="destructive" className="gap-2">
                  <Plus className="h-4 w-4" />
                  إضافة شركة محذرة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة شركة محذرة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-scam-id">معرف الشركة (ID)</Label>
                    <Input
                      id="new-scam-id"
                      value={newScamBroker.id}
                      onChange={(e) => setNewScamBroker(prev => ({ 
                        ...prev, 
                        id: e.target.value 
                      }))}
                      placeholder="مثل: scam-company-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-scam-name">اسم الشركة المحذرة</Label>
                    <Input
                      id="new-scam-name"
                      value={newScamBroker.name}
                      onChange={(e) => setNewScamBroker(prev => ({ 
                        ...prev, 
                        name: e.target.value 
                      }))}
                      placeholder="أدخل اسم الشركة المحذرة"
                    />
                  </div>

                  <Button onClick={addScamBroker} variant="destructive" className="w-full">
                    إضافة الشركة المحذرة
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            إدارة قائمة الشركات النصابة التي تظهر في قسم التحذيرات في الصفحة الرئيسية
          </p>
          
          <div className="space-y-3">
            {(scamBrokers || []).map((broker) => (
              <div key={broker?.id || Math.random()} className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="flex items-center gap-3">
                  <Badge variant={broker?.enabled ? "destructive" : "secondary"}>
                    {broker?.enabled ? "مفعل" : "معطل"}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{broker?.name || ''}</h4>
                    <p className="text-sm text-muted-foreground">ID: {broker?.id || ''}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleScamBroker(broker?.id)}
                  >
                    {broker?.enabled ? "إلغاء التفعيل" : "تفعيل"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteScamBroker(broker?.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {(scamBrokers || []).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <ShieldWarning className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد شركات محذرة حالياً</p>
                <p className="text-sm">انقر على "إضافة شركة محذرة" لبدء إنشاء القائمة</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Warning Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            قسم تحذيرات الشركات النصابة
          </CardTitle>
          {editingSection !== 'fraud' && (
            <Button onClick={() => startEditing('fraud', fraudSection)} variant="outline" size="sm">
              تعديل
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'fraud' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="fraud-title">عنوان القسم</Label>
                <Input
                  id="fraud-title"
                  value={tempContent?.title || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                  placeholder="أدخل عنوان القسم"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fraud-tips-title">عنوان نصائح الحماية</Label>
                <Input
                  id="fraud-tips-title"
                  value={tempContent.tips?.title || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    tips: { ...prev.tips, title: e.target.value }
                  }))}
                  placeholder="أدخل عنوان نصائح الحماية"
                />
              </div>

              <div className="space-y-2">
                <Label>النصائح الحالية:</Label>
                <div className="space-y-2">
                  {(tempContent.tips?.items || []).map((tip, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <span className="flex-1">{tip || ''}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const newItems = tempContent.tips?.items?.filter((_, i) => i !== index) || [];
                          setTempContent(prev => ({
                            ...prev,
                            tips: { ...prev.tips, items: newItems }
                          }));
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )) || []}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-tip">إضافة نصيحة جديدة</Label>
                <div className="flex gap-2">
                  <Input
                    id="new-tip"
                    value={newFraudTip}
                    onChange={(e) => setNewFraudTip(e.target.value)}
                    placeholder="أدخل نصيحة جديدة"
                  />
                  <Button 
                    onClick={() => {
                      if (newFraudTip.trim()) {
                        setTempContent(prev => ({
                          ...prev,
                          tips: {
                            ...prev.tips,
                            items: [...(prev.tips?.items || []), newFraudTip.trim()]
                          }
                        }));
                        setNewFraudTip("");
                      }
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('fraud')} className="gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">عنوان القسم:</h3>
                <p className="p-4 bg-muted rounded-lg">{fraudSection?.title || "تحذيرات الشركات النصابة"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">عنوان النصائح:</h3>
                <p className="p-4 bg-muted rounded-lg">{fraudSection?.tips?.title || "نصائح لتجنب الاحتيال:"}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">النصائح:</h3>
                <div className="space-y-2">
                  {((fraudSection || {}).tips?.items || []).map((tip, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <span className="flex-1">• {tip || ''}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFraudTip(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newFraudTip}
                      onChange={(e) => setNewFraudTip(e.target.value)}
                      placeholder="إضافة نصيحة جديدة"
                    />
                    <Button onClick={addFraudTip} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Articles Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            قسم المقالات والنصائح
          </CardTitle>
          {editingSection !== 'articles' && (
            <Button onClick={() => startEditing('articles', articlesSection)} variant="outline" size="sm">
              تعديل
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'articles' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="articles-title">عنوان القسم</Label>
                <Input
                  id="articles-title"
                  value={tempContent?.title || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                  placeholder="أدخل عنوان القسم"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="articles-subtitle">النص التوضيحي</Label>
                <Textarea
                  id="articles-subtitle"
                  value={tempContent?.subtitle || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    subtitle: e.target.value 
                  }))}
                  placeholder="أدخل النص التوضيحي"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="articles-button">نص زر عرض جميع المقالات</Label>
                <Input
                  id="articles-button"
                  value={tempContent.buttonText || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    buttonText: e.target.value 
                  }))}
                  placeholder="أدخل نص الزر"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('articles')} className="gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">عنوان القسم:</h3>
                <p className="p-4 bg-muted rounded-lg">{articlesSection?.title || "مقالات ونصائح التداول"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">النص التوضيحي:</h3>
                <p className="p-4 bg-muted rounded-lg">{articlesSection?.subtitle || "أحدث المقالات والنصائح"}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">نص الزر:</h3>
                <p className="p-4 bg-muted rounded-lg">{articlesSection?.buttonText || "عرض جميع المقالات"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            قسم الأسئلة الشائعة
          </CardTitle>
          {editingSection !== 'faq' && (
            <Button onClick={() => startEditing('faq', faqSection)} variant="outline" size="sm">
              تعديل العناوين
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'faq' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="faq-title">عنوان القسم</Label>
                <Input
                  id="faq-title"
                  value={tempContent?.title || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                  placeholder="أدخل عنوان القسم"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="faq-subtitle">النص التوضيحي</Label>
                <Textarea
                  id="faq-subtitle"
                  value={tempContent?.subtitle || ''}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    subtitle: e.target.value 
                  }))}
                  placeholder="أدخل النص التوضيحي"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">نموذج التواصل في النهاية:</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cta-title">عنوان نموذج التواصل</Label>
                  <Input
                    id="cta-title"
                    value={tempContent.contactCta?.title || ''}
                    onChange={(e) => setTempContent(prev => ({ 
                      ...prev, 
                      contactCta: { ...prev.contactCta, title: e.target.value }
                    }))}
                    placeholder="أدخل عنوان نموذج التواصل"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cta-subtitle">نص نموذج التواصل</Label>
                  <Textarea
                    id="cta-subtitle"
                    value={tempContent.contactCta?.subtitle || ''}
                    onChange={(e) => setTempContent(prev => ({ 
                      ...prev, 
                      contactCta: { ...prev.contactCta, subtitle: e.target.value }
                    }))}
                    placeholder="أدخل نص نموذج التواصل"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cta-button">نص زر التواصل</Label>
                  <Input
                    id="cta-button"
                    value={tempContent.contactCta?.buttonText || ''}
                    onChange={(e) => setTempContent(prev => ({ 
                      ...prev, 
                      contactCta: { ...prev.contactCta, buttonText: e.target.value }
                    }))}
                    placeholder="أدخل نص زر التواصل"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('faq')} className="gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">عنوان القسم:</h3>
                <p className="p-4 bg-muted rounded-lg">{faqSection?.title || "الأسئلة الشائعة"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">النص التوضيحي:</h3>
                <p className="p-4 bg-muted rounded-lg">{faqSection?.subtitle || "إجابات على أهم الأسئلة"}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">نموذج التواصل:</h3>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p><strong>العنوان:</strong> {faqSection?.contactCta?.title || "لديك سؤال آخر؟"}</p>
                  <p><strong>النص:</strong> {faqSection?.contactCta?.subtitle || "لا تتردد في التواصل معنا"}</p>
                  <p><strong>الزر:</strong> {faqSection?.contactCta?.buttonText || "اطرح سؤالك الآن"}</p>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Items Management */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">إدارة الأسئلة والأجوبة</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة سؤال جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>إضافة سؤال جديد</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-question">السؤال</Label>
                      <Input
                        id="new-question"
                        value={newFaqItem.question}
                        onChange={(e) => setNewFaqItem(prev => ({ 
                          ...prev, 
                          question: e.target.value 
                        }))}
                        placeholder="أدخل السؤال"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-answer">الإجابة</Label>
                      <Textarea
                        id="new-answer"
                        value={newFaqItem.answer}
                        onChange={(e) => setNewFaqItem(prev => ({ 
                          ...prev, 
                          answer: e.target.value 
                        }))}
                        placeholder="أدخل الإجابة"
                        rows={4}
                      />
                    </div>

                    <Button onClick={addFaqItem} className="w-full">
                      إضافة السؤال
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {(faqItems || []).map((item) => (
                <div key={item?.id || Math.random()} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{item?.question || ''}</h4>
                      <p className="text-sm text-muted-foreground">{item?.answer || ''}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteFaqItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {(faqItems || []).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد أسئلة شائعة حالياً</p>
                  <p className="text-sm">انقر على "إضافة سؤال جديد" لبدء إنشاء القائمة</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}