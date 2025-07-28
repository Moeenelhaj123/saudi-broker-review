import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, LogOut } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-16 border-b bg-card px-6">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">إدارة المحتوى</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="البحث..."
              className="h-10 w-64 rounded-md border bg-background pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -left-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* Logout */}
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
            <span className="mr-2">تسجيل الخروج</span>
          </Button>
        </div>
      </div>
    </header>
  );
}