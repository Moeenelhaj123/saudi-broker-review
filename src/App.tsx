import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "@/components/HomePage";
import { BrokerReviewPage } from "@/components/BrokerReviewPage";
import { BestBrokersPage } from "@/components/BestBrokersPage";
import { ArticlesPage } from "@/components/ArticlesPage";
import { ArticlePage } from "@/components/ArticlePage";
import { ContactPage } from "@/components/ContactPage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { HomePageManager } from "@/components/admin/HomePageManager";
import { BrokersManager } from "@/components/admin/BrokersManager";
import { BrokerContentManager } from "@/components/admin/BrokerContentManager";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { ContactManager } from "@/components/admin/ContactManager";
import { NewsletterManager } from "@/components/admin/NewsletterManager";
import { ContactFormTester } from "@/components/ContactFormTester";
import { ContactFormsTestPage } from "@/components/ContactFormsTestPage";
import { ImageManagerTest } from "@/components/ImageManagerTest";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

function Layout() {
  return (
    <ErrorBoundary>
      <Outlet />
      <Toaster />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="best-brokers" element={<BestBrokersPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="broker/:brokerId" element={<BrokerReviewPage />} />
          <Route path="cadmin" element={<AdminDashboard />}>
            <Route index element={<DashboardOverview />} />
            <Route path="homepage" element={<HomePageManager />} />
            <Route path="brokers" element={<BrokersManager />} />
            <Route path="brokers/:brokerId" element={<BrokerContentManager />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="contact" element={<ContactManager />} />
            <Route path="newsletter" element={<NewsletterManager />} />
            <Route path="test-forms" element={<ContactFormTester />} />
            <Route path="test-contact-forms" element={<ContactFormsTestPage />} />
            <Route path="test-images" element={<ImageManagerTest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
