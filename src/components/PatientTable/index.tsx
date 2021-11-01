import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Patient } from 'fhir/r4'
import { Link } from "react-router-dom";
import { getFhirFullname } from "../../utility/fhir-utilities";

interface Props {
    patients: Patient[]
}

export default function PatientTable({ patients }: Props) {
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {patients.map(patient => <TableRow><TableCell><Link to={`/patient/${patient.id}`}>{getFhirFullname(patient.name)}</Link></TableCell></TableRow>)}
        </TableBody>
    </Table>
}