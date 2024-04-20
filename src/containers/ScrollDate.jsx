import dayjs from "dayjs";
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
    if (weekDate.getMonth() === date.getMonth()) {
      dates.push({
        day: weekDate.toLocaleDateString("fa-IR", { weekday: "short" }).toUpperCase(),
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
  const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";
console.log("selectedDate", selectedDate);
  useEffect(() => {
    // Check if selectedDate is set, otherwise default to current date
    const dateToUse = selectedDate ? selectedDate.toDate() : new Date();
    setWeekDates(getWeekDates(dateToUse), localDetector);
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
    Cookies.set('selectedDate', selectedDate)
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 py-4 w-full justify-between">
      {weekDates?.map((dateObj, index) => {
        // Check if the dateObj corresponds to the selectedDate
        const isSelectedDate = selectedDate?.isSame(
          new Date(selectedDate?.year(), selectedDate?.month(), dateObj?.date),
          "day"
        );
        console.log("selectedDate.date", selectedDate.day());
        console.log("dateObj?.date", dateObj);

        return (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleDateClick(dateObj)}
          >
            <div className={`text-sm font-medium ${
                isSelectedDate ? "text-blue-600" : "text-gray-900"
              }`}>
              {dateObj.day}
            </div>
            <div
              className={`text-lg font-semibold ${
                isSelectedDate ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {/* {dateObj.date} */}
              {Number(dateObj.date)?.toLocaleString(localDetector)}
            </div>
            {isSelectedDate && <Dot />}
            <Dot isToday={dateObj?.isToday} />
          </div>
        );
      })}
    </div>
  );
};

export default DateScroll


// const getWeekDates = (date = new Date()) => {
//   const firstDayOfWeek = date.getDate() - date.getDay() + 6; // Start 6 days before center
//   const dates = [];
//   const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";

//   for (let i = 0; i < 7; i++) {
//     let weekDate = new Date(
//       date.getFullYear(),
//       date.getMonth(),
//       firstDayOfWeek + i
//     );

//     // Ensure dates are within current month limits
//     if (weekDate.getMonth() !== date.getMonth()) {
//       weekDate = new Date(
//         date.getFullYear(),
//         weekDate.getMonth() === 0 ? 11 : weekDate.getMonth() - 1, // Adjust for month boundaries
//         Math.min(weekDate.getDate(), new Date(date.getFullYear(), weekDate.getMonth(), 0).getDate()) // Clamp to last day
//       );
//     }

//     dates.push({
//       day: weekDate.toLocaleDateString(localDetector, { weekday: "short" }).toUpperCase(),
//       date: weekDate.getDate(),
//       month: weekDate.getMonth(),
//       year: weekDate.getFullYear(),
//       isEmpty: weekDate.getMonth() !== date.getMonth(), // Mark non-current month dates as empty
//       isToday: weekDate.toDateString() === new Date().toDateString(),
//     });
//   }

//   return dates;
// };


// const DateScroll = ({ onSelect, selectedDate }) => {
//   const [monthDates, setMonthDates] = useState([]);
//   const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";

//   useEffect(() => {
//     // Check if selectedDate is set, otherwise default to current date
//     const dateToUse = selectedDate ? selectedDate.toDate() : new Date();
//     setMonthDates(getWeekDates());
//   }, [selectedDate]);

//   const Dot = ({ isToday }) => {
//     return isToday && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1" />;
//   };

//   const handleDateClick = (dateObj) => {
//     // Use the current year and month from the system's date
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth();
//     // Convert the dateObj to a dayjs object
//     const selectedDate = dayjs(new Date(year, month, dateObj.date));
//     // Call the passed onSelect function with the dayjs object
//     onSelect(selectedDate);
//     Cookies.set("selectedDate", selectedDate);
//   };

//   return (
//     <div className="flex overflow-x-auto whitespace-nowrap px-2  py-4 w-full justify-between">
//       {monthDates?.map((dateObj, index) => {
//         // Check if the dateObj corresponds to the selectedDate
//         const isSelectedDate = selectedDate?.isSame(
//           new Date(selectedDate?.year(), selectedDate?.month(), dateObj?.date),
//           "day"
//         );

//         return (
//           <div
//             key={index}
//             className="flex flex-col items-center cursor-pointer px-2"
//             onClick={() => handleDateClick(dateObj)}
//           >
//             <div
//               className={`text-md font-medium ${
//                 isSelectedDate ? "text-blue-600" : "text-gray-800"
//               }`}
//             >
//               {dateObj.day}
//             </div>
//             <div
//               className={`text-lg font-semibold ${
//                 isSelectedDate ? "text-blue-600" : "text-gray-900"
//               }`}
//             >
//               {Number(dateObj.date)?.toLocaleString(localDetector)}
//             </div>
//             {isSelectedDate && <Dot />}
//             <Dot isToday={dateObj.isToday} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default DateScroll;
