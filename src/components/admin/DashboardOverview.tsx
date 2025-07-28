import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Eye,
  ThumbsUp,
  Star
} from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "إجمالي الوسطاء",
      value: "12",
      change: "+2",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "المقالات المنشورة",
      value: "28",
      change: "+5",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "رسائل التواصل",
      value: "156",
      change: "+23",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      title: "زوار الموقع",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  const recentActivity = [
    {
      action: "تم إضافة وسيط جديد",
      target: "IC Markets",
      time: "منذ ساعتين",
      type: "broker",
    },
    {
      action: "تم نشر مقال جديد",
      target: "أفضل استراتيجيات التداول",
      time: "منذ 4 ساعات",
      type: "article",
    },
    {
      action: "رسالة تواصل جديدة",
      target: "من أحمد محمد",
      time: "منذ 6 ساعات",
      type: "contact",
    },
    {
      action: "تحديث محتوى وسيط",
      target: "Exness",
      time: "منذ يوم",
      type: "broker",
    },
  ];

  const topBrokers = [
    { name: "Exness", views: "1,234", rating: 4.5, reviews: 89 },
    { name: "AvaTrade", views: "987", rating: 4.2, reviews: 67 },
    { name: "IC Markets", views: "756", rating: 4.3, reviews: 45 },
    { name: "XM", views: "654", rating: 4.1, reviews: 78 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">نظرة عامة على لوحة التحكم</h2>
        <p className="text-muted-foreground">
          مرحباً بك في لوحة التحكم. هنا يمكنك إدارة جميع محتويات موقع وسطاء السعودية.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">من الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'broker' ? 'bg-blue-500' :
                    activity.type === 'article' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.target}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Brokers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              أفضل الوسطاء أداءً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBrokers.map((broker, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{broker.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{broker.views} مشاهدة</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{broker.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{broker.reviews} تقييم</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}