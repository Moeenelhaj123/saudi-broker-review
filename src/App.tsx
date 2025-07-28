import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/HomePage";
import { BrokerReviewPage } from "@/components/BrokerReviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/broker/:brokerId" element={<BrokerReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;