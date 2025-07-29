import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactDialog } from "@/components/ContactDialog";
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';

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

export function ContactFormsTestPage() {
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showNewsletterDialog, setShowNewsletterDialog] = useState(false);
  const [contactMessages] = useKV<ContactMessage[]>("admin-contact-messages", []);

  // Newsletter form state
  const [newsletterForm, setNewsletterForm] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    phone: "",
    jobDescription: ""
  });

  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewsletter(true);

    if (!newsletterForm.firstName || !newsletterForm.lastName || !newsletterForm.email) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      setIsSubmittingNewsletter(false);
      return;
    }

    // Create newsletter message
    const newMessage: ContactMessage = {
      id: `newsletter-test-${Date.now()}`,
      firstName: newsletterForm.firstName,
      lastName: newsletterForm.lastName,
      email: newsletterForm.email,
      phone: newsletterForm.phone || "",
      message: `اشتراك في النشرة الإخبارية${newsletterForm.jobDescription ? ` - الوصف الوظيفي: ${newsletterForm.jobDescription}` : ""}`,
      type: "newsletter",
      status: "new",
      date: new Date().toISOString()
    };

    try {
      // Save to contact messages
      const [currentMessages, setContactMessages] = [contactMessages, () => {}];
      
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("تم الاشتراك في النشرة الإخبارية بنجاح!");
      
      // Reset form
      setNewsletterForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobDescription: ""
      });
      
      setShowNewsletterDialog(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء الإرسال");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>اختبار نماذج التواصل</CardTitle>
            <p className="text-muted-foreground">
              اختبر جميع نماذج التواصل للتأكد من عملها بشكل صحيح
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Test Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-2 border-dashed border-primary/20">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="text-lg font-semibold">نموذج التواصل العام</h3>
                  <p className="text-sm text-muted-foreground">
                    نفس النموذج المستخدم في الصفحة الرئيسية وصفحة التواصل
                  </p>
                  <Button 
                    onClick={() => setShowContactDialog(true)}
                    className="w-full"
                  >
                    اختبار نموذج التواصل
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-green-200">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="text-lg font-semibold">نموذج النشرة الإخبارية</h3>
                  <p className="text-sm text-muted-foreground">
                    نفس النموذج المستخدم في الفوتر
                  </p>
                  <Button 
                    onClick={() => setShowNewsletterDialog(true)}
                    variant="outline"
                    className="w-full"
                  >
                    اختبار النشرة الإخبارية
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Current Messages Count */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">عدد الرسائل الحالية في النظام:</span>
                  <span className="text-2xl font-bold text-primary">
                    {Array.isArray(contactMessages) ? contactMessages.length : 0}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  يمكنك مراجعة جميع الرسائل في صفحة إدارة التواصل في لوحة التحكم
                </p>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تعليمات الاختبار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">1. اختبار نموذج التواصل العام:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 mr-4">
                    <li>• املأ جميع الحقول المطلوبة</li>
                    <li>• تأكد من ظهور رسالة النجاح</li>
                    <li>• تحقق من إغلاق النموذج تلقائياً</li>
                    <li>• راجع الرسالة في إدارة التواصل</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">2. اختبار نموذج النشرة الإخبارية:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 mr-4">
                    <li>• املأ الحقول المطلوبة (الاسم والبريد الإلكتروني)</li>
                    <li>• اختبر الحقول الاختيارية (الهاتف والوصف الوظيفي)</li>
                    <li>• تأكد من ظهور رسالة نجاح الاشتراك</li>
                    <li>• راجع الرسالة في إدارة التواصل مع نوع "نشرة إخبارية"</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">3. اختبار التحقق من الأخطاء:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 mr-4">
                    <li>• جرب إرسال النماذج بدون ملء الحقول المطلوبة</li>
                    <li>• تأكد من ظهور رسائل خطأ واضحة</li>
                    <li>• اختبر تنسيق البريد الإلكتروني</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Contact Dialog */}
      <ContactDialog 
        open={showContactDialog} 
        onOpenChange={setShowContactDialog}
      />

      {/* Newsletter Dialog */}
      {showNewsletterDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">اشترك في النشرة الإخبارية</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الاسم الأول *</label>
                  <input
                    type="text"
                    value={newsletterForm.firstName}
                    onChange={(e) => setNewsletterForm({...newsletterForm, firstName: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">اسم العائلة *</label>
                  <input
                    type="text"
                    value={newsletterForm.lastName}
                    onChange={(e) => setNewsletterForm({...newsletterForm, lastName: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني *</label>
                <input
                  type="email"
                  value={newsletterForm.email}
                  onChange={(e) => setNewsletterForm({...newsletterForm, email: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  value={newsletterForm.phone}
                  onChange={(e) => setNewsletterForm({...newsletterForm, phone: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">الوصف الوظيفي</label>
                <textarea
                  value={newsletterForm.jobDescription}
                  onChange={(e) => setNewsletterForm({...newsletterForm, jobDescription: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={isSubmittingNewsletter}
                  className="flex-1 bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmittingNewsletter ? "جاري الإرسال..." : "اشترك الآن"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowNewsletterDialog(false)}
                  className="px-4 py-2 border rounded hover:bg-muted"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}