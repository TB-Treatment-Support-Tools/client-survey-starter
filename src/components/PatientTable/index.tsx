import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Patient } from 'fhir/r4'

interface Props {
    patients: Patient[]
}

const getName = (patient: any): string => {
    console.log(patient)
    if (patient.name) {
        return (`${patient.name[0].given[0]} ${patient.name[0].family}`)
    }
    return "Unknown"

}

export default function PatientTable({ patients }: Props) {
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {patients.map(patient => <TableRow><TableCell>{getName(patient)}</TableCell></TableRow>)}
        </TableBody>
    </Table>
}