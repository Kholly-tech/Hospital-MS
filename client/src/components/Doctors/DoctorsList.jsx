import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { getAllDoctors, deleteDoctor } from '../../functions/allFunctions';

export const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    try {
      await deleteDoctor(doctorId);
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  if (loading) return <div>Loading doctors...</div>;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>License</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>Dr. {doctor.firstName} {doctor.lastName}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {doctor.specialization}
                </Badge>
              </TableCell>
              <TableCell>{doctor.licenseNumber}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(doctor.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};