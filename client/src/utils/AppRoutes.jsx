import useUser from "../services/hooks/useUser";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

const PrivateRoutes = () => {};
const PublicRoutes = () => {
  const {currentUser,} = useUser();

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {}
    ]
  }, 
  {
    element: <PublicRoutes />,
    children: [
      {path: "/", element: <Navigate to='/login' />},
      {path: "/login", element: <Login />},
      {path: "/register", element: <Register />},
    ]
  }
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRoutes;