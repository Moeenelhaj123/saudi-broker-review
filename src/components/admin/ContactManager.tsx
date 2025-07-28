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
    setSelectedMessage(null);
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {Array.isArray(messages) && messages.map((message) => (
            <Card 
              key={message.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {message.firstName} {message.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {message.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(message.status)}
                    {getTypeBadge(message.type)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {message.message}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(message.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {message.phone}
                  </span>
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

        {/* Message Details & Reply */}
        <div className="space-y-4">
          {selectedMessage ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    تفاصيل الرسالة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">الاسم الكامل</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedMessage.firstName} {selectedMessage.lastName}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">رقم الهاتف</Label>
                    <p className="text-sm text-muted-foreground">{selectedMessage.phone}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">نوع الرسالة</Label>
                    <div className="mt-1">{getTypeBadge(selectedMessage.type)}</div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">الحالة</Label>
                    <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">التاريخ</Label>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedMessage.date)}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">الرسالة</Label>
                    <p className="text-sm leading-relaxed p-3 bg-muted rounded-lg">
                      {selectedMessage.message}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الرد على الرسالة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reply">نص الرد</Label>
                    <Textarea
                      id="reply"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="اكتب ردك هنا..."
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={sendReply} className="gap-2 flex-1">
                      <Mail className="h-4 w-4" />
                      إرسال الرد
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تحديث الحالة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => updateMessageStatus(selectedMessage.id, "replied")}
                  >
                    <CheckCircle className="h-4 w-4" />
                    تم الرد
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => updateMessageStatus(selectedMessage.id, "resolved")}
                  >
                    <CheckCircle className="h-4 w-4" />
                    محلول
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => updateMessageStatus(selectedMessage.id, "archived")}
                  >
                    <Archive className="h-4 w-4" />
                    أرشفة
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">اختر رسالة</h3>
                <p className="text-muted-foreground">
                  اختر رسالة من القائمة لعرض التفاصيل والرد عليها
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}