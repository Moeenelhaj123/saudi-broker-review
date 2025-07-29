import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Image, Check, Eye } from "lucide-react";

// Import existing article images
import articleCryptoTrading from "@/assets/images/article-crypto-trading.svg";
import articleHalalTrading from "@/assets/images/article-halal-trading.svg";
import articlePsychology from "@/assets/images/article-psychology.svg";
import articleRiskManagement from "@/assets/images/article-risk-management.svg";
import articleTechnicalAnalysis from "@/assets/images/article-technical-analysis.svg";
import articleTradingBasics from "@/assets/images/article-trading-basics.svg";

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

export function ImageManagerTest() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showImageSelector, setShowImageSelector] = useState(false);

  const handleImageSelect = (imageOption: ImageOption) => {
    setSelectedImage(imageOption.src);
    setShowImageSelector(false);
    toast.success(`تم اختيار الصورة: ${imageOption.name}`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">اختبار إدارة الصور</h1>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">الصورة المختارة</h3>
              
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="الصورة المختارة"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowImageSelector(true)}
                      className="gap-2"
                    >
                      <Image className="h-4 w-4" />
                      تغيير الصورة
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedImage, '_blank')}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      معاينة كاملة
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">لم يتم اختيار صورة بعد</p>
                  <Button
                    onClick={() => setShowImageSelector(true)}
                    className="gap-2"
                  >
                    <Image className="h-4 w-4" />
                    اختيار صورة
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Image Selector Dialog */}
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
                          setSelectedImage(url);
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
                        setSelectedImage(url);
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
      </div>
    </div>
  );
}