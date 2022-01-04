import { MedicationAdministration, Patient, QuestionnaireResponse, QuestionnaireResponseItem } from "fhir/r4"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import Fhir from "../../api"
import { addMedicaiton } from "../../api/practitioner"
import AuthImage from "../../components/AuthImage"
import OptionButton from "../../components/Buttons/OptionButton"
import CarePlanInfo from "../../components/CarePlanInfo"
import { getFhirFullname } from "../../utility/fhir-utilities"
import styles from './styles.module.scss'
import Calendar from '../../components/MedAdminCalendar'
import { getMedAdminsMap, getMedcationAdministration } from "../../api/patient"
import DateMap from "../../types/date-map"

export default function PatientProfile() {
    const { location } = useHistory()
    const [patient, setPatient] = useState<Patient | null>(null)

    const [responses, setResponses] = useState<QuestionnaireResponse[]>([])
    const [medAdmins,setMedAdmins] = useState<DateMap>(new Map<string, boolean>())

    const splitPath = location.pathname.split("/")
    const patientId = splitPath[splitPath.length - 1]

    const showResponses = (responses && responses[0])

    const loadPatient = async () => {
        setPatient(await Fhir.getPatient(patientId))
    }

    const loadResponses = async () => {
        const res = await Fhir.getPatientQuestionnaireResponses(patientId)
        const medAdmins = await getMedAdminsMap(patientId)
        setResponses(res.reverse().map((each: any) => { return each.resource }))
        setMedAdmins(medAdmins)
    }

    const deleteEntry = async (id: string) => {
       await Fhir.deleteQuestionnaireResponse(id)
       loadResponses()

    }

    useEffect(() => {
        if (patientId) {
            loadPatient()
            loadResponses()
        }
    }, [patientId])

    return (<div>
        {patient && <div>
            <p>Name: {getFhirFullname(patient.name)} </p>
            <p>Resource ID: {patient.id}</p>
            <OptionButton onClick={addMedicaiton}>Add Medication</OptionButton>
        </div>}

        <Calendar valueMap={medAdmins} />

        {patient && <CarePlanInfo patient={patient} />}

        <h2>Reponses found: {showResponses && "True"}</h2>
        {showResponses && responses.map((response, index) => {
            return (<div key={`questionnaire-${index}`}>
                <p>{response.id}</p>
                <p>Questionnarie ID: {response.questionnaire}</p>
                <p>Created at: {response.authored} </p>
                {response.item && <DisplayResponse items={response.item} />}
                <button onClick={() => response.id && deleteEntry(response.id)} >Delete</button>
            </div>)
        })}
    </div>)
}

interface Props {
    items: QuestionnaireResponseItem[]
}

const DisplayResponse = ({ items }: Props) => {
    return (<div>{items.map(item => <ResponseItem item={item} />)}
    </div>)
}

interface ItemProps {
    item: QuestionnaireResponseItem
}

const ResponseItem = ({ item }: ItemProps) => {
    if (item.answer && item.answer[0]) {
        console.log(item.answer)
    }

    if (item.answer && item.answer[0].valueBoolean !== undefined) {
        return <p>Have I been taking my medicaiton : {item.answer[0].valueBoolean ? "True" : "False"}</p>
    }

    if (item.answer && item.answer[0].valueUri !== undefined) {
        return <AuthImage className={styles.image}  path={item.answer[0].valueUri} />
    }

    return <p>Invalid</p>
}

