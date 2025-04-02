import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import {
  cancelAppointment,
  getDoctorAppointments,
  acceptAppointment,
} from "../../functions/allFunctions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DoctorAppointmentForm } from "./DoctorAppointmentForm";
import useUser from "../../services/hooks/useUser";
import { toast } from "sonner";

export const DoctorAppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let data;
        data = await getDoctorAppointments(currentUser?.refId);
        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      setAppointments(appointments.filter((app) => app.id !== appointmentId));
      toast.success("Appointment cancelled successfully");
      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleAccept = async (appointmentId) => {
    try {
      await acceptAppointment(appointmentId);
      setAppointments(appointments.map(app => {
          if (app.id === appointmentId) {
            return { ...app, status: "approved" };
          }
      }))
      toast.success("Appointment approved successfully");
      alert("Appointment approved successfully!");
    } catch (error) {
      console.error("Error approving appointment:", error);
      toast.error("Failed to approve appointment");
    }
  };

  if (loading)
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading appointments...</p>
      </div>
    );

  return (
    <div className="w-full space-y-4">
      {appointment != null && (
        <Dialog open={appointment.id} onOpenChange={() => setAppointment(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>
            <DoctorAppointmentForm
              appointment={appointment}
              onSuccess={() => {
                setAppointment(null);
                getDoctorAppointments(currentUser?.refId).then((data) => {
                  setAppointments(data || []);
                });
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <div className="w-full border rounded-lg overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[20%]">Patient</TableHead>
              <TableHead className="w-[20%]">Date</TableHead>
              <TableHead className="w-[20%]">Time</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow key={appointment?.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {appointment?.patient?.firstName}{" "}
                    {appointment?.patient?.lastName}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(appointment?.appointmentDate),
                      "MMM dd, yyyy"
                    )}
                  </TableCell>
                  <TableCell>
                    {appointment?.startTime} - {appointment?.endTime}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        appointment?.status === "pending"
                          ? "secondary"
                          : appointment?.status === "approved"
                          ? "default"
                          : "destructive"
                      }
                      className="capitalize"
                    >
                      {appointment?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {appointment?.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAccept(appointment?.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(appointment?.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-lg font-medium">No appointments found</p>
                    <p className="text-muted-foreground">
                      You don't have any scheduled appointments yet.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
