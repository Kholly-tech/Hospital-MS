import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
    getPrescriptions, 
    deletePrescription,
    getPrescriptionsByDoctor,
    getPrescriptionsByPatient
} from '../../functions/allFunctions';
import { format } from 'date-fns';

export const AdminPrescriptionsList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterId, setFilterId] = useState('');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                let data;
                if (filterType === 'doctor' && filterId) {
                    data = await getPrescriptionsByDoctor(parseInt(filterId));
                } else if (filterType === 'patient' && filterId) {
                    data = await getPrescriptionsByPatient(parseInt(filterId));
                } else {
                    data = await getPrescriptions({ search: searchTerm });
                }
                setPrescriptions(data);
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
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <Label htmlFor="search">Search</Label>
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
                        <Select
                            value={filterType}
                            onValueChange={setFilterType}
                        >
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
                    {(filterType === 'doctor' || filterType === 'patient') && (
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
                    <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Prescribed To</TableHead>
                        <TableHead>Prescribed By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prescriptions.map((prescription) => (
                        <TableRow key={prescription.id}>
                            <TableCell>{prescription.medication}</TableCell>
                            <TableCell>{prescription.dosage}</TableCell>
                            <TableCell>
                                {prescription.patient?.user?.firstName} {prescription.patient?.user?.lastName}
                            </TableCell>
                            <TableCell>
                                Dr. {prescription.doctor?.user?.firstName} {prescription.doctor?.user?.lastName}
                            </TableCell>
                            <TableCell>
                                {format(new Date(prescription.prescribedDate), 'MM/dd/yyyy')}
                            </TableCell>
                            <TableCell>
                                {prescription.duration?.days} days
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(prescription.id)}
                                >
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