import React, { useEffect, useState } from "react";
import Categories from "../containers/Categories";
import Profile from "../containers/Profile";
import QuickTaskList from "../containers/QuickTaskList";
import { https } from "../api/http";

const Index = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    getUser()
  },[])

  const getUser = () => {
    const response = (res) => {
      setUser(res.data);
    };

    const error = () => {};

    https.getUser(response, error);
  };


  return (
    <div className=" min-h-screen h-full">
      <div className="p-4 py-5 space-y-8">
        <Profile user={user} />
        <h1 className=" text-2xl font-semibold leading-[0]">My Task</h1>
        <p className=" leading-[0] text-black/50">Ongoing tasks</p>
        <QuickTaskList />
        <Categories />
      </div>
    </div>
  );
};
export default Index;
