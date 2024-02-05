import React from "react";

// set the defaults
const ModalContext = React.createContext({
  isModalOpen: false,
  isModalLoginOpen: false,
  shouldGetCategory: false,
  setIsModalLoginOpen: () => {},
  setIsModalOpen: () => {},
  setShouldGetCategory: () => {}
});

export default ModalContext;
