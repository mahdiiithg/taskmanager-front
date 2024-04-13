import React, { useEffect, useState } from "react";
import { https } from "../api/http";
import dayjs from "dayjs";
import DateScroll from "../containers/ScrollDate";
import DayDetailView from "../containers/DayDetailView";
import HeaderTask from "../containers/HeaderTask";

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const onSelect = (value) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    const response = (res) => {
      setTasks(res.data);
    };

    const error = () => {};

    https.getTasks(response, error);
  };

  return (
    <div className="p-4 space-y-4">
      <HeaderTask selectedDate={selectedDate} />
      <DateScroll onSelect={onSelect} selectedDate={selectedDate} />
      <div className="relative">
          <div className="absolute w-full h-full top-0 right-0 bg-white z-20">
            <DayDetailView selectedDate={selectedDate} tasks={tasks} getTasks={getTasks} />
          </div>
      </div>
    </div>
  );
};
export default Today;
