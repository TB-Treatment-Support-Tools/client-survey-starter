import { Medication } from "fhir/r4";
import { useEffect, useState } from "react"
import { getMedications } from "../../api/practitioner"
import MedicationResult from "./MedicationResult";

export default function MedicationList() {

    const [medications, setMedication] = useState<Medication[]>([]);

    const fetchMeds = async () => {
        let medications = await getMedications();
        console.log(medications)
        setMedication(medications);
    }

    useEffect(() => {
        fetchMeds();
    }, [])

    return (<div>
        <select>
            {medications.map(each => <MedicationResult medication={each} />)}
        </select>
    </div>)
}