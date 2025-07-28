import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useKV } from "@github/spark/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowRight, Save, Plus, X, Star, Building2 } from "lucide-react";

interface BrokerContent {
  id: string;
  name: string;
  nameAr: string;
  // Company Overview
  companyOverview: string;
  foundedYear: string;
  headquarters: string;
  employeeCount: string;
  
  // Regulation & Licenses
  regulation: string;
  licenses: string[];
  regulatoryBodies: string[];
  
  // Trading Information
  tradingPlatforms: string;
  platformsList: string[];
  accountTypes: string;
  accountTypesList: string[];
  spreadsCommissions: string;
  minimumDeposit: string;
  maximumLeverage: string;
  tradingInstruments: string;
  instrumentsList: string[];
  
  // Services & Features
  advantages: string[];
  disadvantages: string[];
  educationalResources: string;
  researchTools: string;
  mobileTrading: string;
  
  // Support & Contact
  customerSupport: string;
  supportLanguages: string[];
  contactInfo: string;
  supportHours: string;
  
  // Financial Information
  depositWithdrawal: string;
  depositMethods: string[];
  withdrawalMethods: string[];
  processingTimes: string;
  feesStructure: string;
  
  // Security & Safety
  securityMeasures: string;
  fundProtection: string;
  dataProtection: string;
  
  // Performance & Reviews
  userReviews: string;
  performanceAnalysis: string;
  trustScore: string;
  
  // Additional Information
  bonusesPromotions: string;
  islamicAccounts: string;
  socialTrading: string;
  apiTrading: string;
  
  // Final Assessment
  conclusion: string;
  recommendation: string;
  targetAudience: string;
  
