import { Outlet } from "react-router-dom";
import GoogleAnalytics from "../components/common/GoogleAnalytics";

const MainLayout = () => {
  return (
    <div>
      <GoogleAnalytics />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
