import { useKV } from "@github/spark/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  User,
  Calendar
} from "lucide-react";

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  type: "general" | "broker-inquiry" | "review" | "complaint" | "newsletter";
  status?: "new" | "replied" | "resolved" | "archived";
  date: string;
}

export function ContactManager() {
  const [messages] = useKV<ContactMessage[]>("admin-contact-messages", [
    {
      id: "1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed@example.com",
      phone: "966501234567",
      message: "أريد معرفة المزيد عن وسيط Exness وما إذا كان مناسب للمبتدئين",
      type: "broker-inquiry",
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
      date: "2024-01-13T09:15:00"
    }
  ]);

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
      case "newsletter":
        return <Badge className="bg-green-100 text-green-800">نشرة إخبارية</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
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
          <p className="text-muted-foreground">عرض معلومات التواصل من العملاء</p>
        </div>
        <div className="flex gap-2">
          <Badge className="text-sm px-3 py-1">
            {messages.length} رسالة
          </Badge>
        </div>
      </div>

      {/* Contact Information Cards - Full Width, Compact */}
      <div className="space-y-3">
        {Array.isArray(messages) && messages.map((message) => (
          <Card 
            key={message.id} 
            className="w-full transition-all hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                {/* Client Information */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base">
                      {message.firstName} {message.lastName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(message.date)}
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{message.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{message.phone}</span>
                  </div>
                </div>

                {/* Message Type */}
                <div className="flex items-center">
                  {getTypeBadge(message.type)}
                </div>

                {/* Message Content */}
                <div className="lg:col-span-1">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm leading-relaxed line-clamp-2">{message.message}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-2">لا توجد رسائل</h3>
              <p className="text-muted-foreground">ستظهر رسائل العملاء هنا</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}