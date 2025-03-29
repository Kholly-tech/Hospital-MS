import { useState } from 'react';
import { Button } from '../ui/button';
import { DoctorsList } from '../Doctors/DoctorsList';
import { DoctorForm } from '../Doctors/DoctorForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const DoctorsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Doctors</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Doctor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
            </DialogHeader>
            <DoctorForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <DoctorsList key={refreshKey} />
    </div>
  );
};