  // SEO Content
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export function BrokerContentEditor() {
  const { brokerId } = useParams();
  const navigate = useNavigate();
  const [brokers] = useKV("admin-brokers", []);
  const [brokerContent, setBrokerContent] = useKV(`broker-content-${brokerId}`, null);
  
  const [content, setContent] = useState<BrokerContent>({
    id: "",
    name: "",
    nameAr: "",
    companyOverview: "",
    foundedYear: "",
    headquarters: "",
    employeeCount: "",
    regulation: "",
    licenses: [],
    regulatoryBodies: [],
    tradingPlatforms: "",
    platformsList: [],
    accountTypes: "",
    accountTypesList: [],
    spreadsCommissions: "",
    minimumDeposit: "",
    maximumLeverage: "",
    tradingInstruments: "",
    instrumentsList: [],
    advantages: [],
    disadvantages: [],
    educationalResources: "",
    researchTools: "",
    mobileTrading: "",
    customerSupport: "",
    supportLanguages: [],
    contactInfo: "",
    supportHours: "",
    depositWithdrawal: "",
    depositMethods: [],
    withdrawalMethods: [],
    processingTimes: "",
    feesStructure: "",
    securityMeasures: "",
    fundProtection: "",
    dataProtection: "",
    userReviews: "",
    performanceAnalysis: "",
    trustScore: "",
    bonusesPromotions: "",
    islamicAccounts: "",
    socialTrading: "",
    apiTrading: "",
    conclusion: "",
    recommendation: "",
    targetAudience: "",
    metaTitle: "",
    metaDescription: "",
    keywords: []
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newAdvantage, setNewAdvantage] = useState("");
  const [newDisadvantage, setNewDisadvantage] = useState("");
  const [newLicense, setNewLicense] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newInstrument, setNewInstrument] = useState("");
  const [newAccountType, setNewAccountType] = useState("");
  const [newSupportLanguage, setNewSupportLanguage] = useState("");
  const [newDepositMethod, setNewDepositMethod] = useState("");
  const [newWithdrawalMethod, setNewWithdrawalMethod] = useState("");

  useEffect(() => {
    const broker = brokers.find((b: any) => b.id === brokerId);
    
    if (brokerContent) {
      setContent(brokerContent);
    } else if (broker) {
      // Initialize with default comprehensive content
      const defaultContent: BrokerContent = {
        id: brokerId || "",
        name: broker.name || "",
        nameAr: broker.nameAr || broker.name || "",
        
        companyOverview: `يعتبر ${broker.nameAr || broker.name} من الوسطاء الماليين الرائدين في السوق العالمي، حيث يوفر خدمات تداول متقدمة وموثوقة للمتداولين من جميع المستويات. تأسست الشركة بهدف تقديم تجربة تداول استثنائية تجمع بين التكنولوجيا المتطورة والخدمة المتميزة.`,
        foundedYear: "2008",
        headquarters: "قبرص",
        employeeCount: "500+",
        
        regulation: `${broker.nameAr || broker.name} شركة مرخصة ومنظمة من قبل هيئات تنظيمية موثوقة عالمياً، مما يضمن الأمان والحماية الكاملة لأموال العملاء وفقاً لأعلى المعايير الدولية.`,
        licenses: ["CySEC", "FSA", "IFSC"],
        regulatoryBodies: ["هيئة الأوراق المالية القبرصية", "هيئة الخدمات المالية", "مؤسسة الخدمات المالية الدولية"],
        
        tradingPlatforms: `يوفر ${broker.nameAr || broker.name} مجموعة شاملة من منصات التداول المتقدمة التي تناسب جميع أنواع المتداولين، من المبتدئين إلى المحترفين، مع واجهات سهلة الاستخدام وأدوات تحليل متطورة.`,
        platformsList: ["MetaTrader 4", "MetaTrader 5", "منصة الويب", "التطبيق المحمول"],
        
        accountTypes: `يقدم ${broker.nameAr || broker.name} مجموعة متنوعة من أنواع الحسابات المصممة لتلبية احتياجات مختلف المتداولين ومستويات خبرتهم في الأسواق المالية.`,
        accountTypesList: ["الحساب العادي", "الحساب المتقدم", "حساب VIP", "الحساب الإسلامي"],
        
        spreadsCommissions: `يتميز ${broker.nameAr || broker.name} بهيكل رسوم تنافسي وشفاف، حيث يوفر سبريد منخفض يبدأ من 0.3 نقطة وعمولات معقولة على جميع الصفقات، مما يساعد المتداولين على تحقيق أرباح أكبر.`,
        minimumDeposit: "100 دولار أمريكي",
        maximumLeverage: "1:500",
        
        tradingInstruments: `يوفر ${broker.nameAr || broker.name} مجموعة واسعة من الأدوات المالية للتداول، تشمل أزواج العملات الرئيسية والثانوية، بالإضافة إلى المعادن الثمينة والسلع والمؤشرات.`,
        instrumentsList: ["أزواج العملات الأجنبية", "المعادن الثمينة", "السلع", "المؤشرات", "الأسهم", "العملات المشفرة"],
        
        advantages: [
          "رسوم تداول منخفضة وتنافسية",
          "منصات تداول متقدمة وسهلة الاستخدام",
          "دعم عملاء متاح على مدار الساعة باللغة العربية",
          "تراخيص موثوقة من جهات تنظيمية معترف بها دولياً",
          "أدوات تحليل فني متطورة",
          "سرعة في تنفيذ الصفقات",
          "حماية كاملة لأموال العملاء",
          "توفر الحسابات الإسلامية الخالية من الفوائد"
        ],
        disadvantages: [
          "قد تكون بعض الأدوات المتقدمة معقدة للمبتدئين",
          "رسوم السحب قد تكون مرتفعة نسبياً",
          "الحد الأدنى للإيداع قد يكون مرتفعاً لبعض المتداولين"
        ],
        
        educationalResources: `يوفر ${broker.nameAr || broker.name} مجموعة شاملة من المواد التعليمية والموارد التدريبية، تشمل الندوات التعليمية، والكتب الإلكترونية، والفيديوهات التوضيحية، بالإضافة إلى الحساب التجريبي المجاني.`,
        researchTools: `تشمل أدوات البحث والتحليل المتقدمة التي يوفرها ${broker.nameAr || broker.name} التحليل الفني والأساسي، والتقارير اليومية، والتوصيات، وأدوات الرسوم البيانية المتطورة.`,
        mobileTrading: `يوفر ${broker.nameAr || broker.name} تطبيقات محمولة متطورة لأنظمة iOS و Android، تتيح للمتداولين إدارة حساباتهم وتنفيذ الصفقات من أي مكان وفي أي وقت.`,
        
        customerSupport: `يتميز فريق دعم العملاء في ${broker.nameAr || broker.name} بالخبرة العالية والاستجابة السريعة، مع توفر الدعم باللغة العربية على مدار الساعة طوال أيام الأسبوع.`,
        supportLanguages: ["العربية", "الإنجليزية", "الفرنسية", "الألمانية", "الإسبانية"],
        contactInfo: `يمكن التواصل مع ${broker.nameAr || broker.name} من خلال قنوات متعددة تشمل الهاتف والبريد الإلكتروني والدردشة المباشرة ووسائل التواصل الاجتماعي.`,
        supportHours: "24/7 على مدار الأسبوع",
        
        depositWithdrawal: `يوفر ${broker.nameAr || broker.name} خيارات متنوعة وآمنة للإيداع والسحب تناسب العملاء السعوديين والعرب، مع ضمان الأمان والسرعة في جميع المعاملات المالية.`,
        depositMethods: ["بطاقات الائتمان", "التحويل البنكي", "المحافظ الإلكترونية", "العملات المشفرة"],
        withdrawalMethods: ["بطاقات الائتمان", "التحويل البنكي", "المحافظ الإلكترونية"],
        processingTimes: "الإيداع فوري، السحب خلال 24-48 ساعة",
        feesStructure: "رسوم تنافسية مع شفافية كاملة في هيكل التكاليف",
        
        securityMeasures: `يطبق ${broker.nameAr || broker.name} أعلى معايير الأمان والحماية، بما في ذلك التشفير المصرفي المتقدم وحماية البيانات الشخصية وفصل أموال العملاء عن أموال الشركة.`,
        fundProtection: "حماية كاملة لأموال العملاء من خلال الفصل في بنوك من الدرجة الأولى",
        dataProtection: "تشفير SSL 256-bit وحماية متقدمة للبيانات الشخصية",
        
        userReviews: `يحظى ${broker.nameAr || broker.name} بتقييمات إيجابية من المتداولين السعوديين والعرب، حيث يشيد العملاء بجودة الخدمة وسرعة التنفيذ والدعم المتميز.`,
        performanceAnalysis: "أداء ممتاز في تنفيذ الصفقات مع أوقات استجابة سريعة وانزلاق محدود",
        trustScore: "نقاط الثقة: 9/10 بناءً على التراخيص والتقييمات",
        
        bonusesPromotions: `يقدم ${broker.nameAr || broker.name} عروض ترحيبية وبونصات جذابة للعملاء الجدد، بالإضافة إلى برامج ولاء للعملاء الحاليين مع شروط عادلة وشفافة.`,
        islamicAccounts: "توفر حسابات إسلامية خالية من الفوائد والرسوم الليلية متوافقة مع أحكام الشريعة الإسلامية",
        socialTrading: "منصة تداول اجتماعي تتيح نسخ صفقات المتداولين المحترفين والتعلم منهم",
        apiTrading: "واجهة برمجة تطبيقات متقدمة للتداول الآلي والخوارزمي",
        
        conclusion: `بشكل عام، يعتبر ${broker.nameAr || broker.name} خياراً ممتازاً للمتداولين السعوديين والعرب الذين يبحثون عن وسيط موثوق ومتقدم يوفر خدمات تداول عالية الجودة مع دعم باللغة العربية وحماية كاملة للأموال.`,
        recommendation: "موصى به بقوة للمتداولين من جميع المستويات",
        targetAudience: "المتداولين المبتدئين والمتوسطين والمحترفين في السوق السعودي والعربي",
        
        metaTitle: `مراجعة ${broker.nameAr || broker.name} - دليل شامل للوسيط المالي`,
        metaDescription: `مراجعة شاملة لوسيط ${broker.nameAr || broker.name} تشمل المزايا والعيوب والرسوم والمنصات والتراخيص. دليل كامل للمتداولين السعوديين`,
        keywords: ["مراجعة " + (broker.nameAr || broker.name), "وسيط تداول", "تداول العملات", "السعودية", "فوركس"]
      };
      
      setContent(defaultContent);
    }
  }, [brokerId, brokers, brokerContent]);

  const handleSave = () => {
    setBrokerContent(content);
    toast.success("تم حفظ محتوى الوسيط بنجاح");
  };

  const handleGoBack = () => {
    navigate("/cadmin/brokers");
  };

  // Helper functions for array management
  const addToArray = (field: keyof BrokerContent, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setContent(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
      setter("");
    }
  };

  const removeFromArray = (field: keyof BrokerContent, index: number) => {
    setContent(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const currentBroker = brokers.find((b: any) => b.id === brokerId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleGoBack} className="gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للوسطاء
          </Button>
          <div>
            <h2 className="text-2xl font-bold">تحرير محتوى الوسيط</h2>
            <p className="text-muted-foreground">
              {currentBroker?.nameAr || currentBroker?.name || "وسيط غير معروف"}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          حفظ جميع التغييرات
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">اسم الشركة (الإنجليزي)</Label>
              <Input
                id="name"
                value={content.name}
                onChange={(e) => setContent(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="nameAr">اسم الشركة (العربي)</Label>
              <Input
                id="nameAr"
                value={content.nameAr}
                onChange={(e) => setContent(prev => ({ ...prev, nameAr: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="foundedYear">سنة التأسيس</Label>
              <Input
                id="foundedYear"
                value={content.foundedYear}
                onChange={(e) => setContent(prev => ({ ...prev, foundedYear: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="headquarters">المقر الرئيسي</Label>
              <Input
                id="headquarters"
                value={content.headquarters}
                onChange={(e) => setContent(prev => ({ ...prev, headquarters: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="employeeCount">عدد الموظفين</Label>
              <Input
                id="employeeCount"
                value={content.employeeCount}
                onChange={(e) => setContent(prev => ({ ...prev, employeeCount: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="companyOverview">نظرة عامة على الشركة</Label>
            <Textarea
              id="companyOverview"
              value={content.companyOverview}
              onChange={(e) => setContent(prev => ({ ...prev, companyOverview: e.target.value }))}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Regulation & Licenses */}
      <Card>
        <CardHeader>
          <CardTitle>التنظيم والتراخيص</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="regulation">معلومات التنظيم</Label>
            <Textarea
              id="regulation"
              value={content.regulation}
              onChange={(e) => setContent(prev => ({ ...prev, regulation: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>التراخيص</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newLicense}
                onChange={(e) => setNewLicense(e.target.value)}
                placeholder="أدخل ترخيص جديد"
              />
              <Button 
                onClick={() => addToArray('licenses', newLicense, setNewLicense)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.licenses.map((license, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {license}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('licenses', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Information */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات التداول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tradingPlatforms">منصات التداول</Label>
            <Textarea
              id="tradingPlatforms"
              value={content.tradingPlatforms}
              onChange={(e) => setContent(prev => ({ ...prev, tradingPlatforms: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>قائمة المنصات</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                placeholder="أدخل منصة جديدة"
              />
              <Button 
                onClick={() => addToArray('platformsList', newPlatform, setNewPlatform)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.platformsList.map((platform, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {platform}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('platformsList', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="minimumDeposit">الحد الأدنى للإيداع</Label>
              <Input
                id="minimumDeposit"
                value={content.minimumDeposit}
                onChange={(e) => setContent(prev => ({ ...prev, minimumDeposit: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="maximumLeverage">أقصى رافعة مالية</Label>
              <Input
                id="maximumLeverage"
                value={content.maximumLeverage}
                onChange={(e) => setContent(prev => ({ ...prev, maximumLeverage: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="spreadsCommissions">الفروقات والعمولات</Label>
            <Textarea
              id="spreadsCommissions"
              value={content.spreadsCommissions}
              onChange={(e) => setContent(prev => ({ ...prev, spreadsCommissions: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Advantages & Disadvantages */}
      <Card>
        <CardHeader>
          <CardTitle>المزايا والعيوب</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>المزايا</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newAdvantage}
                onChange={(e) => setNewAdvantage(e.target.value)}
                placeholder="أدخل ميزة جديدة"
              />
              <Button 
                onClick={() => addToArray('advantages', newAdvantage, setNewAdvantage)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {content.advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <span className="flex-1">{advantage}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromArray('advantages', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label>العيوب</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newDisadvantage}
                onChange={(e) => setNewDisadvantage(e.target.value)}
                placeholder="أدخل عيب جديد"
              />
              <Button 
                onClick={() => addToArray('disadvantages', newDisadvantage, setNewDisadvantage)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {content.disadvantages.map((disadvantage, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                  <span className="flex-1">{disadvantage}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromArray('disadvantages', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Support */}
      <Card>
        <CardHeader>
          <CardTitle>دعم العملاء</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customerSupport">معلومات دعم العملاء</Label>
            <Textarea
              id="customerSupport"
              value={content.customerSupport}
              onChange={(e) => setContent(prev => ({ ...prev, customerSupport: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="supportHours">ساعات الدعم</Label>
              <Input
                id="supportHours"
                value={content.supportHours}
                onChange={(e) => setContent(prev => ({ ...prev, supportHours: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="contactInfo">معلومات الاتصال</Label>
              <Input
                id="contactInfo"
                value={content.contactInfo}
                onChange={(e) => setContent(prev => ({ ...prev, contactInfo: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>لغات الدعم</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSupportLanguage}
                onChange={(e) => setNewSupportLanguage(e.target.value)}
                placeholder="أدخل لغة جديدة"
              />
              <Button 
                onClick={() => addToArray('supportLanguages', newSupportLanguage, setNewSupportLanguage)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.supportLanguages.map((language, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {language}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('supportLanguages', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>المعلومات المالية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="depositWithdrawal">الإيداع والسحب</Label>
            <Textarea
              id="depositWithdrawal"
              value={content.depositWithdrawal}
              onChange={(e) => setContent(prev => ({ ...prev, depositWithdrawal: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="processingTimes">أوقات المعالجة</Label>
              <Input
                id="processingTimes"
                value={content.processingTimes}
                onChange={(e) => setContent(prev => ({ ...prev, processingTimes: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="feesStructure">هيكل الرسوم</Label>
              <Input
                id="feesStructure"
                value={content.feesStructure}
                onChange={(e) => setContent(prev => ({ ...prev, feesStructure: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Additional Features */}
      <Card>
        <CardHeader>
          <CardTitle>الأمان والميزات الإضافية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="securityMeasures">إجراءات الأمان</Label>
            <Textarea
              id="securityMeasures"
              value={content.securityMeasures}
              onChange={(e) => setContent(prev => ({ ...prev, securityMeasures: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="islamicAccounts">الحسابات الإسلامية</Label>
            <Textarea
              id="islamicAccounts"
              value={content.islamicAccounts}
              onChange={(e) => setContent(prev => ({ ...prev, islamicAccounts: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="bonusesPromotions">العروض والمكافآت</Label>
            <Textarea
              id="bonusesPromotions"
              value={content.bonusesPromotions}
              onChange={(e) => setContent(prev => ({ ...prev, bonusesPromotions: e.target.value }))}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Final Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>التقييم النهائي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="conclusion">الخلاصة</Label>
            <Textarea
              id="conclusion"
              value={content.conclusion}
              onChange={(e) => setContent(prev => ({ ...prev, conclusion: e.target.value }))}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="recommendation">التوصية</Label>
            <Input
              id="recommendation"
              value={content.recommendation}
              onChange={(e) => setContent(prev => ({ ...prev, recommendation: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="targetAudience">الجمهور المستهدف</Label>
            <Input
              id="targetAudience"
              value={content.targetAudience}
              onChange={(e) => setContent(prev => ({ ...prev, targetAudience: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Content */}
      <Card>
        <CardHeader>
          <CardTitle>محتوى SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">عنوان الصفحة (Meta Title)</Label>
            <Input
              id="metaTitle"
              value={content.metaTitle}
              onChange={(e) => setContent(prev => ({ ...prev, metaTitle: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="metaDescription">وصف الصفحة (Meta Description)</Label>
            <Textarea
              id="metaDescription"
              value={content.metaDescription}
              onChange={(e) => setContent(prev => ({ ...prev, metaDescription: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label>الكلمات المفتاحية</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="أدخل كلمة مفتاحية جديدة"
              />
              <Button 
                onClick={() => addToArray('keywords', newKeyword, setNewKeyword)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {keyword}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('keywords', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="h-5 w-5" />
          حفظ جميع التغييرات
        </Button>
      </div>
    </div>
  );
}