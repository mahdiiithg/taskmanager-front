import React, { useEffect, useState } from "react";
import { Calendar } from "antd-jalali";
import dayjs from "dayjs";
import DayDetailView from "../containers/DayDetailView";
import HeaderTask from "../containers/HeaderTask";
import Cookies from "js-cookie";
import { useAddingTask } from "../state/StateManger";

const Scheduled = () => {
  // const [tasks, setTasks] = useState([]);
  const { tasks, getTasks } = useAddingTask();
  const [selectedDate, setSelectedDate] = useState(null);
  const onSelect = (value, info) => {
    if (info?.source === "date") {
      setSelectedDate(value);
      Cookies.set("selectedDate", value);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const cellRender = (value) => {
    // Convert the cell's dayjs value to a comparable string format
    const cellDate = value.format("YYYY-MM-DD");

    // Filter tasks for this specific date
    const tasksForDate = tasks.filter((task) => {
      if (task.status) return "";
      return (
        dayjs(task.dueDate || task.createdAt).format("YYYY-MM-DD") === cellDate
      );
    });

    // Render tasks for this date
    return (
      <ul className=" min-w-fit">
        {tasksForDate?.map((task) => (
          <li
            className="border border-black/20 rounded-md px-1 text-sm mb-1 overflow-hidden"
            key={task._id}
          >
            {task?.name?.substring(0, 8) || task.description?.substring(0, 8)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="px-4 py-8">
      <HeaderTask
        shouldClose={selectedDate}
        onClose={() => setSelectedDate(null)}
      />
      <div className="relative">
        <Calendar mode="month" onSelect={onSelect} cellRender={cellRender} />
        {selectedDate && (
          <div className="absolute w-full h-full top-0 right-0 bg-white z-20">
            <DayDetailView
              selectedDate={selectedDate}
              tasks={tasks}
              getTasks={getTasks}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Scheduled;
