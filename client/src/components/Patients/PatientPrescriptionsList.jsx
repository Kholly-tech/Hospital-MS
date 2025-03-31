import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  getPrescriptions,
  deletePrescription,
  getPrescriptionsByDoctor,
  getPrescriptionsByPatient,
} from "../../functions/allFunctions";
import { format } from "date-fns";
import useUser from "../../services/hooks/useUser";
import { useNavigate } from "react-router-dom";

export const PatientPrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterId, setFilterId] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        let data;
        data = await getPrescriptionsByPatient(currentUser?.refId);
        console.log(data);
        setPrescriptions(data?.items);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, [searchTerm, filterType, filterId]);

  const handleDelete = async (prescriptionId) => {
    try {
      await deletePrescription(prescriptionId);
      setPrescriptions(prescriptions.filter((p) => p.id !== prescriptionId));
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  if (loading) return <div>Loading prescriptions...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-1 text-xl ml-2">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search by medication or instructions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label>Filter By</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prescriptions</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(filterType === "doctor" || filterType === "patient") && (
            <div className="space-y-2">
              <Label>ID</Label>
              <Input
                type="number"
                placeholder={`Enter ${filterType} ID`}
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="font-medium text-lg">
            <TableHead>Medication</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Prescribed By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions &&
            prescriptions.map((prescription) => (
              // <div
              //   key={prescription.id}
              //   onClick={() => {
              //     const navigate = useNavigate();
              //     navigate(`/prescription/${prescription.id}`);
              //   }}
              // >
                <TableRow key={prescription.id} onClick={() => {
                  navigate(`/prescriptions/${prescription.id}`);
                }}>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>
                    Dr. {prescription.doctor?.firstName}{" "}
                    {prescription.doctor?.lastName}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(prescription.prescribedDate),
                      "MM/dd/yyyy"
                    )}
                  </TableCell>
                  <TableCell>{prescription.duration} days</TableCell>
                </TableRow>
              // </div>
            ))}
          {/* {prescriptions.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-2xl mt-6">
                No prescriptions found.
              </TableCell>
            </TableRow>
          )} */}
        </TableBody>
      </Table>
    </div>
  );
};
