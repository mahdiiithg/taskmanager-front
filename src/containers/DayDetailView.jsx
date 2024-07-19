import dayjs from "dayjs";
import jalaali from 'jalaali-js';
import React from "react";
import { CgRadioChecked, CgRadioCheck } from "react-icons/cg";
import { useAddingTask } from "../state/StateManger";
import { https } from "../api/http";
import Cookies from "js-cookie";

const convertJalaliToGregorian = (jalaliDateInput) => {
  const jalaliDateString = jalaliDateInput.format ? jalaliDateInput.format('YYYY-MM-DD') : String(jalaliDateInput);
  const [date, time] = jalaliDateString.split('T');
  const [year, month, day] = date.split('-').map(Number);

  const gregorian = jalaali.toGregorian(year, month, day);
  return `${gregorian.gy}-${String(gregorian.gm).padStart(2, '0')}-${String(gregorian.gd).padStart(2, '0')}`;
};

const DayDetailView = ({ selectedDate, tasks, getTasks }) => {
  const { setEditingTask, toggleAddingTask } = useAddingTask();

  const handleEditClick = (taskId) => {
    toggleAddingTask();
    setEditingTask(taskId, true);
  };

  const jalaliDate = selectedDate; 
  const gregorianDate = convertJalaliToGregorian(jalaliDate);
  const formattedDate = gregorianDate;
  Cookies.set("selectedDate", JSON.stringify(selectedDate));
  const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hourFormattedStart = `${formattedDate}T${i.toString().padStart(2, "0")}:00:00`;
    const hourFormattedEnd = `${formattedDate}T${(i + 1).toString().padStart(2, "0")}:00:00`;

    const tasksForHour = tasks.filter((task) => {
      if (task.status) {
        return false;
      }
      const taskTime = task.dueDate ? dayjs(task.dueDate) : dayjs(task.createdAt);
      return taskTime.isAfter(dayjs(hourFormattedStart)) && taskTime.isBefore(dayjs(hourFormattedEnd));
    });

    const toggleTaskStatus = (id, status) => {
      https.toggleTaskStatus(() => getTasks(), () => {}, id, { status });
    };

    const displayHour = new Date(0, 0, 0, i).toLocaleTimeString(localDetector, {
      hour: '2-digit',
      hour12: false
    }).split(":")[0];

    return (
      <li className="flex items-center gap-x-2 py-4 w-full border-b" key={i}>
        {displayHour}
        <ul className="flex flex-col gap-y-2 w-full ">
          {tasksForHour.length > 0 ? (
            tasksForHour.map((task) => {
              return (
                <li
                  className={`w-full justify-between rounded-l-none bg-[${task.color}] bg-opacity-30 ${task.status && "line-through"} py-2 px-2 rounded-md flex`}
                  key={task._id}
                >
                  <button onClick={() => handleEditClick(task._id)} className="flex-1 flex w-full justify-start">
                    <span>{task?.name || task.description}</span>
                  </button>
                  <span onClick={() => toggleTaskStatus(task._id, !task.status)}>
                    {task.status ? (
                      <CgRadioChecked size={20} style={{ color: `${task.color}` }} />
                    ) : (
                      <CgRadioCheck size={20} style={{ color: `${task.color}` }} />
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
