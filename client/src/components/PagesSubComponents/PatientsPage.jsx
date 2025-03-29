import { useState } from 'react';
import { Button } from '../ui/button';
import { PatientsList } from '../Patients/PatientsList';
import { PatientForm } from '../Patients/PatientForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const PatientsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patients</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <PatientForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <PatientsList key={refreshKey} />
    </div>
  );
};