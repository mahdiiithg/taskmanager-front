import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const QuickTasks = (props) => {
  const { title, to, icon } = props;
  const controls = useAnimation();

  const floatingAnimation = {
    initial: { y: 0 },
    animate: { y: -10 },
    transition: {
      duration: 2,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
    className="my-1"
    animate={controls}
    variants={floatingAnimation}
    onMouseEnter={() => controls.start("animate")}
    onMouseLeave={() => controls.start("initial")}
    >
      <Link to={to}>
        <div className="flex gap-x-3 items-center">
          {icon}
          <div className="flex flex-col gap-y-0">
            <span>{title}</span>
            <div className="flex items-start gap-x-2 text-sm text-black/80">
              <div>12 Completed</div>
              <div>4 Not yet</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default QuickTasks;
