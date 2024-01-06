import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import LoginModal from "../containers/LoginModal";
import AddCategoryModal from "../containers/AddCategory";
import ModalContext from "../context/ModalContext";

const MainLayout = () => {
  // const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const value = { isModalOpen, setIsModalOpen };

  return (
    <>
      <ModalContext.Provider value={value}>
        <div className="max-w-lg mx-auto">
          <Outlet />
        </div>
        <LoginModal />
        <AddCategoryModal isModalOpen={isModalOpen} />
      </ModalContext.Provider>
    </>
  );
};
export default MainLayout;
