import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Image, Check, Eye, X } from "lucide-react";

// Import broker logos
import avaTradeLogo from "@/assets/images/avatrade-logo.svg";
import eToroLogo from "@/assets/images/etoro-logo.svg";
import exnessLogoClean from "@/assets/images/exness-logo-clean.svg";
import exnessLogo from "@/assets/images/exness-logo.svg";
import icMarketsLogo from "@/assets/images/ic-markets-logo.svg";
import pepperstoneLogo from "@/assets/images/pepperstone-logo.svg";
import xmLogo from "@/assets/images/xm-logo.svg";

interface LogoOption {
  id: string;
  name: string;
  src: string;
  size: 'small' | 'medium' | 'large';
  aspectRatio: string;
  description: string;
  company: string;
}

const availableLogos: LogoOption[] = [
  {
    id: 'avatrade',
    name: 'AvaTrade',
    src: avaTradeLogo,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار شركة أفاتريد للوساطة المالية',
    company: 'AvaTrade'
  },
  {
    id: 'etoro',
    name: 'eToro',
    src: eToroLogo,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار شركة إي تورو للوساطة المالية',
    company: 'eToro'
  },
  {
    id: 'exness-clean',
    name: 'Exness (نظيف)',
    src: exnessLogoClean,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار إكسنيس النظيف بدون خلفية',
    company: 'Exness'
  },
  {
    id: 'exness',
    name: 'Exness',
    src: exnessLogo,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار شركة إكسنيس للوساطة المالية',
    company: 'Exness'
  },
  {
    id: 'ic-markets',
    name: 'IC Markets',
    src: icMarketsLogo,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار شركة آي سي ماركتس للوساطة المالية',
    company: 'IC Markets'
  },
  {
    id: 'pepperstone',
    name: 'Pepperstone',
    src: pepperstoneLogo,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار شركة بيبرستون للوساطة المالية',
    company: 'Pepperstone'
  },
  {
    id: 'xm',
    name: 'XM',
    src: xmLogo,
    size: 'medium',
    aspectRatio: '3:1',
    description: 'شعار شركة إكس إم للوساطة المالية',
    company: 'XM'
  }
];

interface LogoSelectorProps {
  selectedLogo?: string;
  onLogoSelect: (logoUrl: string) => void;
  onLogoRemove: () => void;
  trigger?: React.ReactNode;
}

export function LogoSelector({ selectedLogo, onLogoSelect, onLogoRemove, trigger }: LogoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoSelect = (logoOption: LogoOption) => {
    onLogoSelect(logoOption.src);
    setIsOpen(false);
    toast.success(`تم اختيار شعار: ${logoOption.name}`);
  };

  const handleLogoRemove = () => {
    onLogoRemove();
    setIsOpen(false);
    toast.success("تم حذف الشعار");
  };

  const selectedLogoOption = availableLogos.find(logo => logo.src === selectedLogo);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="space-y-2">
          {trigger ? (
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
              {trigger}
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(true)}
              className="w-full"
            >
              <Image className="ml-2 h-4 w-4" />
              {selectedLogo ? "تغيير الشعار" : "اختيار شعار"}
            </Button>
          )}
          
          {selectedLogo && (
            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedLogo} 
                  alt="الشعار المحدد" 
                  className="h-8 w-auto object-contain"
                />
                <div>
                  <p className="text-sm font-medium">
                    {selectedLogoOption?.name || "شعار مخصص"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedLogoOption?.description || "شعار محدد"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogoRemove}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>اختيار شعار الوسيط</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableLogos.map((logoOption) => (
                <Card 
                  key={logoOption.id} 
                  className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
                  onClick={() => handleLogoSelect(logoOption)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="aspect-[3/1] bg-muted rounded-lg flex items-center justify-center p-2">
                        <img 
                          src={logoOption.src} 
                          alt={logoOption.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{logoOption.name}</h4>
                          {selectedLogo === logoOption.src && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {logoOption.description}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {logoOption.company}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {logoOption.aspectRatio}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Separator />
            
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}