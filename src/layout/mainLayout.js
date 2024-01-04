import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="p-2 space-y-5 py-10 max-w-lg mx-auto">
      <Outlet />
    </div>
  );
};
export default MainLayout;
