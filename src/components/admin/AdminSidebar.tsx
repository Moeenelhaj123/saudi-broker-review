import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart3,
  Building2,
  FileText,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  Mail
} from "lucide-react";

const menuItems = [
  {
    title: "لوحة التحكم",
    href: "/cadmin",
    icon: BarChart3,
  },
  {
    title: "الصفحة الرئيسية",
    href: "/cadmin/homepage",
    icon: Home,
  },
  {
    title: "إدارة الوسطاء",
    href: "/cadmin/brokers",
    icon: Building2,
  },
  {
    title: "إدارة المقالات",
    href: "/cadmin/articles",
    icon: FileText,
  },
  {
    title: "إدارة التواصل",
    href: "/cadmin/contact",
    icon: MessageSquare,
  },
  {
    title: "النشرة الإخبارية",
    href: "/cadmin/newsletter",
    icon: Mail,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "fixed right-0 top-0 z-40 h-screen border-l bg-card transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">لوحة التحكم</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4">
          <div className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Users className="h-4 w-4" />
            </div>
            {!collapsed && (
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">المدير</p>
                <p className="text-xs text-muted-foreground">admin@brokers.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}