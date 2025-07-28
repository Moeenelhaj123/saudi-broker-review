import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/HomePage";
import { BrokerReviewPage } from "@/components/BrokerReviewPage";
import { BestBrokersPage } from "@/components/BestBrokersPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/best-brokers" element={<BestBrokersPage />} />
        <Route path="/broker/:brokerId" element={<BrokerReviewPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;