import { ColorPicker, DatePicker, Input, Select, TimePicker } from "antd";

import dayjs from "dayjs";
import { IoIosAdd } from "react-icons/io";
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash"; // Ensure groupBy is imported
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { https } from "../api/http";
import { GoTrash } from "react-icons/go";
import ModalContext from "../context/ModalContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAddingTask } from "../state/StateManger";

const { TextArea } = Input;

const AddTask = () => {
  const { t } = useTranslation();
  const { setIsModalOpen, shouldGetCategory } = useContext(ModalContext);
  const closeIsAddingTask = useAddingTask((state) => state.closeIsAddingTask);
  const { taskId, isEditingTask, getTasks, setEditingTask } = useAddingTask();
  const id = taskId;

  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState();
  const { setIsModalLoginOpen } = useContext(ModalContext);

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    dueDate: null,
    category:
      !id && Cookies.get("selectedCat") ? Cookies.get("selectedCat") : null,
    color: "",
  });

  useEffect(() => {
    getCategories();
    if (id) getTask();
    if (!selectedDate) {
      const now = dayjs(); // Use dayjs to get current time
      setSelectedDate(now);
    }
  }, [isEditingTask, id]);

  useEffect(() => {
    getCategories();
  }, [shouldGetCategory]);

  useEffect(() => {
    const parsedDate = Cookies.get("selectedDate")
      ? dayjs(JSON.parse(Cookies.get("selectedDate")))
      : dayjs();
    setSelectedDate(parsedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("selectedDate")]);

  const closeAddingDrawer = () => {
    setEditingTask(null, false);
    closeIsAddingTask();
    setTaskData({
      name: "",
      description: "",
      dueDate: null,
      category: null,
      color: "",
    });
  };

  const getCategories = () => {
    const response = (res) => {
      setCategories(res.data);
    };

    const error = () => {};

    https.getCategories(response, error);
  };

  // Handlers for input changes
  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTaskData({ ...taskData, dueDate: date });
  };

  const handleColortChange = (color) => {
    const { r, g, b } = color.metaColor;

    // Convert each color component to a hexadecimal string
    const toHex = (c) => {
      const hex = Math.round(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    // Combine the components into a full HEX color code
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    setTaskData({ ...taskData, color: hexColor });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleCategoryChange = (categoryId) => {
    Cookies.set("selectedCat", categoryId);
    setTaskData({
      ...taskData,
      category: categoryId,
      categorySelcted: {
        label: _.find(categories, { _id: categoryId })?.name,
        value: _.find(categories, { _id: categoryId })?.name,
      },
    });
  };

  const onAddTask = () => {
    if (!selectedTime) return toast.info(t("please select the time"));
    const combinedDueDate = taskData.dueDate
      ? dayjs(taskData.dueDate)
          ?.hour(selectedTime.hour())
          ?.minute(selectedTime.minute())
      : dayjs()?.hour(selectedTime?.hour()).minute(selectedTime.minute());

    const taskSubmissionData = {
      ...taskData,
      dueDate: combinedDueDate,
    };

    const response = () => {
      toast.success(t("action was successful"));
      getTasks();
      setTimeout(() => {
        closeAddingDrawer();
      }, 1000);
    };

    const error = (error) => {
      if (error?.response.status === 401) {
        setIsModalLoginOpen(true);
        toast.info(t(error?.response?.data.error));

        return;
      }
      toast.error(
        t(
          error?.response?.data.error ||
            "something went wrong make sure all fields are correctly fill"
        )
      );
    };

    if (isEditingTask)
      return https.updateTask(response, error, id, {
        // ...taskData
        name: taskData.name,
        description: taskData.description,
        dueDate: combinedDueDate,
        category: taskData.category,
        color: taskData.color,
      });
    https.addTasks(response, error, taskSubmissionData);
  };

  const getTask = () => {
    const response = (res) => {
      setTaskData(res.data);
      setSelectedDate(dayjs(res.data.dueDate || res.data.createdAt));
      setSelectedTime(dayjs(res.data.dueDate || res.data.createdAt));
    };

    const error = () => {};

    https.getTask(response, error, id);
  };

  const deletTask = () => {
    const response = (res) => {
      closeAddingDrawer();
    };

    const error = () => {};

    https.deleteTasks(response, error, id);
  };

  const onCancel = () => {
    closeAddingDrawer();
  };

  return (
    <div
      className="space-y-2 capitalize p-2 bg-white z-50"
    >
      <div className=" flex items-center justify-between w-full">
        {/* <h1 className=" text-3xl">{t("write and add")}</h1> */}
        <h1 className="p-0 m-0 text-lg">
          {selectedDate ? dayjs(selectedDate).format("DD MMMM - dddd") : ""}
        </h1>
        <button onClick={closeAddingDrawer}>
          <IoCloseSharp size={34} />
        </button>
      </div>
      <div
        style={{
          // background: 'url("images/white-clipboard.avif")',
          objectFit: "contain",
          backgroundSize: "contain",
        }}
        className=" text-black space-y-2 relative z-10"
      >
        {/* <label htmlFor="Task">{t("name")}</label> */}
        <Input
          className="border rounded border-black/5"
          id="Task"
          name="name"
          required
          placeholder={t("name")}
          value={taskData.name}
          onChange={handleInputChange}
        />
        <TextArea
          className="border rounded border-black/5"
          id="description"
          name="description"
          maxLength={150}
          required
          placeholder={t("description")}
          value={taskData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full flex gap-1 overflow-x-auto">
        {/* <label htmlFor="data">{t("select time")}</label> */}
        <DatePicker
          id="date"
          name="dueDate"
          className="flex-1 rounded min-w-[120px]"
          value={selectedDate}
          required
          placeholder={t("Date")}
          onChange={handleDateChange}
        />
        <TimePicker
          className="flex-1 rounded min-w-[120px]"
          onChange={handleTimeChange}
          required
          placeholder={t("select time")}
          value={selectedTime || ""}
        />
        <ColorPicker
          value={taskData.color}
          size="middle"
          style={{
            width: 225,
          }}
          className="flex-1 rounded min-w-[120px]"
          showText
          onChange={handleColortChange}
        />
        <Select
          className="min-w-[120px]"
          value={taskData.categorySelcted}
          placeholder={t("label")}
          dropdownRender={(menu) => (
            <React.Fragment>
              {/* {menu} */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  width: 110,
                }}
                className="
                mb-1
                text-sm
                flex
                items-center
                justify-end
                capitalize
                bg-blue-500
                text-white
                p-1
                rounded
                hover:bg-blue-500/90
                active:scale-95
                transition-all
                duration-75
              "
              >
                <span>{t("add label")}</span> <IoIosAdd size={23} />
              </button>
              {categories.map((data) => (
                <div
                  key={data._id}
                  style={{
                    width: 110,
                  }}
                  onClick={() =>
                    handleCategoryChange(data._id, { key: data._id })
                  }
                  className={`capitalize relative border text-black mb-1 ${
                    taskData?.category === data._id
                      ? "border-green-600"
                      : "border-gray-600"
                  } px-2 py-1 rounded flex items-center justify-end w-full gap-2`}
                >
                  <span>{taskData?.category === data._id && " ✅"}</span>
                  <span>{data.name}</span>
                </div>
              ))}
            </React.Fragment>
          )}
        />
      </div>
      <div className="flex gap-4 border-t pt-4">
        <button
          onClick={onAddTask}
          className="
              capitalize
              min-w-[90px]
              bg-green-500
              text-white
              px-2
              py-1
              rounded
              hover:bg-green-400
              active:scale-95
              transition-all
              duration-75
              w-fit
            "
        >
          {isEditingTask ? t("update") : t("Create task")}
        </button>
        <button
          onClick={onCancel}
          className="
              capitalize
              min-w-[90px]
              bg-yellow-500
              text-white
              px-2
              py-1
              rounded
              hover:bg-yellow-400
              active:scale-95
              transition-all
              duration-75
              w-fit
            "
        >
          {t("cancel")}
        </button>
        {isEditingTask && (
          <button
            onClick={deletTask}
            className=" capitalize flex items-center justify-center gap-x-1
            min-w-[90px]
            bg-red-500
            text-white
            px-2
            py-1
            rounded
            hover:bg-red-400
            active:scale-95
            transition-all
            duration-75
            w-fit
            "
          >
            <span>{t("delete")}</span> <GoTrash />
          </button>
        )}
      </div>
    </div>
  );
};
export default AddTask;
