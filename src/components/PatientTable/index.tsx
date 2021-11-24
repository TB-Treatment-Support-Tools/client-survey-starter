import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Condition, Patient } from 'fhir/r4'
import { Link } from "react-router-dom";
import { addCondition } from "../../api/patient";
import { getFhirFullname } from "../../utility/fhir-utilities";

interface Props {
    patients: Patient[]
    conditions: Condition[]
}

export default function PatientTable({ patients, conditions }: Props) {

    type ConditionMap = {
        [key: string]: string | undefined
    };

    let conditionsMap: ConditionMap = {}

    conditions.forEach(c => {
        if (c.subject.reference && c.code && c.code.coding) {
            const newPatientId = c.subject.reference.split("/")[1]
            if (newPatientId) {
                conditionsMap[`${newPatientId}`] = c.code.coding[0].display
            }
        }
    })

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Condition</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {patients.map(patient => <TableRow>
                <TableCell>{patient.id}</TableCell>
                <TableCell><Link to={`/patient/${patient.id}`}>{getFhirFullname(patient.name)}</Link></TableCell>
                <TableCell>{conditionsMap[`${patient.id}`]}</TableCell>
                <TableCell>
                    <button onClick={() => { patient.id && addCondition(patient.id, false) }}>Add PrEP</button>
                    <br />
                    <button onClick={() => { patient.id && addCondition(patient.id, true) }}>Add +HIV</button>
                </TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
}