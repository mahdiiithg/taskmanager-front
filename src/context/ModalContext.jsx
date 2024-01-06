import React from "react";

// set the defaults
const ModalContext = React.createContext({
  isModalOpen: false,
  setIsModalOpen: () => {}
});

export default ModalContext;
