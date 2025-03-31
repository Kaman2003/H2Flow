import { Outlet } from "react-router-dom";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <AuthenticatedNavbar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
