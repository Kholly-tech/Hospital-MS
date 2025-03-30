// Appointments.jsx
import React from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { AdminAppointmentsPage } from "../Admin/AdminAppointmentsPage";

const Appointments = () => {
  return (
    <MainLayout>
      <AdminAppointmentsPage />
    </MainLayout>
  );
}

export default Appointments