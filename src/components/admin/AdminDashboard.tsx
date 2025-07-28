import { Routes, Route } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardOverview } from "./DashboardOverview";
import { HomePageManager } from "./HomePageManager";
import { BrokersManager } from "./BrokersManager";
import { BrokerContentManager } from "./BrokerContentManager";
import { ArticlesManager } from "./ArticlesManager";
import { ContactManager } from "./ContactManager";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 mr-64">
          <AdminHeader />
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/homepage" element={<HomePageManager />} />
              <Route path="/brokers" element={<BrokersManager />} />
              <Route path="/brokers/:brokerId" element={<BrokerContentManager />} />
              <Route path="/articles" element={<ArticlesManager />} />
              <Route path="/contact" element={<ContactManager />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}