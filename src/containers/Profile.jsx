import React from "react";
import { RxExit } from "react-icons/rx";
import { https } from "../api/http";
import Cookies from "js-cookie";

const Profile = ({ user }) => {
  
  const logout = () => {
    const response = () => {
      Cookies.remove("userToken")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    };
    const error = () => {};

    https.logout(response, error);
  };

  return (
    <div className=" flex flex-col items-center capitalize py-2 px-2">
      <img
        src="https://vanwinefest.ca/wp-content/uploads/bfi_thumb/profile-default-male-nyg4vc4i3m1d5pote7rfsv4o4c7p5ka5an0pselxcc-nyhjt6b1oifa23xq2ehfxoh9vink6vuxyns1y35vkc.png"
        alt="profile pic"
        className="h-20 w-20 rounded-full border border-black/20"
      />
      <div className=" font-semibold">
        {user.name} - {user.age}
      </div>
      <div className="text-sm text-black/80">{user.email}</div>
      <button
        className="px-1 py-1 text-sm absolute top-3 right-3"
        onClick={logout}
      >
        <RxExit size={26} />
      </button>
    </div>
  );
};
export default Profile;
