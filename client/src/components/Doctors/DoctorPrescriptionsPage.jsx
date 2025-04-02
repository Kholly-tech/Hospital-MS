import { useState } from "react";
import { Button } from "../ui/button";
import { DoctorPrescriptionsList } from "./DoctorPrescriptionsList";
import { DoctorPrescriptionForm } from "./DoctorPrescriptionForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MainLayout } from "../../layout/MainLayout";

export const DoctorPrescriptionsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    alert("Prescription saved successfully!");
    setIsDialogOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div className="space-y-4 flex-col mx-4 lg:min-w-4xl">
        <div className="flex justify-between items-center mt-4 mx-8">
          <h2 className="text-2xl font-bold">Prescriptions Management</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Prescription</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
              </DialogHeader>
              <DoctorPrescriptionForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>
        <DoctorPrescriptionsList key={refreshKey} />
      </div>
    </MainLayout>
  );
};
