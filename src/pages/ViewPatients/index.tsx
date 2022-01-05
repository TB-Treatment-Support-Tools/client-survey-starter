import { Bundle, Patient, Condition } from "fhir/r4"
import { useContext, useEffect, useState } from "react"
import PatientTable from "../../components/PatientTable"
import { getConditions, getPatients } from "../../api/practitioner"
import UserContext from "../../context/user-context"
import AddPatient from "../../components/AddPatient"
import Fhir from "../../api"
import { Grid, Box } from "@mui/material"

export default function ViewPatients() {

    const [patients, setPatients] = useState<Patient[]>([])
    const [conditions, setConditions] = useState<Condition[]>([])
    const { organizationID } = useContext(UserContext)


    const loadPatients = async () => {
        if (organizationID) {
            try {
                const patients = await getPatients(organizationID)
                setPatients(patients)

            } catch (err) {
                console.log("Error fetching patietns")
            }
        }
    }

    const loadConditions = async () => {
        try {
            const json: Bundle = await getConditions()
            const newConditions: Condition[] = json.entry?.map(each => each.resource) as Condition[]
            setConditions(newConditions)

        } catch (err) {
            console.log("Error fetching condtions")
        }
    }

    useEffect(() => {
        loadPatients()
        loadConditions()
    }, [organizationID])

    return (<Box padding="1em" >
        <Grid justifyContent="space-between" style={{ width: "100%" }} container wrap="nowrap">
            <span>Patients at Site {organizationID}</span>
            <Box width="1em" />
            <AddPatient refresh={loadPatients} />
        </Grid>
        <Box padding="1em 0">
            {patients.length > 0 && <PatientTable refresh={() => { loadPatients() }} conditions={conditions} patients={patients} />}
        </Box>
    </Box>)
}