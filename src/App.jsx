
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login'
import DashboardPage from "./pages/Dashboard";
import { useEffect } from "react";
import ForgetPassword from "./pages/ForgetPassword";
import AdminDashboard from './pages/AdminDashboard';
import ChangePassword from './components/Auth/ChangePassword/PasswordChange';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/admin-dashboard", element: <AdminDashboard /> },
      { path: "/change-password", element: <ChangePassword /> },
    ],
  },
]);


function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;

