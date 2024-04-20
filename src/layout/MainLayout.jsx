import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import LoginModal from "../containers/LoginModal";
import AddCategoryModal from "../containers/AddCategory";
import ModalContext from "../context/ModalContext";
import i18n from "i18next";
import { https } from "../api/http";
import AddTask from "../pages/AddTask";
import { useAddingTask } from "../state/StateManger";

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);
  const [user, setUser] = useState({});
  const [language, setLanguage] = useState("fa");
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [shouldGetCategory, setShouldGetCategory] = useState(false);
  const value = {
    isModalOpen,
    setIsModalOpen,
    isModalLoginOpen,
    setIsModalLoginOpen,
    shouldGetCategory,
    setShouldGetCategory,
    setLanguage,
    language,
    setUpdateApi,
    updateApi,
  };

  const isAddingTask = useAddingTask((state) => state.isAddingTask);
  const closeIsAddingTask = useAddingTask((state) => state.closeIsAddingTask);
  const addingTaskRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addingTaskRef.current && !addingTaskRef.current.contains(event.target)) {
        closeIsAddingTask(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    getUser();
  }, [updateApi]);

  const getUser = () => {
    const response = (res) => {
      setUser(res.data);
      i18n.changeLanguage(res.data.language);
      setLanguage(res.data.language);
    };

    const error = () => {};

    https.getUser(response, error);
  };

  return (
    <>
      <ModalContext.Provider value={value}>
        {/* <Profile user={user} getUser={() => setChanged(!changed)} /> */}
        <div
          className="max-w-lg mx-auto"
          dir={language === "en" ? "ltr" : "rtl"}
        >
          <Outlet />
          <div
            
            style={{
              boxShadow: "0px -5px 15px -1px rgba(0,0,0,0.1)",
            }}
            className={`fixed bottom-0 z-50 shadow-lg w-full rounded-2xl max-w-lg mx-auto overflow-hidden ${
              isAddingTask ? "h-[270px]" : "h-[0px]"
            } bg-white border-t transition-all ease-in-out`}
          >
            <AddTask />
          </div>
        </div>
        <LoginModal language={language} isModalLoginOpen={isModalLoginOpen} />
        <AddCategoryModal isModalOpen={isModalOpen} />
      </ModalContext.Provider>
    </>
  );
};
export default MainLayout;
