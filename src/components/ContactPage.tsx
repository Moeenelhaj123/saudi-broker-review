import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ContactDialog";
import { 
  Phone, 
  Envelope, 
  MapPin, 
  Clock,
  Shield,
  ChartBar,
  Users,
  ChatCircle,
  Star,
  Question
} from "@phosphor-icons/react";

export function ContactPage() {
  const [showContactDialog, setShowContactDialog] = useState(false);

  const contactReasons = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "الاستفسار عن الوسطاء المرخصين",
      description: "تحقق من ترخيص الوسطاء والشركات المالية في السعودية"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "طلب تقييم شركة وساطة",
      description: "اطلب تقييماً شاملاً لشركة وساطة معينة أو شارك تجربتك"
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: "مقارنة الوسطاء",
      description: "احصل على مقارنة مفصلة بين عدة شركات وساطة"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "تجارب المتداولين",
      description: "شارك تجربتك أو اقرأ تجارب متداولين آخرين"
    },
    {
      icon: <ChatCircle className="w-6 h-6" />,
      title: "الشكاوى والاستفسارات",
      description: "أبلغ عن مشاكل مع الوسطاء أو اطرح استفساراتك"
    },
    {
      icon: <Question className="w-6 h-6" />,
      title: "استشارات التداول",
      description: "احصل على نصائح حول اختيار الوسيط المناسب لاحتياجاتك"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "الهاتف",
      value: "+966 11 234 5678",
      description: "خدمة العملاء متاحة من السبت إلى الخميس"
    },
    {
      icon: <Envelope className="w-5 h-5" />,
      title: "البريد الإلكتروني",
      value: "info@wasatsa.com",
      description: "سنرد على رسالتك خلال 24 ساعة"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "العنوان",
      value: "الرياض، المملكة العربية السعودية",
      description: "مركز الملك عبدالله المالي"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "ساعات العمل",
      value: "9:00 ص - 6:00 م",
      description: "السبت إلى الخميس (ما عدا العطل الرسمية)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            تواصل معنا
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك في كل ما يتعلق بالوسطاء الماليين والتداول في السعودية
          </p>
        </div>

        {/* Contact Reasons Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            ماذا يمكننا مساعدتك به؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactReasons.map((reason, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {reason.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{reason.title}</h3>
                </div>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* About Our Services */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">خدماتنا في تقييم الوسطاء</h2>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">تقييمات شاملة ومستقلة</h3>
              <p className="text-muted-foreground leading-relaxed">
                نقدم تقييمات مفصلة وموضوعية لجميع شركات الوساطة العاملة في السوق السعودي. 
                تشمل تقييماتنا فحص التراخيص، مراجعة المنصات، تحليل الرسوم، وتقييم جودة الخدمة.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">مراجعات المتداولين الحقيقية</h3>
              <p className="text-muted-foreground leading-relaxed">
                نجمع آراء وتجارب المتداولين السعوديين الفعليين مع مختلف شركات الوساطة. 
                جميع المراجعات محققة ومؤكدة لضمان مصداقيتها وفائدتها للمتداولين الجدد.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">مقارنات تفصيلية</h3>
              <p className="text-muted-foreground leading-relaxed">
                نساعدك في مقارنة الوسطاء من حيث الرسوم، أنواع الحسابات، المنصات المتاحة، 
                أدوات التحليل، وخدمة العملاء لتجد الخيار الأنسب لاحتياجاتك التداولية.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">التحديث المستمر</h3>
              <p className="text-muted-foreground leading-relaxed">
                نتابع باستمرار التطورات في السوق وأي تغييرات في خدمات الوسطاء، 
                ونحدث معلوماتنا وتقييماتنا بشكل دوري لضمان دقة المعلومات المقدمة.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">معلومات التواصل</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{info.title}</h3>
                    <p className="text-primary font-medium">{info.value}</p>
                    <p className="text-muted-foreground text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">هل لديك استفسار؟</h3>
              <p className="text-muted-foreground mb-6">
                املأ النموذج وسنتواصل معك خلال 24 ساعة
              </p>
              <Button 
                onClick={() => setShowContactDialog(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                تواصل معنا الآن
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">خدمات إضافية نقدمها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">للمتداولين الجدد</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• توجيه لاختيار الوسيط المناسب</li>
                <li>• شرح أنواع الحسابات المختلفة</li>
                <li>• نصائح للبدء في التداول بأمان</li>
                <li>• معلومات عن التنظيم والترخيص</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">للمتداولين المحترفين</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• مقارنات متقدمة للأدوات والمنصات</li>
                <li>• تحليل هياكل الرسوم المعقدة</li>
                <li>• معلومات عن حسابات الشركات</li>
                <li>• تقييم خدمات التداول المؤسسي</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <ContactDialog 
        open={showContactDialog} 
        onOpenChange={setShowContactDialog}
      />
    </div>
  );
}