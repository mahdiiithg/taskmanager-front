import dayjs from "dayjs";
import jalaali from 'jalaali-js';
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const getWeekDates = (date = new Date(), localDetector) => {
  const firstDayOfWeek = date.getDate() - date.getDay();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    let weekDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      firstDayOfWeek + i
    );

    let dateObj = {
      day: weekDate.toLocaleDateString(localDetector, { weekday: "short" }).toUpperCase(),
      date: weekDate.getDate(),
      month: weekDate.getMonth() + 1, // Month is 0-based, so add 1 for display
      year: weekDate.getFullYear(),
      isToday: weekDate.toDateString() === new Date().toDateString(),
    };

    if (localDetector === "fa-IR") {
      const jalaaliDate = jalaali.toJalaali(weekDate);
      dateObj = {
        ...dateObj,
        date: jalaaliDate.jd,
        month: jalaaliDate.jm,
        year: jalaaliDate.jy,
      };
    }

    dates.push(dateObj);
  }

  return dates;
};

const DateScroll = ({ onSelect, selectedDate }) => {
  const [weekDates, setWeekDates] = useState([]);
  const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";

  useEffect(() => {
    const dateToUse = selectedDate ? selectedDate.toDate() : new Date();
    setWeekDates(getWeekDates(dateToUse, localDetector));
  }, [selectedDate, localDetector]);

  const Dot = ({ isToday, isSelected }) => {
    return (
      <div className="flex items-center mt-1">
        {isToday && <div className="w-2 h-2 rounded-full bg-blue-500 mr-1" />}
        {isSelected && !isToday && <div className="w-3 h-1 border-b-2 bg-blue-800" />}
      </div>
    );
  };

  const handleDateClick = (dateObj) => {
    console.log("dateObj", dateObj);
    let selectedDate;
    if (localDetector === "fa-IR") {
      const gregorianDate = jalaali.toGregorian(dateObj.year, dateObj.month, dateObj.date);
      console.log("gregorianDate", gregorianDate);
      const formattedDate = `${gregorianDate.gy}-${String(gregorianDate.gm).padStart(2, '0')}-${String(gregorianDate.gd).padStart(2, '0')}`;
      console.log("formattedDate", formattedDate);
      selectedDate = dayjs(formattedDate);
      console.log("selectedDate (fa-IR)", selectedDate);
    } else {
      selectedDate = dayjs(new Date(dateObj.year, dateObj.month - 1, dateObj.date)); // Month is 0-based in JavaScript Date
    }
    onSelect(selectedDate);
    Cookies.set('selectedDate', selectedDate);
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 py-4 w-full justify-between">
      {weekDates?.map((dateObj, index) => {
        let currentGregorianDate;
        if (localDetector === "fa-IR") {
          const gregorianDate = jalaali.toGregorian(dateObj.year, dateObj.month, dateObj.date);
          currentGregorianDate = dayjs(`${gregorianDate.gy}-${String(gregorianDate.gm).padStart(2, '0')}-${String(gregorianDate.gd).padStart(2, '0')}`);
        } else {
          currentGregorianDate = dayjs(new Date(dateObj.year, dateObj.month - 1, dateObj.date));
        }

        const isSelectedDate = selectedDate && selectedDate.isSame(currentGregorianDate, "day");

        return (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleDateClick(dateObj)}
          >
            <div
              className={`text-sm font-medium ${
                isSelectedDate && !dateObj?.isToday
                  ? "text-blue-800"
                  : dateObj?.isToday
                  ? "text-blue-600"
                  : "text-gray-900"
              }`}
            >
              {dateObj.day}
            </div>
            <div
              className={`text-lg font-semibold ${
                isSelectedDate && !dateObj?.isToday
                  ? "text-blue-800"
                  : dateObj?.isToday
                  ? "text-blue-600"
                  : "text-gray-900"
              }`}
            >
              {Number(dateObj.date)?.toLocaleString(localDetector)}
            </div>
            <Dot isToday={dateObj?.isToday} isSelected={isSelectedDate} />
          </div>
        );
      })}
    </div>
  );
};

export default DateScroll;
