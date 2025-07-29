import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Archive
} from "lucide-react";

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  type: "general" | "broker-inquiry" | "review" | "complaint";
  status: "new" | "replied" | "resolved" | "archived";
  date: string;
}

export function ContactManager() {
  const [messages, setMessages] = useKV<ContactMessage[]>("admin-contact-messages", [
    {
      id: "1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed@example.com",
      phone: "966501234567",
      message: "أريد معرفة المزيد عن وسيط Exness وما إذا كان مناسب للمبتدئين",
      type: "broker-inquiry",
      status: "new",
      date: "2024-01-15T10:30:00"
    },
    {
      id: "2",
      firstName: "فاطمة",
      lastName: "الأحمد",
      email: "fatima@example.com",
      phone: "966507654321",
      message: "واجهت مشكلة مع أحد الوسطاء ولم أتمكن من سحب أموالي",
      type: "complaint",
      status: "new",
      date: "2024-01-14T15:20:00"
    },
    {
      id: "3",
      firstName: "خالد",
      lastName: "العتيبي",
      email: "khalid@example.com",
      phone: "966509876543",
      message: "أود إضافة تقييم لوسيط IC Markets",
      type: "review",
      status: "replied",
      date: "2024-01-13T09:15:00"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">جديد</Badge>;
      case "replied":
        return <Badge className="bg-yellow-100 text-yellow-800">تم الرد</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">محلول</Badge>;
      case "archived":
        return <Badge variant="secondary">مؤرشف</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "general":
        return <Badge variant="outline">عام</Badge>;
      case "broker-inquiry":
        return <Badge className="bg-purple-100 text-purple-800">استفسار وسيط</Badge>;
      case "review":
        return <Badge className="bg-orange-100 text-orange-800">تقييم</Badge>;
      case "complaint":
        return <Badge variant="destructive">شكوى</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const updateMessageStatus = (messageId: string, newStatus: string) => {
    setMessages((prev) => 
      Array.isArray(prev) ? prev.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ) : []
    );
    toast.success("تم تحديث حالة الرسالة");
  };

  const sendReply = () => {
    if (!selectedMessage || !replyText.trim()) {
      toast.error("يرجى كتابة الرد");
      return;
    }

    // Here you would typically send the reply via email
    updateMessageStatus(selectedMessage.id, "replied");
    setReplyText("");
    toast.success("تم إرسال الرد بنجاح");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة رسائل التواصل</h2>
          <p className="text-muted-foreground">عرض والرد على رسائل العملاء</p>
        </div>
        <div className="flex gap-2">
          <Badge className="text-sm px-3 py-1">
            {messages.filter(msg => msg.status === 'new').length} رسالة جديدة
          </Badge>
        </div>
      </div>

      {/* Messages List - Full Width Cards */}
      <div className="space-y-4">
        {Array.isArray(messages) && messages.map((message) => (
          <Card 
            key={message.id} 
            className="w-full transition-all hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {message.firstName} {message.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {message.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {message.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {getStatusBadge(message.status)}
                    {getTypeBadge(message.type)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(message.date)}
                  </div>
                </div>

                {/* Message Content */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">الرسالة</Label>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                  </div>

                  {/* Reply Section */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">الرد على العميل</Label>
                    <Textarea
                      placeholder="اكتب ردك هنا..."
                      rows={3}
                      value={selectedMessage?.id === message.id ? replyText : ""}
                      onChange={(e) => {
                        setSelectedMessage(message);
                        setReplyText(e.target.value);
                      }}
                    />
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedMessage(message);
                          sendReply();
                        }}
                        className="gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        إرسال الرد
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateMessageStatus(message.id, "replied")}
                      >
                        <CheckCircle className="h-4 w-4" />
                        تم الرد
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateMessageStatus(message.id, "resolved")}
                      >
                        <CheckCircle className="h-4 w-4" />
                        محلول
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateMessageStatus(message.id, "archived")}
                      >
                        <Archive className="h-4 w-4" />
                        أرشفة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">لا توجد رسائل</h3>
              <p className="text-muted-foreground">ستظهر رسائل العملاء هنا</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}