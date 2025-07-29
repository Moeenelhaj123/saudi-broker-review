import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 mr-64">
          <AdminHeader />
          
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}