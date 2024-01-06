import { ColorPicker, DatePicker, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import { IoIosAdd } from "react-icons/io";
import React, { useState , useEffect} from "react";
import { IoIosArrowBack } from "react-icons/io";
import { https } from "../api/http";
import { useNavigate, useParams } from "react-router-dom";
import { GoTrash } from "react-icons/go";


const AddTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const [selectedTime, setSelectedTime] = useState(dayjs());
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    dueDate: null,
    category: null,
    color: "",
  });

  useEffect(() => {
    getCategories();
    if (id) getTask();
  }, []);

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
    setSelectedDate(date)
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
    setTaskData({ ...taskData, category: categoryId });
  };

  const onAddTask = () => {
    const combinedDueDate = taskData.dueDate
      ? dayjs(taskData.dueDate)
          .hour(selectedTime.hour())
          .minute(selectedTime.minute())
      : dayjs().hour(selectedTime.hour()).minute(selectedTime.minute());

    const taskSubmissionData = {
      ...taskData,
      dueDate: combinedDueDate,
    };

    const response = () => {
      navigate(-1);
      // getTasks();
    };

    const error = () => {};

    if (id)
      return https.updateTask(response, error, id, {
        // ...taskData
        name: taskData.name,
        description: taskData.description,
        dueDate: taskData.dueDate,
        category: taskData.category,
        color: taskData.color,
      });
    https.addTasks(response, error, taskSubmissionData);
  };

  const getTask = () => {
    const response = (res) => {
      setTaskData(res.data);
      setSelectedDate(dayjs(res.data.dueDate))
    };

    const error = () => {};

    https.getTask(response, error, id);
  };

  const deletTask = () => {
    const response = (res) => {
      navigate(-1);
    };

    const error = () => {};

    https.deleteTasks(response, error, id);
  };

  return (
    <div className="space-y-10 capitalize pb-10">
      <div className=" bg-gradient-to-br from-cyan-900 via-cyan-900 to-cyan-700  text-white space-y-4 px-4 py-10">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack size={34} />
        </button>
        <h1 className=" text-3xl">Create New Task</h1>
        <div className="space-y-2">
          <label htmlFor="Task">Task</label>
          <Input
            id="Task"
            name="name"
            placeholder="name"
            value={taskData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="data">date</label>
          <div className="flex items-start gap-x-4">
            <DatePicker
              id="date"
              name="dueDate"
              className="flex-1"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <TimePicker
              className="flex-1"
              onChange={handleTimeChange}
              value={selectedTime || ''}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4 px-4  bg-white">
        <div className="space-y-2">
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            name="description"
            placeholder="description"
            value={taskData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="color">color</label>
          <ColorPicker
            value={taskData.color}
            size="large"
            showText
            onChange={handleColortChange}
          />
        </div>
      </div>
      <div className="px-4 space-y-10">
        <div className="space-y-2">
          <div className=" flex items-center justify-between w-full">
          <label>select a category</label>
          <button
          onClick={() => console.log('object')}
          className="
            text-lg
            flex
            items-center
            capitalize
            bg-blue-500
            text-white
            pr-1
            pl-2
            py-1
            rounded-3xl
            hover:bg-blue-500/90
            active:scale-95
            transition-all
            duration-75
          "
        >
          <span>add</span> <IoIosAdd size={23} />
        </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((data) => {
              return (
                <button
                  onClick={() => handleCategoryChange(data._id)}
                  className={`${
                    taskData?.category === data._id
                      ? "bg-red-600"
                      : "bg-green-500"
                  }  px-2 py-1 rounded-md text-white`}
                  key={data._id}
                >
                  {data.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onAddTask}
            className="
              capitalize
              font-semibold
              bg-blue-500
              text-white
              px-4
              py-2
              rounded-full
              hover:bg-blue-500/90
              active:scale-95
              transition-all
              duration-75
              w-full
            "
          >
            {id ? "update task" : "create task"}
          </button>
          {id && (
            <button
              onClick={deletTask}
              className=" flex justify-center items-center gap-x-2
              capitalize
              font-semibold
              bg-red-500
              text-white
              px-4
              py-2
              rounded-full
              hover:bg-red-500/90
              active:scale-95
              transition-all
              duration-75
              w-full
            "
            >
              <span>delete task</span> <GoTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddTask;
