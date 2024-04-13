import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { https } from "../api/http";
import ModalContext from "../context/ModalContext";

const AddCategoryModal = ( ) => {
  const { isModalOpen, setIsModalOpen, shouldGetCategory, setShouldGetCategory } = useContext(ModalContext);
  const { t } = useTranslation();
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const addCategory = () => {
    // event.preventDefault();
    setLoading(true);
    const response = (res) => {
      setShouldGetCategory(!shouldGetCategory)
      setData({
        name: "",
        description: "",
      })
      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
        // window.location.reload();
      }, 500);
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
            {t("add a task")}
          </Button>,
        ]}
      >
        <h1 className="text-3xl pb-3">{t("add")}</h1>
        <div className="space-y-2">
          <label htmlFor="Task">{t("name")}</label>
          <Input
            id="Task"
            name="name"
            placeholder={t("name")}
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="Task">{t("description")}</label>
          <Input
            id="Task"
            name='description'
            type="text"
            placeholder={t("description")}
            value={data.description}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </>
  );
};
export default AddCategoryModal;
