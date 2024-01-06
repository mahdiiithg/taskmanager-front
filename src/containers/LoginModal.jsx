import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import Cookies from "js-cookie";
import { https } from "../api/http";
const LoginModal = () => {
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
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        window.location.reload();
      }, 1500);
    };

    const error = (error) => {
      setLoading(false);
      alert(error);
    };

    https.login(response, error, data);
  };

  const register = () => {
    // event.preventDefault();
    setLoading(true);
    const response = () => {
      setIsLogining(true)
      setLoading(false);
    };

    const error = (error) => {
      setLoading(false);
      alert(error);
    };

    https.register(response, error, data);
  };

  const handleOk = () => {
    setLoading(true);
    if(!isLogining) return register()
    login();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setLoading(false)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
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
        <h1 className="text-3xl">Welcome</h1>
        <h2 className="text-xl text-black/60 py-2 ">
          please login to use the app
        </h2>
        {!isLogining && (
          <>
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
              <label htmlFor="Task">age</label>
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
          <label htmlFor="Task">email</label>
          <Input
            id="Task"
            name="email"
            placeholder="email"
            value={data.email}
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
        <p>Don't have account? <button onClick={() => setIsLogining(false)} className=" text-blue-800 underline">resgister</button></p>
      </Modal>
    </>
  );
};
export default LoginModal;
