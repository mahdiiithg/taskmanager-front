import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoginModal from "../containers/LoginModal";
import AddCategoryModal from "../containers/AddCategory";
import ModalContext from "../context/ModalContext";
import Cookies from "js-cookie";
import i18n from 'i18next';
import { https } from "../api/http";
import Profile from "../containers/Profile";

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);
  const [user, setUser] = useState({})
  const [language, setLanguage] = useState('fa');
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [changed, setChanged] = useState(true)
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
    updateApi
  };

  useEffect(() => {
    getUser()
  },[updateApi])

  const getUser = () => {
    const response = (res) => {
      setUser(res.data);
      i18n.changeLanguage(res.data.language)
      setLanguage(res.data.language)
    };

    const error = () => {};

    https.getUser(response, error);
  };

  console.log("language", language);
  return (
    <>
      <ModalContext.Provider value={value}>
      {/* <Profile user={user} getUser={() => setChanged(!changed)} /> */}
        <div className="max-w-lg mx-auto" dir={language === 'en' ? "ltr" : 'rtl'} >
          <Outlet />
        </div>
        <LoginModal language={language} isModalLoginOpen={isModalLoginOpen} />
        <AddCategoryModal isModalOpen={isModalOpen} />
      </ModalContext.Provider>
    </>
  );
};
export default MainLayout;
