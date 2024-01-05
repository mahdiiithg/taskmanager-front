import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import Cookies from "js-cookie";
import { https } from "../api/http";
const LoginModal = () => {
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
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        window.location.reload()
      }, 1500);
    };

    const error = (error) => {
      setLoading(false);
      alert(error);
    };

    https.login(response, error, data);
  };

  const handleOk = () => {
    setLoading(true);
    login()
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            // type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <h1 className="text-3xl">Welcome</h1>
        <h1 className="text-xl text-black/60 py-2 ">
          please login to use the app
        </h1>
        <div className="space-y-2">
          <label htmlFor="Task">email</label>
          <Input
            id="Task"
            name="email"
            placeholder="email"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="Task">password</label>
          <Input
            id="Task"
            name="password"
            type="password"
            placeholder="password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </>
  );
};
export default LoginModal;
