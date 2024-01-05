import React, { useState , useEffect} from "react";
import CategoryCart from "../components/CategoryCart";
import { https } from "../api/http";
import _ from 'lodash';


const Categories = () => {
  // const [selectedTime, setSelectedTime] = useState(dayjs());
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const categorizedTasks = _.groupBy(tasks, 'category');

  useEffect(() => {
    getCategories();
    getTasks();
  }, []);

  const getCategories = () => {
    const response = (res) => {
      setCategories(res.data);
    };

    const error = () => {};

    https.getCategories(response, error);
  };

  const getTasks = () => {
    const response = (res) => {
      setTasks(res.data);
    };

    const error = () => {};

    https.getTasks(response, error);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((data) => (
        <CategoryCart key={data._id} data={data} tasks={categorizedTasks[data._id] || []}   />
      ))}
    </div>
  );
};
export default Categories;
