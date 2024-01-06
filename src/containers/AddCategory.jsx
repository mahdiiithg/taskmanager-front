import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import { https } from "../api/http";
import ModalContext from "../context/ModalContext";
const AddCategoryModal = ( ) => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(true);

  const addCategory = () => {
    // event.preventDefault();
    setLoading(true);
    const response = (res) => {
      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
        window.location.reload();
      }, 1500);
    };

    const error = (error) => {
      setLoading(false);
      alert(error);
    };

    https.addCategory(response, error, data);
  };

  const handleOk = () => {
    setLoading(true);
    addCategory();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setLoading(false);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        open={isModalOpen}
        footer={[
          <Button
            key="submit"
            className="w-full mt-3"
            // type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <h1 className="text-3xl pb-3">Add a category</h1>
        <div className="space-y-2">
          <label htmlFor="Task">name</label>
          <Input
            id="Task"
            name="name"
            placeholder="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="Task">description</label>
          <Input
            id="Task"
            name="description"
            type="text"
            placeholder="description"
            value={data.description}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </>
  );
};
export default AddCategoryModal;
