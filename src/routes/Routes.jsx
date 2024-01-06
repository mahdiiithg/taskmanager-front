import { useRoutes } from 'react-router-dom';
import React from "react";

import Main from '../pages/Index';
import Today from '../pages/Today';
import MainLayout from '../layout/MainLayout';
import Scheduled from '../pages/Scheduled';
import AddTask from '../pages/AddTask';
import CategorizedTasks from '../pages/CategorizedTasks';



export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Main /> },
        { path: '/today', element: <Today /> },
        { path: '/scheduled', element: <Scheduled /> },
        { path: '/add-task/:id', element: <AddTask /> },
        { path: '/add-task', element: <AddTask /> },
        { path: '/categorized/:id', element: <CategorizedTasks /> },
        
      ],
    },
    {
      path: '/auth',
      // element: <AuthLayout />,
      // children: [{ path: 'signin', element: <SignIn /> }],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
