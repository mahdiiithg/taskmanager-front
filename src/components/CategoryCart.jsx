import React from "react";
import { Progress } from "antd";
import { Link } from "react-router-dom";

const gradientColors = [
  "bg-gradient-to-tr from-blue-800 via-blue-500 to-blue-400",
  "bg-gradient-to-tr from-green-800 via-green-500 to-green-400",
  "bg-gradient-to-tr from-purple-800 via-purple-500 to-purple-400",
  "bg-gradient-to-tr from-yellow-800 via-yellow-500 to-yellow-400",
  "bg-gradient-to-tr from-pink-800 via-pink-500 to-pink-400",
  "bg-gradient-to-tr from-teal-800 via-teal-500 to-teal-400",
  "bg-gradient-to-tr from-indigo-800 via-indigo-500 to-indigo-400",
  "bg-gradient-to-tr from-orange-800 via-orange-500 to-orange-400",
  "bg-gradient-to-tr from-cyan-800 via-cyan-500 to-cyan-400",
  "bg-gradient-to-tr from-gray-800 via-gray-500 to-gray-400",
  "bg-gradient-to-tr from-red-800 via-red-500 to-red-400",
  "bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-400",
  "bg-gradient-to-tr from-green-700 via-green-500 to-green-400",
  "bg-gradient-to-tr from-purple-700 via-purple-500 to-purple-400",
  "bg-gradient-to-tr from-yellow-700 via-yellow-500 to-yellow-400",
  "bg-gradient-to-tr from-pink-700 via-pink-500 to-pink-400",
  "bg-gradient-to-tr from-teal-700 via-teal-500 to-teal-400",
  "bg-gradient-to-tr from-indigo-700 via-indigo-500 to-indigo-400",
  "bg-gradient-to-tr from-orange-700 via-orange-500 to-orange-400",
  "bg-gradient-to-tr from-cyan-700 via-cyan-500 to-cyan-400",
  "bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-400",
  "bg-gradient-to-tr from-red-700 via-red-500 to-red-400",
  "bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400",
  "bg-gradient-to-tr from-green-600 via-green-500 to-green-400",
  "bg-gradient-to-tr from-purple-600 via-purple-500 to-purple-400",
  "bg-gradient-to-tr from-yellow-600 via-yellow-500 to-yellow-400",
  "bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400",
  "bg-gradient-to-tr from-teal-600 via-teal-500 to-teal-400",
  "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400",
  "bg-gradient-to-tr from-orange-600 via-orange-500 to-orange-400",
  "bg-gradient-to-tr from-cyan-600 via-cyan-500 to-cyan-400",
  "bg-gradient-to-tr from-gray-600 via-gray-500 to-gray-400",
  "bg-gradient-to-tr from-red-600 via-red-500 to-red-400",
  "bg-gradient-to-tr from-blue-500 via-blue-500 to-blue-400",
  "bg-gradient-to-tr from-green-500 via-green-500 to-green-400",
  "bg-gradient-to-tr from-purple-500 via-purple-500 to-purple-400",
  "bg-gradient-to-tr from-yellow-500 via-yellow-500 to-yellow-400",
  "bg-gradient-to-tr from-pink-500 via-pink-500 to-pink-400",
  "bg-gradient-to-tr from-teal-500 via-teal-500 to-teal-400",
  "bg-gradient-to-tr from-indigo-500 via-indigo-500 to-indigo-400",
  "bg-gradient-to-tr from-orange-500 via-orange-500 to-orange-400",
  "bg-gradient-to-tr from-cyan-500 via-cyan-500 to-cyan-400",
  "bg-gradient-to-tr from-gray-500 via-gray-500 to-gray-400",
];


const CategoryCart = ({ data, tasks, to, index }) => {
  const { name } = data;

  const countCompletedTasks = tasks.filter(
    (task) => task.status === true
  ).length;
  const totalTasks = tasks.length;
  const percentageCompleted =
    totalTasks > 0 ? (countCompletedTasks / totalTasks) * 100 : 0;

  return (
    <Link to={to}>
      <div
        className={`
          max-w-sm
          min-h-[240px]
          h-[240px]
          capitalize
          rounded-2xl
          backdrop-blur-lg
          text-white
          p-4
          ${gradientColors[index]}
          [ border-[1px] border-solid border-white border-opacity-30 ]
          [ shadow-black/10 shadow-xl ]
          `}
      >
        <div className="flex flex-col justify-between items-start h-full">
          <Progress
            strokeColor={"white"}
            type="circle"
            format={() =>
              `${totalTasks === 0 ? `100 %` : `${percentageCompleted.toFixed(0)}%`}`
            }
            percent={totalTasks === 0 ? 100 : percentageCompleted.toFixed(0)}
          />
          <div>
            <div className="font-semibold">{name}</div>
            <div className=" text-sm">contain {tasks.length} tasks</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CategoryCart;
