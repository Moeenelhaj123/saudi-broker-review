import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Image, Check, X, Upload, FileImage, Link as LinkIcon } from "lucide-react";

// Import article images
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

interface ArticleImageUploaderProps {
  selectedImage?: string;
  onImageSelect: (imageUrl: string) => void;
  onImageRemove: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArticleImageUploader({ 
  selectedImage, 
  onImageSelect, 
  onImageRemove, 
  isOpen, 
  onOpenChange 
}: ArticleImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'existing' | 'upload' | 'url'>('existing');
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (imageOption: ImageOption) => {
    onImageSelect(imageOption.src);
    onOpenChange(false);
    toast.success(`تم اختيار الصورة: ${imageOption.name}`);
  };

  const handleImageRemove = () => {
    onImageRemove();
    onOpenChange(false);
    toast.success("تم حذف الصورة");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("يرجى اختيار ملف صورة صالح");
      return;
    }

    // Validate file size (max 5MB for articles)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setUploading(true);

    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onImageSelect(result);
          onOpenChange(false);
          toast.success("تم رفع الصورة بنجاح");
        }
      };
      reader.onerror = () => {
        toast.error("حدث خطأ أثناء رفع الملف");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("حدث خطأ أثناء رفع الملف");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUrlSubmit = () => {
    const url = customUrl.trim();
    if (!url) {
      toast.error("يرجى إدخال رابط الصورة");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
      onImageSelect(url);
      setCustomUrl('');
      onOpenChange(false);
      toast.success("تم حفظ رابط الصورة المخصص");
    } catch {
      toast.error("يرجى إدخال رابط صحيح");
    }
  };

  const selectedImageOption = availableImages.find(img => img.src === selectedImage);
  const isCustomImage = selectedImage && !selectedImageOption;

  const categories = Array.from(new Set(availableImages.map(img => img.category)));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إدارة صورة المقال</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === 'existing' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('existing')}
              className="flex-1"
            >
              <Image className="ml-2 h-4 w-4" />
              الصور المتاحة
            </Button>
            <Button
              variant={activeTab === 'upload' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('upload')}
              className="flex-1"
            >
              <Upload className="ml-2 h-4 w-4" />
              رفع صورة
            </Button>
            <Button
              variant={activeTab === 'url' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('url')}
              className="flex-1"
            >
              <LinkIcon className="ml-2 h-4 w-4" />
              رابط مخصص
            </Button>
          </div>

          {/* Existing Images Tab */}
          {activeTab === 'existing' && (
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge key={category} variant="outline" className="cursor-pointer">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableImages.map((imageOption) => (
                  <Card 
                    key={imageOption.id} 
                    className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
                    onClick={() => handleImageSelect(imageOption)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center p-2">
                          <img 
                            src={imageOption.src} 
                            alt={imageOption.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{imageOption.name}</h4>
                            {selectedImage === imageOption.src && (
                              <Check className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {imageOption.description}
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {imageOption.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {imageOption.aspectRatio}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <Card className="border-dashed border-2 border-muted-foreground/25">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-muted rounded-full">
                        <FileImage className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">رفع صورة مخصصة</h3>
                      <p className="text-sm text-muted-foreground">
                        اختر ملف صورة للمقال (PNG, JPG, WebP)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        onClick={handleUploadClick}
                        disabled={uploading}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {uploading ? "جاري الرفع..." : "اختيار ملف"}
                      </Button>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>متطلبات صورة المقال:</p>
                      <ul className="space-y-1">
                        <li>• حجم الملف: أقل من 5 ميجابايت</li>
                        <li>• نسبة العرض إلى الارتفاع المفضلة: 16:9</li>
                        <li>• الأبعاد المقترحة: 1200×675 بكسل أو أكبر</li>
                        <li>• الصيغ المدعومة: PNG, JPG, WebP</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-url">رابط الصورة</Label>
                      <Input
                        id="custom-url"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUrlSubmit();
                          }
                        }}
                      />
                    </div>
                    
                    <Button onClick={handleUrlSubmit} className="w-full">
                      حفظ الرابط
                    </Button>

                    <div className="text-xs text-muted-foreground">
                      <p>تأكد من أن الرابط يشير إلى صورة صالحة ومتاحة للعرض العام</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Current Image Preview */}
          {selectedImage && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Label>الصورة الحالية</Label>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center p-4 max-w-md">
                    <img 
                      src={selectedImage} 
                      alt="الصورة الحالية"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleImageRemove}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="ml-2 h-4 w-4" />
                      حذف الصورة
                    </Button>
                    <div className="text-sm text-muted-foreground flex items-center">
                      {selectedImageOption?.name || (isCustomImage ? "صورة مخصصة" : "صورة محددة")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Separator />
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}