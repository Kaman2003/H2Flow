import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/public/Home";
import WaterQuality from "./pages/auth/WaterQuality";
import About from "./pages/public/About";
import Product from "./pages/public/Product";
import Dashboard from "./pages/auth/Dashboard";
import SensorReadings from "./pages/auth/SensorReadings";
import { AuthProvider } from "./context/AuthContext";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<Product />} />
          </Route>

          {/* Authenticated routes */}
          <Route element={<AuthRoute />}>
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="water-quality" element={<WaterQuality />} />
              <Route path="sensor-readings" element={<SensorReadings />} />
              {/* Add more authenticated routes here */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
