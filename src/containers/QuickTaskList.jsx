import React from "react";
import QuickTasksCard from "../components/QuickTasksCard";
import {motion} from 'framer-motion'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const QuickTaskList = () => {
  return (
    <motion.div variants={variants} className="grid grid-cols-2 gap-3 justify-center">
      <QuickTasksCard
        src="/images/blueCalendar.png"
        to="/scheduled"
        title="In scheduled"
      />
      <QuickTasksCard
      direction={'flex-row flex-row'}
      src="/images/3d-note-icon-png.png"
      isRow
      subtitle
        to="/today"
        title="today"
      />
      <QuickTasksCard
        direction={'flex-row flex-row-reverse'}
        isRow
        src="/images/write3d.webp"
        to="/add-task"
        title="add new task"
        subtitle="write and add"
      />
      <QuickTasksCard
        src="/images/folder-icon.png"
        direction={'flex-col-reverse'}
        to={`/categorized/1`}
        title="categorized"
        subtitle="base on categories"
      />
      {/* <QuickTasks
        icon={
          <div className="bg-blue-600/30 text-blue-600 rounded-full p-2">
            <BsCalendar2CheckFill size={19} />
          </div>
        }
        to="/scheduled"
        title="In Schedule"
      /> */}
      {/* <QuickTasks
        icon={
          <div className="bg-yellow-600/30 text-yellow-600 rounded-full p-1">
            <IoTimerSharp size={25} />
          </div>
        }
        to="/today"
        title="Today"
      /> */}
    </motion.div>
  );
};
export default QuickTaskList;
