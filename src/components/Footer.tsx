import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKV } from '@github/spark/hooks';
import { toast } from "sonner";

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  type: "general" | "broker-inquiry" | "review" | "complaint" | "newsletter";
  status: "new" | "replied" | "resolved" | "archived";
  date: string;
}

export function Footer() {
  const [isNewsletterDialogOpen, setIsNewsletterDialogOpen] = useState(false);
  const [contactMessages, setContactMessages] = useKV<ContactMessage[]>("admin-contact-messages", []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobDescription: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      setIsSubmitting(false);
      return;
    }

    // Create new contact message for newsletter subscription
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || "",
      message: `اشتراك في النشرة الإخبارية${formData.jobDescription ? ` - الوصف الوظيفي: ${formData.jobDescription}` : ""}`,
      type: "newsletter",
      status: "new",
      date: new Date().toISOString()
    };

    // Save to contact messages (same as contact dialog)
    setContactMessages((prev) => Array.isArray(prev) ? [newMessage, ...prev] : [newMessage]);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobDescription: ""
    });
    
    setIsNewsletterDialogOpen(false);
    setIsSubmitting(false);
    toast.success("تم الاشتراك في النشرة الإخبارية بنجاح!");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">اشترك في النشرة الإخبارية</h3>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            احصل على أحدث المقالات والنصائح التداولية مباشرة في بريدك الإلكتروني
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="أدخل بريدك الإلكتروني"
              className="bg-white text-gray-900 placeholder:text-gray-500"
              disabled
            />
            <Dialog open={isNewsletterDialogOpen} onOpenChange={setIsNewsletterDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100 whitespace-nowrap"
                >
                  اشترك الآن
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-right">اشترك في النشرة الإخبارية</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-right block mb-2">
                        الاسم الأول *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-right block mb-2">
                        اسم العائلة *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-right block mb-2">
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-right block mb-2">
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jobDescription" className="text-right block mb-2">
                      الوصف الوظيفي
                    </Label>
                    <Textarea
                      id="jobDescription"
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "جاري الإرسال..." : "اشترك الآن"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Footer Content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold">
              و
            </div>
            <h3 className="text-lg font-bold">وسطاء السعودية</h3>
          </div>
          <p className="text-primary-foreground/80 mb-4 max-w-md mx-auto">
            دليلك لأفضل الوسطاء الماليين في السعودية
          </p>
          
          <div className="border-t border-primary-foreground/20 pt-6 mt-6">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 وسطاء السعودية. جميع الحقوق محفوظة.
            </p>
            <p className="text-primary-foreground/60 text-xs mt-2">
              تحذير: التداول ينطوي على مخاطر
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}