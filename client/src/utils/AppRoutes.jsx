import useUser from "../services/hooks/useUser";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import ConfirmEmail from "../components/Auth/ConfirmEmail";
import { AdminPatientsPage } from "../components/Admin/AdminPatientsPage";
import AdminAppointments from "../components/Admin/AdminAppointments";
import AdminDashBoard from "../pages/Admin/DashBoard";
// import UserDashBoard from "../pages/User/DashBoard";
// import DoctorDashBoard from "../pages/Doctor/DashBoard";
import { AdminDoctorsPage } from "../components/Admin/AdminDoctorsPage";
import { AdminPrescriptionsPage } from "../components/Prescription/AdminPrescriptionsPage";

const UserRoutes = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, isAuthenticated, fetchAuthUser } = useUser();

  const fetchUser = async () => {
    try {
      setLoading(true);
      await fetchAuthUser();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUser();
    else setLoading(false);
  }, [isAuthenticated]);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Login />;
  if (currentUser) {
    if (currentUser.isEmaiConfirmed) return <ConfirmEmail />;
    return <Outlet />;
  }
  return <Login />;
};
const DoctorRoutes = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, isAuthenticated, fetchAuthUser } = useUser();

  const fetchUser = async () => {
    try {
      setLoading(true);
      await fetchAuthUser();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUser();
    else setLoading(false);
  }, [isAuthenticated]);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Login />;
  if (currentUser) {
    if (currentUser.isEmaiConfirmed) return <ConfirmEmail />;
    if (!currentUser?.roles.includes("Doctor")) return;
    return <Outlet />;
  }
  return <Login />;
};

const AdminRoutes = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, isAuthenticated, fetchAuthUser } = useUser();

  const fetchUser = async () => {
    try {
      setLoading(true);
      await fetchAuthUser();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUser();
    else setLoading(false);
  }, [isAuthenticated]);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Login />;
  if (currentUser) {
    if (currentUser.isEmaiConfirmed) return <ConfirmEmail />;
    if (!currentUser?.roles.includes("Admin")) return <Login />;
    return <Outlet />;
  }
  return <Login />;
};

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, fetchAuthUser } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  // if(!isAuthenticated) return <Login/>;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <UserRoutes />,
    children: [
      // { path: "/dashboard", element: <UserDashBoard /> },
      // { path: "/appointments", element: <Appointments /> },
      // { path: "/profile", element: <Appointments /> },
    ],
  },
  {
    element: <DoctorRoutes />,
    children: [
      // { path: "doctor/dashboard", element: <DoctorDashBoard /> },
      // { path: "doctor/appointments", element: <Appointments /> },
      // { path: "doctor/prescriptions", element: <Appointments /> },
      // { path: "doctor/profile", element: <Appointments /> },
      // { path: "patient/profile/:refId", element: <Appointments /> },
    ],
  },
  {
    element: <AdminRoutes />,
    children: [
      { path: "admin/dashboard", element: <AdminDashBoard /> },
      { path: "admin/appointments", element: <AdminAppointments /> },
      { path: "admin/doctors", element: <AdminDoctorsPage /> },
      { path: "admin/users", element: <AdminPatientsPage /> },
      { path: "admin/prescriptions", element: <AdminPrescriptionsPage /> },
      // { path: "admin/uers/:refId", element: <Appointments /> },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
