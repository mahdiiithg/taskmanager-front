import React, { useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import CategoryCart from "../components/CategoryCart";
import { https } from "../api/http";
import _ from "lodash";
import ModalContext from "../context/ModalContext";
import { useAddingTask } from "../state/StateManger";

const Categories = () => {
  const { setIsModalOpen, shouldGetCategory } = useContext(ModalContext);
  const [categories, setCategories] = useState([]);
  const { tasks, getTasks } = useAddingTask();
  const categorizedTasks = _.groupBy(tasks, "category");

  useEffect(() => {
    getCategories();
    getTasks();
  }, []);

  useEffect(() => {
    getCategories();
  }, [shouldGetCategory]);

  const getCategories = () => {
    const response = (res) => {
      setCategories(res.data);
    };

    const error = () => {};

    https.getCategories(response, error);
  };

  return (
    <div>
      <div className="pb-4 flex justify-between w-full items-center">
        <h2 className="text-2xl capitalize font-bold">categories</h2>
        <button
          onClick={() => setIsModalOpen(true)}
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
      <div className="grid grid-cols-2 gap-4">
        {categories?.map((data, index) => (
          <CategoryCart
            to={`categorized/${data._id}`}
            key={data._id}
            data={data}
            index={index}
            tasks={categorizedTasks[data._id] || []}
          />
        ))}
      </div>
    </div>
  );
};
export default Categories;
