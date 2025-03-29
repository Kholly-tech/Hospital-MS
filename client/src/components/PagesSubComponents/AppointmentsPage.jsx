import { useState } from 'react';
import { Button } from '../ui/button';
import { AppointmentsList } from '../Appointment/AppointmentsList';
import { AppointmentForm } from '../Appointment/AppointmentForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const AppointmentsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Appointment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
            </DialogHeader>
            <AppointmentForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <AppointmentsList key={refreshKey} />
    </div>
  );
};