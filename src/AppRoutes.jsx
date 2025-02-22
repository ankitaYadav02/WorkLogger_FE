
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login'
import DashboardPage from "./pages/Dashboard";
import { useEffect } from "react";
import ForgetPassword from "./pages/ForgetPassword";
import AdminDashboard from './pages/AdminDashboard';
import ChangePassword from './components/Auth/ChangePassword/PasswordChange';
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "/forget-password", element: <ForgetPassword /> },
        { path: "/change-password", element: <ChangePassword /> },
        {
          element: <ProtectedRoute isAdmin={false} />,
          children: [{ path: "/dashboard", element: <DashboardPage /> }],
        },
        {
          element: <ProtectedRoute isAdmin={true} />,
          children: [{ path: "/admin-dashboard", element: <AdminDashboard /> }],
        },
      ],
    },
  ]);
  
  function ProtedRoute() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return <RouterProvider router={router} />;
  }
  
  export default ProtedRoute;