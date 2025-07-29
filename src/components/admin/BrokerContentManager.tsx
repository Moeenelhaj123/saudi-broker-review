import { useState, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, ArrowRight, Building2, RefreshCw, Plus, Trash2 } from "lucide-react";
import { brokers as staticBrokers } from "@/lib/data";

interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'heading' | 'subheading' | 'content';
}

interface BrokerContent {
  overview: string;
  tradingPlatforms: string;
  accountTypes: string;
  fees: string;
  regulation: string;
  pros: string[];
  cons: string[];
  conclusion: string;
  contact: string;
  summary: string;
  customSections: CustomSection[];
}

export function BrokerContentManager() {
  const { brokerId } = useParams();
  const [adminBrokers] = useKV<any[]>("admin-brokers", []);
  
  // Get initial content from static broker data
  const getInitialContent = (): BrokerContent => {
    const staticBroker = staticBrokers.find(b => b.id === brokerId);
    if (staticBroker) {
      return {
        overview: `شركة ${staticBroker.nameAr} (${staticBroker.name}) هي واحدة من الوسطاء الماليين الرائدين في سوق التداول العالمي. ${staticBroker.descriptionAr || staticBroker.description}

يتميز هذا الوسيط بتنظيم قوي من قبل جهات مرموقة مثل ${staticBroker.regulation.join(', ')}، مما يضمن أمان الأموال وحماية حقوق المتداولين. يوفر الوسيط بيئة تداول آمنة ومتطورة تناسب جميع مستويات المتداولين من المبتدئين إلى المحترفين.

الحد الأدنى للإيداع يبدأ من ${staticBroker.minDeposit} دولار أمريكي، مما يجعله متاحاً لشريحة واسعة من المتداولين. كما يوفر الوسيط فروقات تنافسية تبدأ ${staticBroker.spreads}، مما يساهم في تقليل تكاليف التداول.`,

        tradingPlatforms: `يوفر ${staticBroker.nameAr} مجموعة متنوعة من منصات التداول المتطورة لتلبية احتياجات جميع المتداولين:

${staticBroker.platforms.map(platform => `• ${platform}: منصة احترافية مع أدوات تحليل متقدمة وتنفيذ سريع للصفقات`).join('\n')}

جميع المنصات تتميز بواجهة سهلة الاستخدام وتوفر إمكانية التداول من أي مكان في العالم عبر النسخ المحمولة والمكتبية. كما تشمل أدوات تحليل فني شاملة ومؤشرات متقدمة لمساعدة المتداولين في اتخاذ قرارات استثمارية مدروسة.`,

        accountTypes: `يقدم ${staticBroker.nameAr} أنواع حسابات متنوعة تناسب جميع احتياجات المتداولين:

${staticBroker.accountTypes.map(account => `• ${account}: يوفر مزايا خاصة ومناسب لفئة معينة من المتداولين`).join('\n')}

كل نوع حساب مصمم خصيصاً لتلبية احتياجات محددة، بدءاً من المتداولين المبتدئين وصولاً إلى المتداولين المحترفين ذوي الخبرة العالية. كما يتم توفير حسابات تجريبية مجانية لممارسة التداول دون مخاطر.`,

        fees: `هيكل الرسوم في ${staticBroker.nameAr}:

• العمولة: ${staticBroker.fees.commission}
• رسوم السحب: ${staticBroker.fees.withdrawal}
• رسوم عدم النشاط: ${staticBroker.fees.inactivity}

يتميز الوسيط بشفافية كاملة في هيكل الرسوم، حيث لا توجد رسوم خفية. جميع التكاليف واضحة ومعلنة مسبقاً، مما يساعد المتداولين على حساب تكاليف التداول بدقة والتخطيط لاستراتيجياتهم الاستثمارية.`,

        regulation: `${staticBroker.nameAr} مرخص ومنظم من قبل أهم الجهات التنظيمية العالمية:

${staticBroker.regulation.map(reg => `• ${reg}: جهة تنظيمية مرموقة تضمن أعلى معايير الأمان والشفافية`).join('\n')}

هذا التنظيم الصارم يضمن أن الوسيط يلتزم بأعلى معايير الصناعة في حماية أموال العملاء وتوفير بيئة تداول عادلة وآمنة. كما يخضع الوسيط لمراجعات دورية من قبل هذه الجهات للتأكد من الامتثال المستمر.`,

        pros: staticBroker.pros || [],
        cons: staticBroker.cons || [],
        
        conclusion: `بناءً على التقييم الشامل، يعتبر ${staticBroker.nameAr} خياراً ممتازاً للمتداولين الذين يبحثون عن وسيط موثوق ومنظم بقوة. التقييم العام للوسيط ${staticBroker.rating}/5 بناءً على ${staticBroker.reviewCount} تقييم من المتداولين الفعليين.

نقاط القوة الرئيسية تشمل التنظيم القوي، والمنصات المتطورة، والدعم الممتاز. بينما نقاط التحسن المطلوبة تتعلق بتطوير بعض الخدمات الإضافية.

التوصية: مناسب للمتداولين من جميع المستويات، خاصة الذين يقدرون الأمان والتنظيم القوي.`,

        contact: `معلومات التواصل مع ${staticBroker.nameAr}:

• الموقع الرسمي: ${staticBroker.website}
• رقم الهاتف: ${staticBroker.phone}
• البريد الإلكتروني: ${staticBroker.email}

فريق خدمة العملاء متاح على مدار الساعة طوال أيام الأسبوع لتقديم الدعم والمساعدة. يمكن التواصل باللغة العربية والإنجليزية وعدة لغات أخرى.`,

        summary: `${staticBroker.nameAr} وسيط مالي عالمي مرخص ومنظم، يوفر بيئة تداول آمنة ومتطورة. الحد الأدنى للإيداع ${staticBroker.minDeposit} دولار، فروقات من ${staticBroker.spreads}، ودعم لمنصات التداول الرائدة. التقييم ${staticBroker.rating}/5 من ${staticBroker.reviewCount} مراجعة.`,
        customSections: []
      };
    }
    
    return {
      overview: "",
      tradingPlatforms: "",
      accountTypes: "",
      fees: "",
      regulation: "",
      pros: [],
      cons: [],
      conclusion: "",
      contact: "",
      summary: "",
      customSections: []
    };
  };

  const [brokerContent, setBrokerContent] = useKV<BrokerContent>(`broker-content-${brokerId}`, getInitialContent());

  const [tempContent, setTempContent] = useState<BrokerContent>(getInitialContent());

  // Update tempContent when brokerContent changes
  useEffect(() => {
    if (brokerContent) {
      setTempContent({
        overview: brokerContent.overview || "",
        tradingPlatforms: brokerContent.tradingPlatforms || "",
        accountTypes: brokerContent.accountTypes || "",
        fees: brokerContent.fees || "",
        regulation: brokerContent.regulation || "",
        pros: brokerContent.pros || [],
        cons: brokerContent.cons || [],
        conclusion: brokerContent.conclusion || "",
        contact: brokerContent.contact || "",
        summary: brokerContent.summary || "",
        customSections: brokerContent.customSections || []
      });
    }
  }, [brokerContent]);
  const [newPro, setNewPro] = useState("");
  const [newCon, setNewCon] = useState("");
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState("");
  const [newSectionType, setNewSectionType] = useState<'heading' | 'subheading' | 'content'>('content');

  // Find broker in admin list first, then fallback to static brokers
  const broker = (Array.isArray(adminBrokers) ? adminBrokers.find((b: any) => b.id === brokerId) : null) || 
                staticBrokers.find(b => b.id === brokerId);

  const handleSave = () => {
    setBrokerContent(tempContent);
    toast.success("تم حفظ محتوى الوسيط بنجاح");
  };

  const handleResetToDefault = () => {
    const defaultContent = getInitialContent();
    setTempContent(defaultContent);
    setBrokerContent(defaultContent);
    toast.success("تم إعادة تعيين المحتوى إلى القيم الافتراضية");
  };

  const addPro = () => {
    if (newPro.trim()) {
      setTempContent(prev => ({
        ...prev,
        pros: [...(prev.pros || []), newPro.trim()]
      }));
      setNewPro("");
    }
  };

  const addCon = () => {
    if (newCon.trim()) {
      setTempContent(prev => ({
        ...prev,
        cons: [...(prev.cons || []), newCon.trim()]
      }));
      setNewCon("");
    }
  };

  const removePro = (index: number) => {
    setTempContent(prev => ({
      ...prev,
      pros: (prev.pros || []).filter((_, i) => i !== index)
    }));
  };

  const removeCon = (index: number) => {
    setTempContent(prev => ({
      ...prev,
      cons: (prev.cons || []).filter((_, i) => i !== index)
    }));
  };

  const addCustomSection = () => {
    if (newSectionTitle.trim()) {
      const newSection: CustomSection = {
        id: `section-${Date.now()}`,
        title: newSectionTitle.trim(),
        content: newSectionContent.trim(),
        type: newSectionType
      };
      
      setTempContent(prev => ({
        ...prev,
        customSections: [...(prev.customSections || []), newSection]
      }));
      
      setNewSectionTitle("");
      setNewSectionContent("");
      setNewSectionType('content');
    }
  };

  const removeCustomSection = (sectionId: string) => {
    setTempContent(prev => ({
      ...prev,
      customSections: (prev.customSections || []).filter(section => section.id !== sectionId)
    }));
  };

  const updateCustomSection = (sectionId: string, field: keyof CustomSection, value: string) => {
    setTempContent(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  if (!broker) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">الوسيط غير موجود</h3>
        <p className="text-muted-foreground">لم يتم العثور على الوسيط المطلوب</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">محتوى الوسيط: {broker.nameAr || broker.name}</h2>
          <p className="text-muted-foreground">إدارة المحتوى التفصيلي لصفحة الوسيط</p>
        </div>
        <div className="flex gap-2 mr-auto">
          <Button onClick={handleResetToDefault} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            إعادة تعيين
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            حفظ جميع التغييرات
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="platforms">المنصات</TabsTrigger>
          <TabsTrigger value="accounts">الحسابات</TabsTrigger>
          <TabsTrigger value="fees">الرسوم</TabsTrigger>
          <TabsTrigger value="regulation">التنظيم</TabsTrigger>
          <TabsTrigger value="proscons">المزايا والعيوب</TabsTrigger>
          <TabsTrigger value="contact">التواصل</TabsTrigger>
          <TabsTrigger value="summary">الملخص</TabsTrigger>
          <TabsTrigger value="custom">أقسام مخصصة</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>نظرة عامة على الوسيط</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="overview">المحتوى</Label>
                <Textarea
                  id="overview"
                  value={tempContent.overview}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    overview: e.target.value 
                  }))}
                  placeholder="اكتب نظرة عامة شاملة عن الوسيط..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms">
          <Card>
            <CardHeader>
              <CardTitle>منصات التداول</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platforms">المحتوى</Label>
                <Textarea
                  id="platforms"
                  value={tempContent.tradingPlatforms}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    tradingPlatforms: e.target.value 
                  }))}
                  placeholder="اكتب عن منصات التداول المتاحة..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>أنواع الحسابات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="accounts">المحتوى</Label>
                <Textarea
                  id="accounts"
                  value={tempContent.accountTypes}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    accountTypes: e.target.value 
                  }))}
                  placeholder="اكتب عن أنواع الحسابات المتاحة..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>الرسوم والعمولات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fees">المحتوى</Label>
                <Textarea
                  id="fees"
                  value={tempContent.fees}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    fees: e.target.value 
                  }))}
                  placeholder="اكتب عن الرسوم والعمولات..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulation">
          <Card>
            <CardHeader>
              <CardTitle>التنظيم والترخيص</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="regulation">المحتوى</Label>
                <Textarea
                  id="regulation"
                  value={tempContent.regulation}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    regulation: e.target.value 
                  }))}
                  placeholder="اكتب عن التنظيم والترخيص..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proscons">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pros */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">المزايا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newPro}
                    onChange={(e) => setNewPro(e.target.value)}
                    placeholder="أضف ميزة جديدة..."
                    onKeyPress={(e) => e.key === 'Enter' && addPro()}
                  />
                  <Button onClick={addPro} size="sm">
                    إضافة
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {(tempContent.pros || []).map((pro, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm">{pro}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePro(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">العيوب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCon}
                    onChange={(e) => setNewCon(e.target.value)}
                    placeholder="أضف عيب جديد..."
                    onKeyPress={(e) => e.key === 'Enter' && addCon()}
                  />
                  <Button onClick={addCon} size="sm">
                    إضافة
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {(tempContent.cons || []).map((con, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm">{con}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCon(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conclusion */}
          <Card>
            <CardHeader>
              <CardTitle>الخلاصة والتوصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="conclusion">المحتوى</Label>
                <Textarea
                  id="conclusion"
                  value={tempContent.conclusion}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    conclusion: e.target.value 
                  }))}
                  placeholder="اكتب خلاصة وتوصية نهائية..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact">المحتوى</Label>
                <Textarea
                  id="contact"
                  value={tempContent.contact}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    contact: e.target.value 
                  }))}
                  placeholder="اكتب معلومات التواصل مع الوسيط..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>الملخص التنفيذي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="summary">المحتوى</Label>
                <Textarea
                  id="summary"
                  value={tempContent.summary}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    summary: e.target.value 
                  }))}
                  placeholder="اكتب ملخص تنفيذي مختصر للوسيط..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <div className="space-y-6">
            {/* Add New Custom Section */}
            <Card>
              <CardHeader>
                <CardTitle>إضافة قسم مخصص جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="section-title">عنوان القسم</Label>
                    <Input
                      id="section-title"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="مثال: خدمة العملاء"
                    />
                  </div>
                  <div>
                    <Label htmlFor="section-type">نوع القسم</Label>
                    <Select value={newSectionType} onValueChange={(value: 'heading' | 'subheading' | 'content') => setNewSectionType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heading">عنوان رئيسي (H2)</SelectItem>
                        <SelectItem value="subheading">عنوان فرعي (H3)</SelectItem>
                        <SelectItem value="content">محتوى عادي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="section-content">محتوى القسم</Label>
                  <Textarea
                    id="section-content"
                    value={newSectionContent}
                    onChange={(e) => setNewSectionContent(e.target.value)}
                    placeholder="اكتب محتوى القسم المخصص..."
                    rows={4}
                  />
                </div>

                <Button onClick={addCustomSection} className="gap-2">
                  <Plus className="h-4 w-4" />
                  إضافة القسم
                </Button>
              </CardContent>
            </Card>

            {/* Existing Custom Sections */}
            {(tempContent.customSections || []).length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">الأقسام المخصصة الحالية</h3>
                {(tempContent.customSections || []).map((section) => (
                  <Card key={section.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{section.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {section.type === 'heading' ? 'عنوان رئيسي' : 
                             section.type === 'subheading' ? 'عنوان فرعي' : 'محتوى عادي'}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCustomSection(section.id)}
                            className="gap-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>عنوان القسم</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>نوع القسم</Label>
                        <Select 
                          value={section.type} 
                          onValueChange={(value: 'heading' | 'subheading' | 'content') => 
                            updateCustomSection(section.id, 'type', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="heading">عنوان رئيسي (H2)</SelectItem>
                            <SelectItem value="subheading">عنوان فرعي (H3)</SelectItem>
                            <SelectItem value="content">محتوى عادي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>المحتوى</Label>
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}