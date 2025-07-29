import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "best-brokers",
        element: <BestBrokersPage />
      },
      {
        path: "articles",
        element: <ArticlesPage />
      },
      {
        path: "articles/:slug",
        element: <ArticlePage />
      },
      {
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "broker/:brokerId",
        element: <BrokerReviewPage />
      },
      {
        path: "cadmin",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <DashboardOverview />
          },
          {
            path: "homepage",
            element: <HomePageManager />
          },
          {
            path: "brokers",
            element: <BrokersManager />
          },
          {
            path: "brokers/:brokerId",
            element: <BrokerContentManager />
          },
          {
            path: "articles",
            element: <ArticlesManager />
          },
          {
            path: "contact",
            element: <ContactManager />
          },
          {
            path: "newsletter",
            element: <NewsletterManager />
          },
          {
            path: "test-forms",
            element: <ContactFormTester />
          },
          {
            path: "test-contact-forms",
            element: <ContactFormsTestPage />
          },
          {
            path: "test-images",
            element: <ImageManagerTest />
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
