import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Condition, Patient } from 'fhir/r4'
import { Link } from "react-router-dom";
import { addCondition } from "../../api/patient";
import { deletePatient } from "../../api/practitioner";
import { extractTreatmentTypeFromSnomedCode, getFhirFullname } from "../../utility/fhir-utilities";

interface Props {
    patients: Patient[]
    conditions: Condition[],
    refresh: () => void
}

export default function PatientTable({ patients, conditions, refresh }: Props) {

    type ConditionMap = {
        [key: string]: string | undefined
    };

    let conditionsMap: ConditionMap = {}

    const handleDelete = (id : string) => {
        deletePatient(id)
        refresh();
    }

    conditions.forEach(c => {
        if (c.subject.reference && c.code && c.code.coding) {
            const newPatientId = c.subject.reference.split("/")[1]
            if (newPatientId) {
                conditionsMap[`${newPatientId}`] = extractTreatmentTypeFromSnomedCode(c.code.coding[0].code)
            }
        }
    })

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Treatment Type</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {patients.map(patient => {
            const condition = conditionsMap[`${patient.id}`];
            return(<TableRow>
                <TableCell>{patient.id}</TableCell>
                <TableCell><Link to={`/patient/${patient.id}`}>{getFhirFullname(patient.name)}</Link></TableCell>
                <TableCell>{condition}</TableCell>
                <TableCell>
                    {!condition && <>
                        <button onClick={() => { patient.id && addCondition(patient.id, false) }}>Add PrEP</button>
                        <br />
                        <button onClick={() => { patient.id && addCondition(patient.id, true) }}>Add +HIV</button>
                    </>}
                </TableCell>
                <TableCell>
                    <button onClick={()=>{patient.id && handleDelete(patient.id)}}>Delete</button>
                </TableCell>
            </TableRow>)})}
        </TableBody>
    </Table>
}