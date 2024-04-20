import React from "react";
import QuickTasksCard from "../components/QuickTasksCard";
import {motion} from 'framer-motion'
import { useTranslation } from "react-i18next";
import { useAddingTask } from "../state/StateManger";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const QuickTaskList = () => {
  const { t } = useTranslation();
  const toggleIsAddingTask = useAddingTask((state) => state.toggleAddingTask)

  return (
    <motion.div variants={variants} className="grid grid-cols-2 gap-3 justify-center">
      <QuickTasksCard
        src="/images/blueCalendar.png"
        to="/scheduled"
        title={(t("In scheduled"))}
      />
      <QuickTasksCard
      direction={'flex-row flex-row'}
      src="/images/3d-note-icon-png.png"
      isRow
      subtitle
        to="/today"
        title={(t("today"))}
      />
      <QuickTasksCard
        direction={'flex-row flex-row-reverse'}
        isRow
        src="/images/write3d.webp"
        // to="/add-task"
        onClick={toggleIsAddingTask}
        title={(t("add new task"))}
        subtitle={(t("write and add"))}
      />
      <QuickTasksCard
        src="/images/folder-icon.png"
        direction={'flex-col-reverse'}
        to={`/categorized/1`}
        title={(t("categorized"))}
        subtitle={(t("base on categories"))}
      />
    </motion.div>
  );
};
export default QuickTaskList;
