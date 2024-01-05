import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const QuickTasks = (props) => {
  const { title, to, icon } = props;
  return (
    <>
      <Link to={to}>
        <div className="flex gap-x-2 items-center">
          { icon }
          <div className="flex flex-col gap-y-0">
            <span>{title}</span>
            <div className="flex items-start gap-x-2 text-sm text-white/80">
              <div>12 Completed</div>
              <div>4 Not yet</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default QuickTasks;
