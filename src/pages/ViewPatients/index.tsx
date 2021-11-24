import { Bundle, Patient, BundleEntry, Condition } from "fhir/r4"
import { useEffect, useState } from "react"
import Fhir from "../../api"
import PatientTable from "../../components/PatientTable";
import { getConditions } from "../../api/practitioner";

export default function ViewPatients() {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);


    const getPatients = async () => {
        try {
            const json : Bundle = await Fhir.getPatients(102)
            const patients : Patient[] = json.entry?.map( each => each.resource) as Patient[]
            setPatients(patients)

        } catch (err) {
            console.log("Error fetching patietns")
        }
    }

    const loadConditions = async () => {
        try {
            const json : Bundle = await getConditions()
            const newConditions : Condition[] = json.entry?.map( each => each.resource) as Condition[]
            setConditions(newConditions);

        } catch (err) {
            console.log("Error fetching condtions")
        }
    }

    useEffect(() => {
        //Todo - get org id from context
        getPatients();
        loadConditions();
    }, [])

    return <div>
        {patients.length > 0 && <PatientTable conditions={conditions} patients={patients} />}
    </div>
}