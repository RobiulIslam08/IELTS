import { Outlet } from "react-router-dom";
import PublicNavbar from "../pages/public/PublicNavbar";
import PublicFooter from "../pages/public/PublicFooter";

const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <PublicNavbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <PublicFooter />
  </div>
);

export default PublicLayout;
