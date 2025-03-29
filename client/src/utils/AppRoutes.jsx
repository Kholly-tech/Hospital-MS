import useUser from "../services/hooks/useUser";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";

import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import { useEffect, useState } from "react";
import Appointments from "../components/DashBoard/Appointments";
import ConfirmEmail from "../components/Auth/ConfirmEmail";

const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const {currentUser, isAuthenticated, fetchAuthUser} = useUser();

  const fetchUser = async () => {
    try {
        setLoading(true);
        await fetchAuthUser();
    } catch (error) {

    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) fetchUser();
    else setLoading(false);
  }, [isAuthenticated]);

  if(loading) return <h1>Loading...</h1>;
  if(!isAuthenticated) return <Login/>;
  if (currentUser) {
    if(currentUser.isEmaiConfirmed) return <ConfirmEmail />
    return <Outlet />
  }
  return <Login />;
};
const PublicRoutes = () => {
  const navigate = useNavigate();
  const {currentUser, isAuthenticated, fetchAuthUser} = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  // if(!isAuthenticated) return <Login/>;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {path: "/dashboard", element: <DashBoard />},
      {path: "/appointments", element: <Appointments />},
    ]
  }, 
  {
    element: <PublicRoutes />,
    children: [
      {path: "/", element: <Navigate to='/login' />},
      {path: "/login", element: <Login />},
      {path: "/register", element: <Register />},
      {path: "/forgot-password", element: <ForgetPassword />},
    ]
  }
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRoutes;