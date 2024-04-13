import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import Cookies from "js-cookie";
import { https } from "../api/http";
import ModalContext from "../context/ModalContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const LoginModal = ({language}) => {
  const { isModalLoginOpen, setIsModalLoginOpen } = useContext(ModalContext);
  const { t } = useTranslation();
  const [isLogining, setIsLogining] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(Cookies.get("userToken") ? false : true);

  const login = () => {
    // event.preventDefault();
    setLoading(true);
    const response = (res) => {
      Cookies.set("userToken", res.data.token);
      toast.success(t(`login was successful`));
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        setIsModalLoginOpen(false);
        window.location.reload();
      }, 1500);
    };

    const error = (error) => {
      setLoading(false);
      toast.error(`error: ${error?.response?.data || "some thing went wrong"}`);
    };

    https.login(response, error, {
      email: data.email,
      password: data.password,
    });
  };

  const register = () => {
    // event.preventDefault();
    setLoading(true);
    const response = () => {
      setIsLogining(true);
      setLoading(false);
      toast.success(`register was successful`);
    };

    const error = (error) => {
      setLoading(false);
      toast.error(`error: ${error?.response?.data}`);
    };

    https.register(response, error, data);
  };

  const handleOk = () => {
    setLoading(true);
    if (!isLogining) return register();
    login();
  };
  const handleCancel = () => {
    setOpen(false);
    setIsModalLoginOpen(false);
  };

  const handleInputChange = (e) => {
    setLoading(false);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        open={open || isModalLoginOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={`${language === 'fa' ? 'text-right' : 'text-left' }`}
        footer={[
          <Button
            key="submit"
            className="w-full mt-3"
            // type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {t("Submit")}
          </Button>,
        ]}
      >
        <h1 className="text-3xl">{t("Welcome")}</h1>
        <h2 className="text-xl text-black/60 py-2 ">
          {t("please login to use the app")}
        </h2>
        {!isLogining && (
          <>
            <div className="space-y-2">
              <label htmlFor="Task">{t("name")}</label>
              <Input
                id="Task"
                name="name"
                placeholder="name"
                value={data.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Task">{t("age")}</label>
              <Input
                id="Task"
                name="age"
                type="number"
                placeholder="age"
                value={data.age}
                onChange={handleInputChange}
              />
            </div>{" "}
          </>
        )}
        <div className="space-y-2">
          <label htmlFor="Task">{t("email")}</label>
          <Input
            id="Task"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="Task">{t("password")}</label>
          <Input
            id="Task"
            name="password"
            type="password"
            placeholder="password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        {isLogining ? (
          <p>
            {t("Don't have account?")}{" "}
            <button
              onClick={() => setIsLogining(false)}
              className=" text-blue-800 underline"
            >
              {t("resgister")}
            </button>
          </p>
        ) : (
          <p>
            {t("have an account?")}
            <button
              onClick={() => setIsLogining(true)}
              className=" text-blue-800 underline"
            >
              {t("Login")}
            </button>
          </p>
        )}
      </Modal>
    </>
  );
};
export default LoginModal;
