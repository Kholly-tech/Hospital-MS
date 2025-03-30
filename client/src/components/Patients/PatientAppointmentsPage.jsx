import { useState } from "react";
import { Button } from "../ui/button";
import { PatientAppointmentsList } from "./PatientAppointmentsList";
import { PatientAppointmentForm } from "./PatientAppointmentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useUser from "../../services/hooks/useUser";
import { MainLayout } from "../../layout/MainLayout";


export const PatientAppointmentsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { currentUser } = useUser();

  const handleSuccess = () => {
    alert("Appointment Successful");
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
              <PatientAppointmentForm filter={filter} onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>
        <PatientAppointmentsList
          key={refreshKey}
          filter={filter}
          id={currentUser?.refId}
        />
      </div>
    </MainLayout>
  );
};
