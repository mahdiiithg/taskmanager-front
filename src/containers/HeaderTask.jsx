import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { CgCloseO } from "react-icons/cg";

const HeaderTask = ({ selectedDate, onClose, shouldClose }) => {
  return (
    <div className=" flex w-full justify-between items-center capitalize">
      <h2 className=" text-xl font-bold">
        {dayjs(selectedDate).format("dd MMMM")}
      </h2>

      <div className="flex items-center gap-x-2">
        <Link className=" bg-blue-500
              text-white
              p-2 rounded-full" to="/">
          <SlHome size={20} />
        </Link>
        <Link
          to="/add-task"
          className=" text-sm
              bg-blue-500
              text-white
              px-2
              py-1
              rounded-full
              hover:bg-blue-500/90
              active:scale-95
              transition-all
              duration-75
            "
        >
          Add Task <span className="text-lg">+</span>
        </Link>
        {shouldClose ? (
          <button
            className="rounded-full bg-red-600 text-white"
            onClick={onClose}
          >
            <CgCloseO size={30} />
          </button>
        ) : (
          <Link
            to="/scheduled"
            className="
              bg-blue-500
              text-white
              rounded-full
              p-2
              hover:bg-blue-500/90
              active:scale-95
              transition-all
              duration-75
              "
          >
            <CiCalendar size={22} />
          </Link>
        )}
      </div>
    </div>
  );
};
export default HeaderTask;
