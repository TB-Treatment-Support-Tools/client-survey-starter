import NextButton from "./NextButton"
import generateDefaultCareplan from '../../resources/default-careplan'
import AddPatientFlowProps from "./AddPatientFlowProps"
import { useEffect, useState } from "react"
import { CarePlan, Medication } from "fhir/r4"
import MedicationList from "../MedicationList"
import { addCarePlan, getMedications } from "../../api/practitioner"
import MedicationResult from "../MedicationList/MedicationResult"
import classes from './styles.module.scss'
import generateCarePlan from "../../resources/default-careplan"
import Loading from "../Loading"

interface Props {
    goToNext?: () => void
}

export default function CarePlanInfo({ goToNext, information, setInformation }: AddPatientFlowProps) {

    const [selection, setSelection] = useState<number | undefined>(undefined)
    const [medications, setMedications] = useState<Medication[]>([])
    const [loading,setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchMeds();
    }, [])

    const fetchMeds = async () => {
        let medications = await getMedications();
        setMedications(medications);
    }

    const handleNext = async () => {
        if (selection !== undefined && information?.id && goToNext) {
            let medicationId = medications[selection].id
            console.log(medicationId)
            if(medicationId){
                const carePlan = generateCarePlan(information.id,medicationId) 
                setLoading(true)
                await addCarePlan(carePlan)
                setLoading(false)
                goToNext()
            }
        }
    }

    return (
        <div>
            {loading ? <Loading /> : <>
            <div>
                <p>Select a medication regmine for this patient</p>
                <select className={classes.medicationSelect} defaultValue={undefined} onChange={(event) => { setSelection(parseInt(event.target.value)) }} value={selection}>
                    <option value={undefined}>Please Select One</option>
                    {medications.map((each, index) => <option key={`med-${index}`} value={index}>{each.code?.text || "Unknown"}</option>)}
                </select>
            </div>

            <p>TODO: In the future you can change frequency of requests </p>
            </>}
            <NextButton disabled={selection === undefined} onClick={handleNext} />
        </div>
    )

}