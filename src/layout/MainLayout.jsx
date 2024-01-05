import { Outlet } from "react-router-dom";
import LoginModal from "../containers/LoginModal";

const MainLayout = () => {
  return (
    <>
    <div className="max-w-lg mx-auto">
      <Outlet />
    </div>
    <LoginModal />
    </>
  );
};
export default MainLayout;
