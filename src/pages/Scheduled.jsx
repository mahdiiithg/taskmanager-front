import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import { https } from "../api/http";
import dayjs from "dayjs";
import DayDetailView from "../containers/DayDetailView";
import HeaderTask from "../containers/HeaderTask";
import Cookies from "js-cookie";

const Scheduled = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const onSelect = (value) => {
    setSelectedDate(value);
    Cookies.set("selectedDate", value)
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

  const cellRender = (value) => {
    // Convert the cell's dayjs value to a comparable string format
    const cellDate = value.format("YYYY-MM-DD");

    // Filter tasks for this specific date
    const tasksForDate = tasks.filter(
      (task) => dayjs(task.dueDate || task.createdAt).format("YYYY-MM-DD") === cellDate
    );

    // Render tasks for this date
    return (
      <ul>
        {tasksForDate.map((task) => (
          <li
            className="border border-black/10 bg-black/10 rounded-md p-1 text-sm"
            key={task._id}
          >
            {task.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="px-4 py-8">
      <HeaderTask shouldClose={selectedDate} onClose={() => setSelectedDate(null)} />
      <div className="relative">
        <Calendar onSelect={onSelect} cellRender={cellRender} />
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
