import React, { useEffect, useState } from "react";
import Profile from "../containers/Profile";
import QuickTaskList from "../containers/QuickTaskList";
import Coverheader from "../containers/Coverheader";
import { https } from "../api/http";
import i18n from 'i18next';
import Cookies from "js-cookie";

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
      Cookies.set("language", res.data.language)
    };

    const error = () => {};

    https.getUser(response, error);
  };


  return (
    <div className=" min-h-screen h-full">
      <div className="p-4 py-5 space-y-8">
        <Profile user={user} getUser={() => setChanged(!changed)} />
        <Coverheader />
        <QuickTaskList />
      </div>
    </div>
  );
};
export default Index;
