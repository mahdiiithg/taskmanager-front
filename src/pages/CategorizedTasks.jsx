import { useEffect, useState } from "react";
import { https } from "../api/http";
import _, { groupBy } from "lodash"; // Ensure groupBy is imported
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTask from "../containers/HeaderTask";
import { useTranslation } from "react-i18next";
import { CgTrash } from "react-icons/cg";
import Cookies from "js-cookie";
import { Empty, Popconfirm } from "antd";
import jalaliday from 'jalaliday';
import dayjs from "dayjs";
import { useAddingTask } from "../state/StateManger";

dayjs.extend(jalaliday);


const CategorizedTasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toggleAddingTask = useAddingTask((state) => state.toggleAddingTask);
  const {setEditingTask} = useAddingTask();

  const localDetector = Cookies.get("language") === "en" ? "en-US" : "fa-IR";
  const [tasksList, setTasks] = useState([]);
  const { tasks } = useAddingTask();
  const [pageId, setPageId] = useState(null);
  const [hasAuthenticated, setHasAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (id && id !== "all") getTaskByCategory();
    if (id === "all") getTasks();
    setPageId(id)
    getCategories();
    Cookies.set("selectedCat", id);
  }, [id, tasks]);

  useEffect(() => {
    const newID = categories[0]?._id;
    if ((id.length < 2 || id === "undefined") && newID) {
      navigate(`/categorized/${newID}`);
      Cookies.set("selectedCat", newID);
    }
  }, [id, categories, navigate]);

  const getCategories = () => {
    const response = (res) => {
      setCategories(res.data);
    };

    const error = (error) => {
      setHasAuthenticated(error.response.status === 401);
    };

    https.getCategories(response, error);
  };

  const getTaskByCategory = () => {
    const response = (res) => {
      const groupedTasks = groupBy(
        res.data,
        (task) => task.createdAt.split("T")[0]
      ); // Assuming createdAt is in ISO format
      setTasks(groupedTasks);
      // setTasks(res.data);
    };

    const error = () => {};

    https.getTaskByCategory(response, error, id);
  };
  const getTasks = () => {
    const response = (res) => {
      const groupedTasks = groupBy(
        res.data,
        (task) => task.createdAt.split("T")[0]
      ); // Assuming createdAt is in ISO format
      setTasks(groupedTasks);
      // setTasks(res.data);
    };

    const error = () => {};

    https.getTasks(response, error);
  };

  const toggleTaskStatus = (id, status, pageId) => {
    const response = () => {
      if(pageId !== 'all') getTaskByCategory();
      if(pageId === 'all') getTasks()
    };

    const error = () => {};

    https.toggleTaskStatus(response, error, id, { status });
  };

  const deletCategory = (id) => {
    const response = () => {
      if (id) getTaskByCategory();
      getCategories();
    };

    const error = () => {};

    https.deletCategory(response, error, id);
  };

  const handleEditClick = (taskId) => {
    toggleAddingTask()
    setEditingTask(taskId, true)
  };

  return (
    <div className="relative">
      <div className="absolute w-full h-full top-0 right-0 bg-white z-20 p-4 py-8">
        <HeaderTask title={_.find(categories, { _id: id })?.name || ""} />
        <div className=" flex items-start gap-x-4 w-full overflow-x-scroll py-2 px-4 mb-2 mt-8">
          <button
            className={`h-full px-4 py-4 min-w-fit relative rounded-md shadow-md border border-black/10 z-0 ${
              id === "all" && "bg-blue-500 text-white"
            }`}
            onClick={() => [
              navigate(`/categorized/all`),
              Cookies.set("selectedCat", "all"),
            ]}
          >
            All
          </button>
          {categories?.map((category) => (
            <div
              className={`min-w-fit relative h-full rounded-md shadow-md border border-black/10 z-0 ${
                id === category._id && "bg-blue-500 text-white"
              }`}
            >
              <Popconfirm
                className=" absolute -top-2 -right-3 z-10 bg-red-500 h-6 w-6 rounded-md p-1"
                description={
                  <div className="font-semibold pb-5">
                    <h1>{t("Are you sure to delete this category?")}</h1>
                    <p>
                      {t(
                        "by deleting this category all tasks related to this category will be deleted"
                      )}
                    </p>
                  </div>
                }
                onConfirm={() => deletCategory(category._id)}
                okButtonProps={{
                  type: "primary",
                  danger: true,
                }}
                okText="Yes"
                cancelText="No"
              >
                <CgTrash className="text-white" size={18} />
              </Popconfirm>
              <button
                className="h-full px-2 py-4 "
                key={category._id}
                onClick={() => [
                  navigate(`/categorized/${category._id}`),
                  Cookies.set("selectedCat", category._id),
                ]}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        {hasAuthenticated && (
          <div className=" text-black text-center w-full flex flex-col items-center justify-center">
            <Empty
              imageStyle={{ height: 180 }}
              description={
                <div className=" font-semibold text-xl">
                  {t("please first login to see the list")}
                </div>
              }
            />
          </div>
        )}
        {Object.entries(tasksList).map(([date, tasksForDate]) => (
          <div key={date}>
            <h3 className="py-4 font-bold">{dayjs(date).format("MMMM-DD")}</h3> {/* Display the date */}
            <ul>
              {tasksForDate.map((task) => (
                <li
                  className={`
                w-full
                bg-[${task.color}]/10
                ${task.status && "line-through"}
                py-1
                px-2
                flex
                pb-4
                border-b
                mb-1
                `}
                  key={task._id}
                >
                  <div className="flex-1 flex items-start">
                    <button
                      type="button"
                      className="px-2"
                      onClick={() => toggleTaskStatus(task._id, !task.status, pageId)}
                    >
                      <div
                        className="
                        h-5
                        w-5
                        rounded-full
                        border-2
                        flex
                        flex-col
                        justify-center
                        items-center
                      "
                      >
                        {task.status && (
                          <div
                            // style={{ backgroundColor: task.color || "#000" }}
                            className="h-3 w-3 rounded-full border-1 bg-gray-500"
                          />
                        )}
                      </div>
                    </button>
                    <button onClick={() => handleEditClick(task._id)}>
                      <div>{task?.name}</div>
                      <div className=" text-xs">
                        {task.description || "task.description"}
                      </div>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategorizedTasks;
