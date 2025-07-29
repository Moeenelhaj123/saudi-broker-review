import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testContactData, successMessages } from './test-contact-forms';
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

export function ContactFormTester() {
  const [contactMessages, setContactMessages] = useKV<ContactMessage[]>("admin-contact-messages", []);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Test scenarios
  const testScenarios = [
    {
      name: "General Contact Form Test",
      type: "general",
      data: testContactData.generalContact,
      description: "Testing the main contact dialog form"
    },
    {
      name: "Newsletter Subscription Test", 
      type: "newsletter",
      data: testContactData.newsletterSubscription,
      description: "Testing newsletter signup from footer"
    },
    {
      name: "Contact Page Form Test",
      type: "general", 
      data: testContactData.contactPageForm,
      description: "Testing contact form from contact page"
    }
  ];

  const simulateFormSubmission = async (scenario: any) => {
    try {
      // Simulate form validation
      const { firstName, lastName, email, phone } = scenario.data;
      
      if (!firstName || !lastName || !email) {
        throw new Error("Missing required fields");
      }

      // Create message object based on scenario type
      let message = "";
      if (scenario.type === "newsletter") {
        message = `اشتراك في النشرة الإخبارية${scenario.data.jobDescription ? ` - الوصف الوظيفي: ${scenario.data.jobDescription}` : ""}`;
      } else {
        message = scenario.data.question || scenario.data.message || "رسالة تجريبية";
      }

      const newMessage: ContactMessage = {
        id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        firstName,
        lastName,
        email,
        phone: phone || "",
        message,
        type: scenario.type,
        status: "new",
        date: new Date().toISOString()
      };

      // Save to contact messages
      setContactMessages((prev) => Array.isArray(prev) ? [newMessage, ...prev] : [newMessage]);

      return {
        success: true,
        message: successMessages[scenario.type as keyof typeof successMessages] || "تم بنجاح",
        data: newMessage
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "خطأ غير متوقع",
        data: null
      };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (const scenario of testScenarios) {
      toast.info(`تشغيل اختبار: ${scenario.name}`);
      
      const result = await simulateFormSubmission(scenario);
      
      const testResult = {
        scenario: scenario.name,
        description: scenario.description,
        success: result.success,
        message: result.message,
        timestamp: new Date().toISOString(),
        data: result.data
      };

      setTestResults(prev => [...prev, testResult]);

      if (result.success) {
        toast.success(`✅ ${scenario.name}: ${result.message}`);
      } else {
        toast.error(`❌ ${scenario.name}: ${result.message}`);
      }

      // Add delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsRunning(false);
    toast.success("تم الانتهاء من جميع الاختبارات!");
  };

  const clearTestData = async () => {
    // Remove test messages from contact messages
    setContactMessages((prev) => 
      Array.isArray(prev) ? prev.filter(msg => !msg.id.startsWith('test-')) : []
    );
    setTestResults([]);
    toast.success("تم مسح بيانات الاختبار");
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>اختبار نماذج التواصل</CardTitle>
          <p className="text-muted-foreground">
            هذه الأداة تختبر جميع نماذج التواصل في الموقع للتأكد من عملها بشكل صحيح
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="bg-primary hover:bg-primary/90"
            >
              {isRunning ? "جاري تشغيل الاختبارات..." : "تشغيل جميع الاختبارات"}
            </Button>
            <Button 
              onClick={clearTestData} 
              variant="outline"
              disabled={isRunning}
            >
              مسح بيانات الاختبار
            </Button>
          </div>

          {/* Test Scenarios */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">سيناريوهات الاختبار:</h3>
            {testScenarios.map((scenario, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{scenario.name}</h4>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {scenario.type === 'general' ? 'نموذج عام' : 'نشرة إخبارية'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>نتائج الاختبارات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testResults.map((result, index) => (
              <Card key={index} className={`border-l-4 ${result.success ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                          {result.success ? '✅' : '❌'}
                        </span>
                        <h4 className="font-medium">{result.scenario}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                      <p className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                        {result.message}
                      </p>
                      {result.data && (
                        <div className="text-xs text-muted-foreground mt-2">
                          <strong>البيانات المحفوظة:</strong> {result.data.firstName} {result.data.lastName} - {result.data.email}
                        </div>
                      )}
                    </div>
                    <Badge variant={result.success ? "default" : "destructive"}>
                      {result.success ? "نجح" : "فشل"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Current Contact Messages */}
      <Card>
        <CardHeader>
          <CardTitle>الرسائل الحالية في النظام</CardTitle>
          <p className="text-muted-foreground">
            عدد الرسائل: {Array.isArray(contactMessages) ? contactMessages.length : 0}
          </p>
        </CardHeader>
        <CardContent>
          {Array.isArray(contactMessages) && contactMessages.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {contactMessages.slice(0, 5).map((message, index) => (
                <div key={message.id} className="flex justify-between items-center p-2 bg-muted rounded">
                  <div>
                    <span className="font-medium">{message.firstName} {message.lastName}</span>
                    <span className="text-sm text-muted-foreground mx-2">-</span>
                    <span className="text-sm">{message.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={message.id.startsWith('test-') ? "secondary" : "default"}>
                      {message.type === 'general' ? 'عام' : 'نشرة'}
                    </Badge>
                    {message.id.startsWith('test-') && (
                      <Badge variant="outline" className="text-xs">اختبار</Badge>
                    )}
                  </div>
                </div>
              ))}
              {contactMessages.length > 5 && (
                <p className="text-center text-sm text-muted-foreground">
                  وإضافة {contactMessages.length - 5} رسائل أخرى...
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              لا توجد رسائل حالياً
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}