import { useEffect, useState } from "react";
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
    <div className=" bg-gradient-to-br from-cyan-900 via-cyan-700 to-cyan-500 text-white">
      <div className="p-4 py-5 space-y-8">
        <Profile user={user} />
        <QuickTaskList />
        <Categories />
      </div>
    </div>
  );
};
export default Index;
