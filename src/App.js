import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
// import socketIOClient from "socket.io-client";
import io from "socket.io-client";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { https } from "./api/http";
import Cookies from "js-cookie";

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState("0");

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editTasks, setEditTasks] = useState({
    id: null,
    description: "",
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [newTask, setNewTask] = useState({
    description: "",
  });
  useEffect(() => {
    getTasks();
    getUser();
    getCategories();

    const socket = io("http://localhost:3002"); // Replace with your server's URL

    socket.on("notification", (data) => {
      console.log("data", data);
      setNotification(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getTasks = () => {
    const response = (res) => {
      console.log("res.data", res);
      setTasks(res.data);
    };

    const error = () => {};

    https.getTasks(response, error, data);
  };
  const getCategories = () => {
    const response = (res) => {
      setCategories(res.data);
    };

    const error = () => {};

    https.getCategories(response, error, data);
  };

  const deleteTasks = (id) => {
    const response = () => {
      getTasks();
    };

    const error = () => {};

    https.deleteTasks(response, error, id);
  };

  const onTypeTask = (event) => {
    const { name, value } = event.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const onAddTask = () => {
    const response = () => {
      if (selectedCategory) return getCategories();
      getTasks();
    };

    const error = () => {};

    https.addTasks(response, error, {
      description: newTask.description,
      reminder: newTask.reminder,
      ...newTask,
    });
  };

  const toggleTaskStatus = (id, status) => {
    const response = () => {
      if (selectedCategory) {
        return getTaskByCategory(selectedCategory);
      }
      console.log("selectedCategory", selectedCategory);
      getTasks();
    };

    const error = () => {};

    https.toggleTaskStatus(response, error, id, { status });
  };

  const updateTask = (id) => {
    const response = () => {
      getTasks();
    };

    const error = () => {};

    https.updateTask(response, error, id, {
      description: editTasks.description,
    });
  };

  const getUser = () => {
    const response = (res) => {
      setUser(res.data);
    };

    const error = () => {};

    https.getUser(response, error);
  };

  const login = (event) => {
    event.preventDefault();

    const response = (res) => {
      Cookies.set("userToken", res.data.token);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    const error = (error) => {
      alert(error);
    };

    https.login(response, error, data);
  };

  const register = (event) => {
    event.preventDefault();

    const response = (res) => {
      setTimeout(() => {
        window.location.reload();
        setIsLogin(true);
      }, 500);
    };

    const error = (error) => {
      alert(error);
    };

    https.register(response, error, data);
  };

  const logout = (event) => {
    event.preventDefault();

    const response = (res) => {
      Cookies.remove("userToken");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    const error = () => {};

    https.logout(response, error);
  };

  const onchangeTak = (event) => {
    const { id, value } = event.target;
    console.log("id", id);
    setEditTasks({
      id,
      description: value,
    });
  };

  const addCategory = () => {
    const response = () => {
      getCategories();
      setIsAddingCategory(false);
    };

    const error = () => {
      setIsAddingCategory(false);
    };

    https.addCategory(response, error, category);
  };

  const deletCategory = (id) => {
    if (!id) return "";
    const response = () => {
      getCategories();
      setIsAddingCategory(false);
    };

    const error = () => {
      setIsAddingCategory(false);
    };

    https.deletCategory(response, error, id);
  };

  const getTaskByCategory = (id) => {
    const response = (res) => {
      setTasks(res.data);
      setSelectedCategory(id);
    };

    const error = () => {
      setIsAddingCategory(false);
    };

    https.getTaskByCategory(response, error, id);
  };

  return (
    <div className="App px-5 py-5 relative">
      <div className="flex justify-between items-center pb-10">
        <p
          className="
          py-2 px-8
          right-5
          top-5
          rounded-full
          shadow-sm
          border
          border-black/10
          flex
          flex-col
          justify-center
          items-center"
        >
          {notification || 0}
        </p>
        <p
          className="
          py-2 px-4
          right-5
          top-5
          rounded-full
          shadow-sm
          border
          border-black/10
          flex
          flex-col
          justify-center
          items-center"
        >
          wellcome {user.name || ""}
        </p>
      </div>
      {!Cookies.get("userToken") || Cookies.get("userToken").length < 10 ? (
        <form
          className="flex flex-col gap-4 shadow-md h-fit mb-5 bg-black/10 border rounded-md p-2"
          onSubmit={isLogin ? login : register}
        >
          {!isLogin && (
            <>
              <input
                onChange={(event) =>
                  setData((prev) => ({ ...prev, name: event.target.value }))
                }
                name="name"
                type="text"
                placeholder="name"
              />
              <input
                onChange={(event) =>
                  setData((prev) => ({ ...prev, age: event.target.value }))
                }
                name="age"
                type="number"
                placeholder="age"
              />
            </>
          )}
          <input
            onChange={(event) =>
              setData((prev) => ({ ...prev, email: event.target.value }))
            }
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={(event) =>
              setData((prev) => ({ ...prev, password: event.target.value }))
            }
            name="passowrd"
            type="password"
            placeholder="password"
          />
          {isLogin ? (
            <button
              className=" bg-green-600 active:scale-95 active:bg-green-500 px-2 py-1 rounded-sm font-semibold text-white"
              type="submit"
            >
              login
            </button>
          ) : (
            <button
              className=" bg-green-600 active:scale-95 active:bg-green-500 px-2 py-1 rounded-sm font-semibold text-white"
              type="submit"
            >
              register
            </button>
          )}
          {
            <div className="flex items-start gap-x-1 justify-center">
              <div>don't have account?</div>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className=" underline text-blue-600 font-semibold"
              >
                {isLogin ? " register" : " login"}
              </button>
            </div>
          }
        </form>
      ) : (
        <>
          <button
            onClick={logout}
            className=" bg-red-600 text-white rounded-sm px-2 py-1 font-semibold mb-2"
          >
            log out
          </button>
          <div className=" bg-black/10 border-black text-left rounded-md p-2 flex flex-col gap-y-2">
            <label for="description">write a task:</label>
            <input
              className="rounded-sm"
              value={newTask?.description}
              type="text"
              name="description"
              onChange={onTypeTask}
            />
            <label for="category">Choose a category:</label>
            <div className="w-full flex flex-col gap-x-2 gap-y-2 sm:flex-row ">
              {!isAddingCategory ? (
                <>
                  <select
                    className="flex-1 px-2 py-1 rounded-md"
                    name="category"
                    value={newTask.category}
                    onChange={(event) =>
                      setNewTask((prev) => ({
                        ...prev,
                        category:
                          event.target.value === "un select"
                            ? null
                            : event.target.value,
                      }))
                    }
                  >
                    <option value={null}>un select</option>
                    {categories.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data.name}
                        {data?.description &&
                          `- ${data?.description?.slice(0, 10)}`}
                      </option>
                    ))}
                  </select>
                  {newTask.category !== null && (
                    <button
                      className=" bg-yellow-600 px-2 py-1 rounded-sm text-white"
                      onClick={() =>
                        setNewTask((prev) => ({
                          ...prev,
                          category: null,
                        }))
                      }
                    >
                      un-select
                    </button>
                  )}
                  {newTask.category !== null && (
                    <button
                      className=" bg-red-600 px-2 py-1 rounded-sm text-white"
                      onClick={() => deletCategory(newTask.category)}
                    >
                      delete
                    </button>
                  )}
                  <button
                    onClick={() => setIsAddingCategory(true)}
                    className=" px-2 py-2 rounded-md bg-green-600 text-white"
                  >
                    add category +
                  </button>
                </>
              ) : (
                <>
                  <input
                    className="rounded-sm flex-1"
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(event) =>
                      setCategory((prevState) => ({
                        ...prevState,
                        name: event.target.value,
                      }))
                    }
                  />
                  <input
                    className="rounded-sm flex-1"
                    type="text"
                    name="description"
                    placeholder="description"
                    onChange={(event) =>
                      setCategory((prevState) => ({
                        ...prevState,
                        description: event.target.value,
                      }))
                    }
                  />
                  <div className="flex items-center">
                  <button
                    onClick={addCategory}
                    className=" px-2 py-2 rounded-md bg-green-600 text-white"
                  >
                    add
                  </button>
                  <button
                    onClick={() => setIsAddingCategory(false)}
                    className=" px-2 py-2 rounded-md bg-red-600 text-white"
                  >
                    cancel
                  </button>
                  </div>
                </>
              )}
            </div>
            <button
              className="
                px-2
                py-1
                w-full
                bg-green-600
                active:scale-95
                transition-all
                delay-75
                font-semibold
                text-lg
                text-white"
              onClick={onAddTask}
            >
              add task
            </button>
          </div>
          <div className="py-5">
            <ul className="flex justify-start items-start gap-x-4">
              <li
                className={`${
                  selectedCategory === null
                    ? "bg-sky-700 hover:bg-sky/20 text-white"
                    : "bg-black/10 hover:bg-black/20"
                } rounded-sm cursor-pointer`}
              >
                <button
                  className="px-2 py-1"
                  onClick={() => [getTasks(), setSelectedCategory(null)]}
                >
                  all
                </button>
              </li>
              {categories.map((data) => (
                <li
                  className={`${
                    selectedCategory === data._id
                      ? "bg-sky-700 hover:bg-sky/20 text-white"
                      : "bg-black/10 hover:bg-black/20"
                  } rounded-sm cursor-pointer`}
                >
                  <button
                    className="px-2 py-1 "
                    onClick={() => getTaskByCategory(data._id)}
                  >
                    {data.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ol
            className=" text-black flex flex-col gap-y-2"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            {tasks?.map((data) => (
              <li
                className={`
            shadow-sm border border-gray-200 px-2 py-2 rounded-md duration-75 flex gap-x-5
            `}
              >
                <label
                  className={`w-6 h-6 rounded-full ${
                    data.status ? "" : " bg-transparent border-2 border-red-600"
                  }`}
                  htmlFor={`${data._id}`}
                >
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
                <div
                  className={`${data.status && "line-through"} w-full flex-1`}
                >
                  {/* {data.description || "hast"} */}
                  <input
                    id={data._id}
                    type="text"
                    className="flex-1 w-full"
                    value={
                      editTasks.id === data._id
                        ? editTasks.description
                        : data.description
                    }
                    name="description"
                    onChange={onchangeTak}
                    onBlur={() => updateTask(data._id)}
                  />
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                  }}
                ></div> */}
                <button
                  style={{ flex: 1, maxWidth: "60px" }}
                  onClick={() => deleteTasks(data._id)}
                  type="button"
                >
                  remove
                </button>
                {/* <button
              style={{ flex: 1, maxWidth: "60px" }}
              onClick={() => updateTask(data._id)}
              type="button"
            >
              update
            </button> */}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default App;
