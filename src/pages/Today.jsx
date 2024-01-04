import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import { https } from "../api/http";
import dayjs from "dayjs";

// const getWeekDates = () => {
//   const currentDate = new Date();
//   const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
//   const dates = [];

//   for (let i = 0; i <= 7; i++) {
//     let date = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       firstDayOfWeek + i
//     );
//     if (date.getMonth() === currentDate.getMonth()) {
//       dates.push({
//         day: date
//           .toLocaleDateString("en-US", { weekday: "short" })
//           .toUpperCase(),
//         date: date.getDate(),
//         isToday: date.toDateString() === new Date().toDateString(),
//       });
//     }
//   }

//   return dates;
// };

const getWeekDates = (date = new Date()) => {
  const firstDayOfWeek = date.getDate() - date.getDay();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    let weekDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      firstDayOfWeek + i
    );
    if (weekDate.getMonth() === date.getMonth()) {
      dates.push({
        day: weekDate.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        date: weekDate.getDate(),
        month: weekDate.getMonth(),
        year: weekDate.getFullYear(),
        isToday: weekDate.toDateString() === new Date().toDateString(),
      });
    }
  }

  return dates;
};


const DateScroll = ({ onSelect, selectedDate }) => {
  const [weekDates, setWeekDates] = useState([]);

  // useEffect(() => {
  //   setWeekDates(getWeekDates());
  // }, []);
  useEffect(() => {
    // Check if selectedDate is set, otherwise default to current date
    const dateToUse = selectedDate ? selectedDate.toDate() : new Date();
    setWeekDates(getWeekDates(dateToUse));
  }, [selectedDate]);

  const Dot = ({ isToday }) => {
    return isToday && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1" />;
  };

  const handleDateClick = (dateObj) => {
    // Use the current year and month from the system's date
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    // Convert the dateObj to a dayjs object
    const selectedDate = dayjs(new Date(year, month, dateObj.date));
    // Call the passed onSelect function with the dayjs object
    onSelect(selectedDate);
  };


  return (
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 py-4 w-full justify-between">
      {weekDates.map((dateObj, index) => {
        // Check if the dateObj corresponds to the selectedDate
        const isSelectedDate = selectedDate?.isSame(
          new Date(selectedDate?.year(), selectedDate?.month(), dateObj?.date),
          "day"
        );

        return (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleDateClick(dateObj)}
          >
            <div className="text-sm font-medium text-gray-800">
              {dateObj.day}
            </div>
            <div
              className={`text-lg font-semibold ${
                isSelectedDate ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {dateObj.date}
            </div>
            {isSelectedDate && <Dot />}
            <Dot isToday={dateObj?.isToday} />
          </div>
        );
      })}
    </div>
  );
};

const DayDetailView = ({ selectedDate, tasks, onSelect }) => {
  const formattedDate = selectedDate.format("YYYY-MM-DD");
  // State for border and background color
  const baseColors = ["red", "green", "blue", "yellow", "purple", "pink"];

  // State for base color
  const [baseColor, setBaseColor] = useState("");

  // Function to get a random base color
  const getRandomBaseColor = () => {
    const randomIndex = Math.floor(Math.random() * baseColors.length);
    return baseColors[randomIndex];
  };

  // Update base color randomly
  useEffect(() => {
    setBaseColor(getRandomBaseColor());
    // You can also set an interval here if you want to change colors periodically
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hourFormattedStart = `${formattedDate}T${i
      .toString()
      .padStart(2, "0")}:00:00`;
    const hourFormattedEnd = `${formattedDate}T${(i + 1)
      .toString()
      .padStart(2, "0")}:00:00`;

    // Filter tasks that start within this hour
    const tasksForHour = tasks.filter((task) => {
      const taskTime = dayjs(task.createdAt);
      return (
        taskTime.isAfter(dayjs(hourFormattedStart)) &&
        taskTime.isBefore(dayjs(hourFormattedEnd))
      );
    });

    return (
      <li className="flex items-center gap-x-2 py-4" key={i}>
        {i}:00
        <ul className="flex flex-col gap-y-2">
          {tasksForHour.length > 0 ? (
            tasksForHour.map((task) => (
              <li
                className={`border-l-8 rounded-l-none border-${baseColor}-500 bg-${baseColor}-100 py-1 px-2 rounded-md flex flex-col`}
                key={task._id}
              >
                {task.description}
              </li>
            ))
          ) : (
            <> </>
          )}
        </ul>
      </li>
    );
  });

  return (
    <div>
      <h2>Details for {formattedDate}</h2>
      <ul>{hours}</ul>
    </div>
  );
};

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  // const onPanelChange = (value, mode) => {
  //   console.log(value.format("YYYY-MM-DD"), mode);
  // };

  const cellRender = (value) => {
    // Convert the cell's dayjs value to a comparable string format
    const cellDate = value.format("YYYY-MM-DD");

    // Filter tasks for this specific date
    const tasksForDate = tasks.filter(
      (task) => dayjs(task.createdAt).format("YYYY-MM-DD") === cellDate
    );

    // Render tasks for this date
    return (
      <ul>
        {tasksForDate.map((task) => (
          <li
            className="border border-black/10 bg-black/10 rounded-md p-1 text-sm"
            // onClick={() => alert(task.description)}
            key={task._id}
          >
            {task.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <DateScroll onSelect={onSelect} selectedDate={selectedDate} />
      <div className="relative">
        <Calendar
          onSelect={onSelect}
          // onPanelChange={onPanelChange}
          cellRender={cellRender}
        />
        {selectedDate && (
          <div className="absolute w-full h-full top-0 right-0 bg-white z-20">
            <button className=" absolute top-0 right-1 rounded-full px-2 py-1 bg-red-600 text-white" onClick={() => setSelectedDate(null)}>close</button>
            <DayDetailView selectedDate={selectedDate} tasks={tasks} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Today;
