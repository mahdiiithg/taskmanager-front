import { useEffect, useState } from "react";
import { https } from "../api/http";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import HeaderTask from "../containers/HeaderTask";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";

const CategorizedTasks = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id) getTaskByCategory();
    getCategories();
  }, [id]);

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
    };

    const error = () => {};

    https.toggleTaskStatus(response, error, id, { status });
  };

  return (
    <div className="relative">
      <div className="absolute w-full h-full top-0 right-0 bg-white z-20 p-4 py-8">
        <HeaderTask title={_.find(categories, {_id: id})?.name || ''} />
        <div className=" flex items-start gap-x-4 w-full overflow-x-scroll py-2 mt-8">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => window.location.replace(`/categorized/${category._id}`)}
              className={`min-w-fit px-2 py-4 rounded-md shadow-md border border-black/10 ${
                id === category._id && "bg-blue-500 text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <ul className=" space-y-4 pt-10">
          {tasks.map((task) => (
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
              <span
              onClick={() => toggleTaskStatus(task._id, !task.status)}
              >
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
