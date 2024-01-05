import dayjs from "dayjs";
import { useState } from "react";
import { CgRadioChecked, CgRadioCheck } from "react-icons/cg";

import { https } from "../api/http";
import { Link } from "react-router-dom";

const DayDetailView = ({ selectedDate, tasks, getTasks }) => {
  const formattedDate = selectedDate.format("YYYY-MM-DD");
  // State for border and background color
  const baseColors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "gray",
    "teal",
    "orange",
    "lime",
    "emerald",
  ];

  // State for base color
  const [baseColor, setBaseColor] = useState("");

  // Function to get a random base color
  const getRandomBaseColor = () => {
    const randomIndex = Math.floor(Math.random() * baseColors.length);
    return baseColors[randomIndex];
  };

  // Update base color randomly
  // useEffect(() => {
  //   setBaseColor(getRandomBaseColor());
  //   // You can also set an interval here if you want to change colors periodically
  // }, [tasks]);

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hourFormattedStart = `${formattedDate}T${i
      .toString()
      .padStart(2, "0")}:00:00`;
    const hourFormattedEnd = `${formattedDate}T${(i + 1)
      .toString()
      .padStart(2, "0")}:00:00`;

    // Filter tasks that start within this hour
    const tasksForHour = tasks.filter((task) => {
      const taskTime = task.dueDate
        ? dayjs(task.dueDate)
        : dayjs(task.createdAt);
      return (
        taskTime.isAfter(dayjs(hourFormattedStart)) &&
        taskTime.isBefore(dayjs(hourFormattedEnd))
      );
    });

    const toggleTaskStatus = (id, status) => {
      const response = () => {
        getTasks();
      };

      const error = () => {};

      https.toggleTaskStatus(response, error, id, { status });
    };

    return (
      <li className="flex items-center gap-x-2 py-4 w-full border-b" key={i}>
        {i}:00
        <ul className="flex flex-col gap-y-2 w-full ">
          {tasksForHour.length > 0 ? (
            tasksForHour.map((task) => {
              return (
                <li
                  style={{
                    borderLeft: `8px solid ${task.color}`,
                    // backgroundColor: `${baseColor}`
                  }}
                  className={`
                    border-l-8 w-full justify-between 
                    rounded-l-none
                    bg-[${task.color}]/10
                    ${task.status && "line-through"}
                    py-1
                    px-2
                    rounded-md
                    flex
                    `}
                  key={task._id}
                >
                  <Link className="flex-1" to={`/add-task/${task._id}`}>
                    <span>{task?.name || task.description}</span>
                  </Link>
                  <span
                    onClick={() => toggleTaskStatus(task._id, !task.status)}
                  >
                    {task.status ? (
                      <CgRadioChecked size={20} className="text-blue-700" />
                    ) : (
                      <CgRadioCheck size={20} className="text-blue-700" />
                    )}
                  </span>
                </li>
              );
            })
          ) : (
            <> </>
          )}
        </ul>
      </li>
    );
  });

  return (
    <div className="w-full">
      <ul className="w-full">{hours}</ul>
    </div>
  );
};

export default DayDetailView;
