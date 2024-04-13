import dayjs from "dayjs";
import jalaali from 'jalaali-js';

import React from "react";
import { CgRadioChecked, CgRadioCheck } from "react-icons/cg";

import { https } from "../api/http";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// import utc from 'dayjs/plugin/utc'; // make sure to import and use UTC plugin for dayjs
// dayjs.extend(utc);

const convertJalaliToGregorian = (jalaliDateInput) => {
  // Ensure jalaliDateInput is a string
  const jalaliDateString = jalaliDateInput.format ? jalaliDateInput.format('YYYY-MM-DD') : String(jalaliDateInput);
  
  // Proceed with splitting the date and time
  const [date, time] = jalaliDateString.split('T');
  const [year, month, day] = date.split('-').map(Number);

  const gregorian = jalaali.toGregorian(year, month, day);
  // Assuming you want to keep the original time and timezone offset
  return `${gregorian.gy}-${String(gregorian.gm).padStart(2, '0')}-${String(gregorian.gd).padStart(2, '0')}`;
};

const DayDetailView = ({ selectedDate, tasks, getTasks }) => {
  
  const jalaliDate = selectedDate; // This should be a string
  const gregorianDate = convertJalaliToGregorian(jalaliDate); // Convert to Gregorian
  console.log("gregorianDate", gregorianDate);
  // Convert the Gregorian date to UTC to match your tasks' timestamp format
  // const formattedDate = dayjs(gregorianDate).utc().format("YYYY-MM-DD");
  const formattedDate = gregorianDate
  console.log("formattedDate", formattedDate);
  // const formattedDate = selectedDate.format("YYYY-MM-DD");
  Cookies.set("selectedDate", JSON.stringify(selectedDate));
  const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";

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

    // console.log("tasksForHour", tasksForHour);

    const toggleTaskStatus = (id, status) => {
      const response = () => {
        getTasks();
      };

      const error = () => {};

      https.toggleTaskStatus(response, error, id, { status });
    };

    return (
      <li className="flex items-center gap-x-2 py-4 w-full border-b" key={i}>
        {i.toLocaleString(localDetector)}:{(0).toLocaleString(localDetector)}
        {(0).toLocaleString(localDetector)}
        <ul className="flex flex-col gap-y-2 w-full ">
          {tasksForHour.length > 0 ? (
            tasksForHour?.map((task) => {
              const colorCode = task.color;
              return (
                <li
                  style={{
                    borderLeft: `8px solid ${colorCode}`,
                    // backgroundColor: `${task.color}`
                  }}
                  className={`
                    border-l-8 w-full justify-between 
                    rounded-l-none
                    bg-[${colorCode}]
                    bg-opacity-30
                    ${task.status && "line-through"}
                    py-2
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
                      <CgRadioChecked size={20} className={"text-blue-700"} />
                    ) : (
                      <CgRadioCheck size={20} className={"text-blue-700"} />
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
