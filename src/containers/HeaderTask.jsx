import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAddingTask } from "../state/StateManger";
import Cookies from "js-cookie";

const HeaderTask = ({ selectedDate, title, onClose, shouldClose }) => {
  const toggleIsAddingTask = useAddingTask((state) => state.toggleAddingTask);
  const { t, i18n } = useTranslation();

  const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";
  const formattedDate = selectedDate ? dayjs(selectedDate).locale(localDetector).format("MMMM - dddd") : title;
  console.log("selectedDate", selectedDate);

  return (
    <div className="flex flex-wrap gap-y-2 w-full justify-between items-center capitalize pb-4">
      <h2 className="text-xl font-bold">
        {formattedDate}
      </h2>
      <div className="flex items-center gap-x-4 self-end">
        <Link className="rounded-full" to="/">
          <img
            className="h-10 hover:scale-90 transition-all duration-75"
            src="/images/home.webp"
            alt={t("home")}
          />
        </Link>

        {shouldClose ? (
          <button
            className="rounded-full bg-red-600 text-white"
            onClick={onClose}
          >
            <img
              src="/images/closered.webp"
              className="h-10 hover:scale-90 transition-all duration-75"
              alt={t("close")}
            />
          </button>
        ) : (
          <Link
            to="/scheduled"
            className="
              rounded-full
              active:scale-90
              transition-all
              duration-75
            "
          >
            <img
              className="h-10 hover:scale-90 transition-all duration-75"
              src="/images/blueCalendar.png"
              alt={t("calendar")}
            />
          </Link>
        )}
        <button
          type="button"
          onClick={toggleIsAddingTask}
          className="text-sm flex items-center gap-x-2
              bg-blue-500
              text-white
              px-2
              py-1
              rounded-full
              hover:bg-blue-500/90
              active:scale-90
              transition-all
              duration-75 font-semibold
            "
        >
          <span>{t("add a task")}</span>
          <img
            className="h-8 hover:scale-90 transition-all duration-75"
            src="/images/plus.webp"
            alt={t("add")}
          />
        </button>
      </div>
    </div>
  );
};

export default HeaderTask;
