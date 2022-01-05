import { CarePlan, Medication, Patient } from "fhir/r4"
import { useEffect, useState } from "react"
import { getCarePlans } from "../../api/patient"
import { getMedication } from "../../api/shared"
import { getMedicationIdFromCarePlan } from "../../utility/fhir-utilities"

interface Props {
    patient: Patient
}

export default function CarePlanInfo({ patient }: Props) {

    const [carePlan, setCarePlan] = useState<CarePlan | null>(null)
    const [medication, setMedication] = useState<Medication | undefined>()

    const fetchCarePlans = async () => {
        if (patient?.id) {
            let carePlans = await getCarePlans(patient.id)
            if (carePlans.length > 0) {
                setCarePlan(carePlans[0])
                try {
                    let med = await getMedication(getMedicationIdFromCarePlan(carePlans[0]))
                    setMedication(med)
                } catch(err) {
                    console.log("Error getting meds")
                    console.log(err)
                }
            }
        }
    }

    useEffect(() => {
        fetchCarePlans()
    }, [])

    return (
        <div>
            <p>CarePlan ID: {carePlan?.id}</p>
            <p>Medication: {medication?.code?.text || "Not Found"} </p>
        </div>
    )


}