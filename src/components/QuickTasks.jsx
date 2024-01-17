import React from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const QuickTasks = (props) => {
  const { title, to, icon } = props;
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to}>
        <div className="flex gap-x-3 items-center">
          { icon }
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
