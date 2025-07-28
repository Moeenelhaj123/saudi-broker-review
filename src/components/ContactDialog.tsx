import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    question: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.question) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("تم إرسال استفسارك بنجاح! سنتواصل معك قريباً");
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      question: "",
    });
    
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-right">تواصل معنا</DialogTitle>
          <DialogDescription className="text-right">
            لديك سؤال؟ اتركه لنا وسنجيبك في أقرب وقت ممكن
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right block">
                الاسم الأول *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="text-right"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-right block">
                اسم العائلة *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="text-right"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right block">
              البريد الإلكتروني *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="text-right"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">
              رقم الهاتف
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="text-right"
              placeholder="مثال: +966501234567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="question" className="text-right block">
              الوصف *
            </Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              className="text-right min-h-[100px]"
              placeholder="اكتب وصف استفسارك هنا..."
              required
            />
          </div>
          
          <DialogFooter className="flex-row-reverse gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الاستفسار"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}