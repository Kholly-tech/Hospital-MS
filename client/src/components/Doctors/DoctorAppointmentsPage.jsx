import { useState } from "react";
import { Button } from "../ui/button";
import { DoctorAppointmentsList } from "./DoctorAppointmentsList";
import { DoctorAppointmentForm } from "./DoctorAppointmentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useUser from "../../services/hooks/useUser";
import { MainLayout } from "../../layout/MainLayout";

export const DoctorAppointmentsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { currentUser } = useUser();

  const handleSuccess = () => {
    alert("Appointment Scheduled Successful");
    setIsDialogOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  let filter;
  let role =
    (currentUser && currentUser.roles && currentUser.roles[0]) || "Patient";
  switch (role) {
    case "Doctor":
      filter = "doctor";
      break;
    case "Admin":
      filter = "Admin";
      break;

    default:
      filter = "patient";
      break;
  }

  return (
    <MainLayout>
      <div className="space-y-4 mt-8 max-w-full">
        <div className="flex justify-between items-center mx-6">
          <h2 className="text-2xl font-bold">Appointments</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Appointment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Appointment</DialogTitle>
              </DialogHeader>
              <DoctorAppointmentForm filter={filter} onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>
        <DoctorAppointmentsList
          key={refreshKey}
          filter={filter}
          id={currentUser?.refId}
        />
      </div>
    </MainLayout>
  );
};
