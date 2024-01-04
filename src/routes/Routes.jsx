import { useRoutes } from 'react-router-dom';
import Main from '../pages/Index';
import Today from '../pages/Today';
import MainLayout from '../layout/MainLayout';



export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Main /> },
        { path: '/today', element: <Today /> },
        
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
