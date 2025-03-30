import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  CalendarDays,
  Clock,
  Pill,
  ClipboardList,
  User,
  Stethoscope,
} from "lucide-react";
import { format } from "date-fns";
import { getPrescriptionById } from "../../functions/allFunctions";
import { toast } from "sonner";

export const PatientPrescriptionDetails = () => {
  const { id } = useParams();

  const {
    data: prescription,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["prescription", id],
    queryFn: () => getPrescriptionById(id),
  });

  if (isLoading) return <div>Loading prescription details...</div>;
  if (error) return <div>Error loading prescription</div>;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              Prescription #{prescription.id}
            </h1>
            <Badge
              variant={
                prescription.status === "active" ? "default" : "secondary"
              }
            >
              {prescription.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 py-6">
          {/* Medication Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Medication Details
              </h2>
              <div className="space-y-1 pl-7">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medication:</span>
                  <span className="font-medium">{prescription.medication}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dosage:</span>
                  <span className="font-medium">{prescription.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">
                    {prescription.duration} days
                  </span>
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Dates
              </h2>
              <div className="space-y-1 pl-7">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prescribed:</span>
                  <span className="font-medium">
                    {format(
                      new Date(prescription.prescribedDate),
                      "MMM dd, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Until:</span>
                  <span className="font-medium">
                    {format(
                      new Date(prescription.validUntilDate),
                      "MMM dd, yyyy"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Instructions
            </h2>
            <div className="bg-muted/50 rounded-lg p-4 pl-7">
              <p className="whitespace-pre-line">{prescription.instructions}</p>
            </div>
          </div>

          {/* People Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Prescribing Doctor
              </h2>
              <div className="space-y-1 pl-7">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    Dr. {prescription.doctor.firstName}{" "}
                    {prescription.doctor.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specialization:</span>
                  <span className="font-medium">
                    {prescription.doctor.specialization}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient
              </h2>
              <div className="space-y-1 pl-7">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    {prescription.patient.firstName}{" "}
                    {prescription.patient.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span className="font-medium">
                    {format(
                      new Date(prescription.patient.dateOfBirth),
                      "MMM dd, yyyy"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={() => window.print()}>
            Print Prescription
          </Button>
          <Button
            onClick={() => toast.success("Prescription refill requested")}
          >
            Request Refill
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
