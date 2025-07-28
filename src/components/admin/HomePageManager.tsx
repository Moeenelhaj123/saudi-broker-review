import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Edit3, Eye } from "lucide-react";

export function HomePageManager() {
  const [heroContent, setHeroContent] = useKV("admin-hero-content", {
    headline: "دليل شامل لأفضل الوسطاء الماليين في السعودية",
    subheadline: "اكتشف وقارن أفضل الوسطاء المرخصين في المملكة العربية السعودية. نوفر لك تقييمات شاملة وحقيقية من متداولين سعوديين لمساعدتك في اختيار الوسيط المناسب لاحتياجاتك الاستثمارية. جميع الوسطاء مرخصون ومنظمون من قبل هيئة السوق المالية."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(heroContent);

  const handleSave = () => {
    setHeroContent(tempContent);
    setIsEditing(false);
    toast.success("تم حفظ التغييرات بنجاح");
  };

  const handleCancel = () => {
    setTempContent(heroContent);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الصفحة الرئيسية</h2>
          <p className="text-muted-foreground">تحكم في محتوى الصفحة الرئيسية للموقع</p>
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
            <Edit3 className="h-5 w-5" />
            قسم البطل (Hero Section)
          </CardTitle>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              تعديل
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="headline">العنوان الرئيسي</Label>
                <Input
                  id="headline"
                  value={tempContent.headline}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    headline: e.target.value 
                  }))}
                  placeholder="أدخل العنوان الرئيسي"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subheadline">العنوان الفرعي</Label>
                <Textarea
                  id="subheadline"
                  value={tempContent.subheadline}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    subheadline: e.target.value 
                  }))}
                  placeholder="أدخل العنوان الفرعي"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
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
                <h3 className="font-medium mb-2">العنوان الرئيسي:</h3>
                <p className="p-4 bg-muted rounded-lg">{heroContent.headline}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">العنوان الفرعي:</h3>
                <p className="p-4 bg-muted rounded-lg leading-relaxed">
                  {heroContent.subheadline}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* FAQ Management */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة الأسئلة الشائعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>سيتم إضافة إدارة الأسئلة الشائعة قريباً</p>
            <Button className="mt-4" variant="outline">
              إضافة سؤال جديد
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Management */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة آراء العملاء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>سيتم إضافة إدارة آراء العملاء قريباً</p>
            <Button className="mt-4" variant="outline">
              إضافة رأي جديد
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}