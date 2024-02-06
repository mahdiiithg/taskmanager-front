import React, { useContext, useEffect, useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { https } from "../api/http";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import ModalContext from "../context/ModalContext";
import i18n from "i18next";

const containerMotion = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const Profile = ({ user, getUser }) => {
  const [hasLoggedIn, setHasLoggedIn] = useState(user.name || null);
  const { setIsModalLoginOpen } = useContext(ModalContext);

  useEffect(() => {
    setHasLoggedIn(user.name || null);
  }, [user]);

  const logout = () => {
    const response = () => {
      Cookies.remove("userToken");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };
    const error = () => {};

    https.logout(response, error);
  };

  const updateUserLng = () => {
    const language = user.language === "en" ? "fa" : "en";
    const response = (res) => {
      getUser(language);
      i18n.changeLanguage(language);
    };
    const error = () => {};

    https.updateUser(response, error, {
      language,
    });
  };

  return (
    <motion.div
      className={`flex items-center w-full justify-between capitalizepx-2 pb-8  ${containerMotion}`}
      variants={containerMotion}
      initial="hidden"
      animate="visible"
    >
        <div className="flex items-center">
          <img
            src="/images/3dProfileOrange.webp"
            alt="profile pic"
            className="h-16 w-1h-16 rounded-full"
          />
          <div className="flex flex-col text-xs pl-3">
            <div className=" font-semibold">
              {user.name} - {user.age}
            </div>
            <div className="text-xs text-black/80">{user.email}</div>
          </div>
        </div>
          <button className="gap-1 flex items-center" onClick={updateUserLng}>
            <img
              className="h-10"
              src="images/language.webp"
              alt="language earth"
            />
            <div>{user?.language === "en" ? "en" : "فارسی"}</div>
          </button>
          {hasLoggedIn ? (
            <button className="px-1 py-1 text-sm" onClick={logout}>
              <CiLogout size={26} />
            </button>
          ) : (
            <button
              className="px-1 py-1 text-sm"
              onClick={() => setIsModalLoginOpen(true)}
            >
              <CiLogin size={26} />
            </button>
          )}
    </motion.div>
  );
};
export default Profile;
