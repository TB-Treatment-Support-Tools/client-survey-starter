import { Bundle, Patient, BundleEntry } from "fhir/r4"
import { useEffect, useState } from "react"
import Fhir from "../../api"
import PatientTable from "../../components/PatientTable";

export default function ViewPatients() {

    const [patients, setPatients] = useState<Patient[]>([]);

    const getPatients = async () => {
        try {
            const json : Bundle = await Fhir.getPatients(102)
            const patients : Patient[] = json.entry?.map( each => each.resource) as Patient[]
            setPatients(patients)

        } catch (err) {
            console.log("Error fetching patietns")
        }
    }

    useEffect(() => {
        //Todo - get org id from context
        getPatients();
    }, [])

    return <div>
        {patients.length > 0 && <PatientTable patients={patients} />}
    </div>
}