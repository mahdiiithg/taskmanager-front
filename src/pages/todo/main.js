import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { https } from "./api/http";
import Cookies from "js-cookie";

function MainTodo() {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [newTask, setNewTask] = useState({
    description: "",
  });
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    const response = (res) => {
      console.log("res.data", res);
      setTasks(res.data);
    };

    const error = () => {};

    https.getTasks(response, error, data);
  };

  const deleteTasks = (id) => {
    const response = () => {
      getTasks();
    };

    const error = () => {};

    https.deleteTasks(response, error, id);
  };

  const onTypeTask = (event) => {
    const { value } = event.target;
    setNewTask({ description: value });
  };

  const onAddTask = () => {
    const response = () => {
      getTasks();
    };

    const error = () => {};

    https.addTasks(response, error, { description: newTask.description });
  };

  const toggleTaskStatus = (id, status) => {
    const response = () => {
      getTasks();
    };

    const error = () => {};

    https.toggleTaskStatus(response, error, id, { status });
  };

  const login = (event) => {
    event.preventDefault();

    const response = (res) => {
      Cookies.set("userToken", res.data.token);
    };

    const error = () => {};

    https.login(response, error, data);
  };

  return (
    <div className="App p-5">
      <form className="flex flex-col gap-4 shadow-md h-fit mb-5 border rounded-md p-2" onSubmit={login}>
        <input
          onChange={(event) =>
            setData((prev) => ({ ...prev, email: event.target.value }))
          }
          name="email"
          type="email"
        />
        <input
          onChange={(event) =>
            setData((prev) => ({ ...prev, password: event.target.value }))
          }
          name="passowrd"
          type="password"
        />
        <button type="submit">submit</button>
      </form>
      <div className=" bg-black/10 p-2 flex flex-col gap-y-2">
        <input value={newTask?.description} type="text" onChange={onTypeTask} />
        <button onClick={onAddTask}>add task</button>
      </div>
      <ol
        className=" text-black flex flex-col gap-y-2"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        {tasks?.map((data) => (
          <li
            className={`
            shadow-md rounded-sm hover:scale-105 hover:shadow-sm duration-75 flex gap-x-5 px-5 py-2
            ${data.status && "scale-95 hover:scale-95"}
            `}
          >
              <label
                className={`w-6 h-6 rounded-full ${
                  data.status ? "" : " bg-transparent border-2 border-red-600"
                }`}
                htmlFor={`${data._id}`}
              >
                {" "}
                {data.status ? (
                  <AiOutlineCheckCircle className="w-7 h-7 text-green-600" />
                ) : (
                  ""
                )}
              </label>
              <input
                className=" hidden"
                id={`${data._id}`}
                type="checkbox"
                onChange={(event) =>
                  toggleTaskStatus(data._id, event.target.checked)
                }
                checked={data.status}
              />
            <span
              className={`${data.status && "line-through"}`}
              style={{ flex: 1 }}
            >
              {data.description || "hast"}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            ></div>
            <button
              style={{ flex: 1, maxWidth: "60px" }}
              onClick={() => deleteTasks(data._id)}
              type="button"
            >
              remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MainTodo;
