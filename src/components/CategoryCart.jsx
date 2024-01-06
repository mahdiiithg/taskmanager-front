import React from "react";
import { Progress } from "antd";
import { Link } from "react-router-dom";
import { gradientColors } from "../utils/colors";




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
