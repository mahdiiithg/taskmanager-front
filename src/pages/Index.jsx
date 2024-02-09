import React, { useEffect, useState } from "react";
import Profile from "../containers/Profile";
import QuickTaskList from "../containers/QuickTaskList";
import Coverheader from "../containers/Coverheader";
import { https } from "../api/http";
import i18n from 'i18next';

const Index = () => {

  const [user, setUser] = useState({});
  const [changed, setChanged] = useState(true);

  useEffect(() => {
    getUser()
  },[changed])

  const getUser = () => {
    const response = (res) => {
      setUser(res.data);
      i18n.changeLanguage(res.data.language)
    };

    const error = () => {};

    https.getUser(response, error);
  };


  return (
    <div className=" min-h-screen h-full" dir={user?.language === 'en' ? "ltr" : 'rtl'}>
      <div className="p-4 py-5 space-y-8">
        <Profile user={user} getUser={() => setChanged(!changed)} />
        {/* <h1 className=" text-2xl font-semibold leading-[0]">My Task</h1>
        <p className=" leading-[0] text-black/50">Ongoing tasks</p> */}
        <Coverheader lng={user?.language} />
        <QuickTaskList />
        {/* <Categories /> */}
      </div>
    </div>
  );
};
export default Index;
