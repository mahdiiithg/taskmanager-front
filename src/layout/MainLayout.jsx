import React, { useState } from "react";
import { notification } from "antd";
import { Outlet } from "react-router-dom";
import LoginModal from "../containers/LoginModal";
import AddCategoryModal from "../containers/AddCategory";
import ModalContext from "../context/ModalContext";

const MainLayout = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [shouldGetCategory, setShouldGetCategory] = useState(false);
  const value = {
    isModalOpen,
    setIsModalOpen,
    isModalLoginOpen,
    setIsModalLoginOpen,
    shouldGetCategory,
    setShouldGetCategory,
  };

  // const openNotification = (placement, message) => {
  //   api.info({
  //     message: `Message`,
  //     description: <ModalContext.Consumer>{({ isModalOpen }) => `${isModalOpen}!`}</ModalContext.Consumer>,
  //     placement,
  //   });
  // };

  return (
    <>
      <ModalContext.Provider value={value}>
      {contextHolder}
        <div className="max-w-lg mx-auto">
          <Outlet />
        </div>
        <LoginModal isModalLoginOpen={isModalLoginOpen} />
        <AddCategoryModal isModalOpen={isModalOpen} />
      </ModalContext.Provider>
    </>
  );
};
export default MainLayout;
