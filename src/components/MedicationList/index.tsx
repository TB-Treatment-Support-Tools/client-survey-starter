import { Medication } from "fhir/r4";
import { useEffect, useState } from "react"
import { getMedications } from "../../api/practitioner"
import MedicationResult from "./MedicationResult";

interface Props{
    value: string | null,
    handleChange: () => void
}

export default function MedicationList({handleChange, value}: Props) {

    const [medications, setMedication] = useState<Medication[]>([]);

    const fetchMeds = async () => {
        let medications = await getMedications();
        setMedication(medications);
    }

    useEffect(() => {
        fetchMeds();
    }, [])

    return (<div>
        <select value={value || ""} onChange={handleChange}>
            {medications.map(each => <MedicationResult medication={each} />)}
        </select>
    </div>)
}