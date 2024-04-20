import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DateScroll from "../containers/ScrollDate";
import DayDetailView from "../containers/DayDetailView";
import HeaderTask from "../containers/HeaderTask";
import { useAddingTask } from "../state/StateManger";

const Today = () => {
  const { tasks, getTasks } = useAddingTask();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const onSelect = (value) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    getTasks();
  }, []);


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
