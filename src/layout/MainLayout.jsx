import React from "react";

import { Outlet } from "react-router-dom";
import LoginModal from "../containers/LoginModal";
import AddCategoryModal from "../containers/AddCategory";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-lg mx-auto">
        <Outlet />
      </div>
      <LoginModal />
      <AddCategoryModal />
    </>
  );
};
export default MainLayout;
