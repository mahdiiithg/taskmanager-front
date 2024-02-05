import { useEffect, useState } from "react";
import { https } from "../api/http";
import _ from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTask from "../containers/HeaderTask";
import { CgRadioCheck, CgRadioChecked, CgTrash } from "react-icons/cg";
import Cookies from "js-cookie";
import { Popconfirm } from "antd";

const CategorizedTasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id) getTaskByCategory();
    getCategories();
    Cookies.set("selectedCat", id);
  }, [id]);

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

    const error = () => {};

    https.getCategories(response, error);
  };

  const getTaskByCategory = () => {
    const response = (res) => {
      setTasks(res.data);
    };

    const error = () => {};

    https.getTaskByCategory(response, error, id);
  };

  const toggleTaskStatus = (id, status) => {
    const response = () => {
      getTaskByCategory();
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

  return (
    <div className="relative">
      <div className="absolute w-full h-full top-0 right-0 bg-white z-20 p-4 py-8">
        <HeaderTask title={_.find(categories, { _id: id })?.name || ""} />
        <div className=" flex items-start gap-x-4 w-full overflow-x-scroll py-2 mb-2 mt-8">
          {categories?.map((category) => (
            <div
              className={`min-w-fit relative h-full rounded-md shadow-md border border-black/10 z-0 ${
                id === category._id && "bg-blue-500 text-white"
              }`}
            >
              <Popconfirm
                className=" absolute -top-2 -right-3 z-10 bg-red-500 h-6 w-6 rounded-full p-1"
                description={
                  <div className="font-semibold pb-5">
                    <h1>Are you sure to delete this category?</h1>
                    <p>
                      by deleting this category all tasks related to this
                      category will be deleted
                    </p>
                  </div>
                }
                onConfirm={() => deletCategory(category._id)}
                okButtonProps={{
                  type: "primary",
                  danger: true,
                }}
                // onCancel={cancel}
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
        <ul className=" space-y-4 pt-10">
          {tasks?.map((task) => (
            <li
              style={{
                borderLeft: `8px solid ${task.color}`,
                // backgroundColor: `${baseColor}`
              }}
              className={`
              border-l-8 w-full justify-between 
              rounded-l-none
              bg-[${task.color}]/10
              ${task.status && "line-through"}
              py-1
              px-2
              rounded-md
              flex
              `}
              key={task._id}
            >
              <Link className="flex-1" to={`/add-task/${task._id}`}>
                <span>{task?.name || task.description}</span>
              </Link>
              <span onClick={() => toggleTaskStatus(task._id, !task.status)}>
                {task.status ? (
                  <CgRadioChecked size={20} className="text-blue-700" />
                ) : (
                  <CgRadioCheck size={20} className="text-blue-700" />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CategorizedTasks;
