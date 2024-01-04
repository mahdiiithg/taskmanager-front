// import React, { useState } from "react";
// import "./App.css";
// import { useEffect } from "react";
// // import socketIOClient from "socket.io-client";
// import io from "socket.io-client";

// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { https } from "./api/http";
// import Cookies from "js-cookie";
// import Profile from "./containers/Profile";
// import QuickTaskList from "./containers/QuickTaskList";
// import Categories from "./containers/Categories";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [isLogin, setIsLogin] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [notification, setNotification] = useState("0");

//   const [category, setCategory] = useState({
//     name: "",
//     description: "",
//   });
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [editTasks, setEditTasks] = useState({
//     id: null,
//     description: "",
//   });
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [newTask, setNewTask] = useState({
//     description: "",
//   });
//   useEffect(() => {
//     getTasks();
//     getUser();
//     getCategories();

//     const socket = io("http://116.203.241.176:3002"); // Replace with your server's URL

//     socket.on("create", (data) => {
//       console.log("data", data);
//       setNotification(data.message);
//       getTasks();
//     });
//     socket.on("update", (data) => {
//       console.log("data", data);
//       setNotification(data.message);
//       getTasks();
//     });
//     socket.on("notification", (data) => {
//       console.log("data", data);
//       setNotification(data.message);
//       getTasks();
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const getTasks = () => {
//     const response = (res) => {
//       console.log("res.data", res);
//       setTasks(res.data);
//     };

//     const error = () => {};

//     https.getTasks(response, error, data);
//   };
//   const getCategories = () => {
//     const response = (res) => {
//       setCategories(res.data);
//     };

//     const error = () => {};

//     https.getCategories(response, error, data);
//   };

//   const deleteTasks = (id) => {
//     const response = () => {
//       getTasks();
//     };

//     const error = () => {};

//     https.deleteTasks(response, error, id);
//   };

//   const onTypeTask = (event) => {
//     const { name, value } = event.target;
//     setNewTask((prev) => ({ ...prev, [name]: value }));
//   };

//   const onAddTask = () => {
//     const response = () => {
//       if (selectedCategory) return getCategories();
//       getTasks();
//     };

//     const error = () => {};

//     https.addTasks(response, error, {
//       description: newTask.description,
//       reminder: newTask.reminder,
//       ...newTask,
//     });
//   };

//   const toggleTaskStatus = (id, status) => {
//     const response = () => {
//       if (selectedCategory) {
//         return getTaskByCategory(selectedCategory);
//       }
//       console.log("selectedCategory", selectedCategory);
//       getTasks();
//     };

//     const error = () => {};

//     https.toggleTaskStatus(response, error, id, { status });
//   };

//   const updateTask = (id) => {
//     const response = () => {
//       getTasks();
//     };

//     const error = () => {};

//     https.updateTask(response, error, id, {
//       description: editTasks.description,
//     });
//   };

//   const getUser = () => {
//     const response = (res) => {
//       setUser(res.data);
//     };

//     const error = () => {};

//     https.getUser(response, error);
//   };

//   const login = (event) => {
//     event.preventDefault();

//     const response = (res) => {
//       Cookies.set("userToken", res.data.token);
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
//     };

//     const error = (error) => {
//       alert(error);
//     };

//     https.login(response, error, data);
//   };

//   const register = (event) => {
//     event.preventDefault();

//     const response = (res) => {
//       setTimeout(() => {
//         window.location.reload();
//         setIsLogin(true);
//       }, 500);
//     };

//     const error = (error) => {
//       alert(error);
//     };

//     https.register(response, error, data);
//   };

//   const logout = (event) => {
//     event.preventDefault();

//     const response = (res) => {
//       Cookies.remove("userToken");
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
//     };

//     const error = () => {};

//     https.logout(response, error);
//   };

//   const onchangeTak = (event) => {
//     const { id, value } = event.target;
//     console.log("id", id);
//     setEditTasks({
//       id,
//       description: value,
//     });
//   };

//   const addCategory = () => {
//     const response = () => {
//       getCategories();
//       setIsAddingCategory(false);
//     };

//     const error = () => {
//       setIsAddingCategory(false);
//     };

//     https.addCategory(response, error, category);
//   };

//   const deletCategory = (id) => {
//     if (!id) return "";
//     const response = () => {
//       getCategories();
//       setIsAddingCategory(false);
//     };

//     const error = () => {
//       setIsAddingCategory(false);
//     };

//     https.deletCategory(response, error, id);
//   };

//   const getTaskByCategory = (id) => {
//     const response = (res) => {
//       setTasks(res.data);
//       setSelectedCategory(id);
//     };

//     const error = () => {
//       setIsAddingCategory(false);
//     };

//     https.getTaskByCategory(response, error, id);
//   };

//   return (
    
//   );
// }

// export default App;

import Router from './routes/Routes';

// import 'react-toastify/dist/ReactToastify.css';
// import i18n from 'i18next';
// import { I18nextProvider, initReactI18next } from 'react-i18next';
// import faTranslation from './locales/fa/translation.json';


// i18n.use(initReactI18next).init({
//   resources: {
//     fa: {
//       translation: faTranslation,
//     },
//     en: {
//       translation: faTranslation,
//     },
//   },
//   lng: 'fa', // Set the default language to Farsi
//   fallbackLng: 'fa', // Fallback language if a translation is missing
//   interpolation: {
//     escapeValue: false, // React handles escaping
//   },
// });

function App() {

  return (
      <div>
        <Router />
      </div>
  );
}

export default App;
