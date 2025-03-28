
import Navbar from "@/components/Navbar";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import Footer from "@/components/Footer";

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnalyticsDashboard />
      <Footer />
    </div>
  );
};

export default Analytics;
