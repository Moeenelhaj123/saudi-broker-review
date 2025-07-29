import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, User, Phone, Briefcase, Calendar } from "lucide-react";
import { toast } from "sonner";

interface NewsletterSubscription {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobDescription: string;
  createdAt: string;
}

export function NewsletterManager() {
  const [subscriptions, setSubscriptions] = useKV<NewsletterSubscription[]>("newsletter-subscriptions", []);

  const handleDelete = (id: string) => {
    setSubscriptions((current) => current.filter(sub => sub.id !== id));
    toast.success("تم حذف الاشتراك بنجاح");
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
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إدارة اشتراكات النشرة الإخبارية</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {subscriptions.length} مشترك
        </Badge>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد اشتراكات
              </h3>
              <p className="text-gray-500">
                لم يتم تسجيل أي اشتراكات في النشرة الإخبارية بعد
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {subscription.firstName} {subscription.lastName}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(subscription.createdAt)}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(subscription.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{subscription.email}</span>
                  </div>
                  
                  {subscription.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{subscription.phone}</span>
                    </div>
                  )}
                </div>
                
                {subscription.jobDescription && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600">{subscription.jobDescription}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}