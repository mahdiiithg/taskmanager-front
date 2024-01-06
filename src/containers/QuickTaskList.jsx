import React from "react";

import QuickTasks from "../components/QuickTasks";
import { IoTimerSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { BsCalendar2CheckFill } from "react-icons/bs";

const QuickTaskList = () => {
  return (
    <div className="flex flex-col space-y-3">
      <QuickTasks
        icon={
          <div className="bg-red-600/30 text-red-600 rounded-full p-1">
            <FaStar size={22} />
          </div>
        }
        to="/importatns"
        title="High Priorities"
      />
      <QuickTasks
        icon={
          <div className="bg-blue-600/30 text-blue-600 rounded-full p-2">
            <BsCalendar2CheckFill size={19} />
          </div>
        }
        to="/scheduled"
        title="In Schedule"
      />
      <QuickTasks
        icon={
          <div className="bg-yellow-600/30 text-yellow-600 rounded-full p-1">
            <IoTimerSharp size={25} />
          </div>
        }
        to="/today"
        title="Today"
      />
    </div>
  );
};
export default QuickTaskList;
