import React from "react";

// set the defaults
const ModalContext = React.createContext({
  isModalOpen: false,
  isModalLoginOpen: false,
  shouldGetCategory: false,
  updateApi: false,
  language: "fa",
  setIsModalLoginOpen: () => {},
  setIsModalOpen: () => {},
  setShouldGetCategory: () => {},
  setUpdateApi: () => {},
  setLanguage: () => {},
});

export default ModalContext;
