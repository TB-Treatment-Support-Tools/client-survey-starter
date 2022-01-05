import { Patient, QuestionnaireResponse, QuestionnaireResponseItem } from "fhir/r4"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import Fhir from "../../api"
import AuthImage from "../../components/AuthImage"
import CarePlanInfo from "../../components/CarePlanInfo"
import { getFhirFullname } from "../../utility/fhir-utilities"
import styles from './styles.module.scss'
import Calendar from '../../components/MedAdminCalendar'
import { getMedAdminsMap } from "../../api/patient"
import DateMap from "../../types/date-map"
import Grid from '@mui/material/Grid'
import { Paper, Typography } from "@mui/material"
import classes from './styles.module.scss'
import { Box } from "@mui/system"

export default function PatientProfile() {
    const { location } = useHistory()
    const [patient, setPatient] = useState<Patient | null>(null)

    const [responses, setResponses] = useState<QuestionnaireResponse[]>([])
    const [medAdmins, setMedAdmins] = useState<DateMap>(new Map<string, boolean>())

    const splitPath = location.pathname.split("/")
    const patientId = splitPath[splitPath.length - 1]

    const showResponses = (responses && responses[0])

    const loadPatient = async () => {
        setPatient(await Fhir.getPatient(patientId))
    }

    const loadResponses = async () => {
        const res = await Fhir.getPatientQuestionnaireResponses(patientId)
        const medAdmins = await getMedAdminsMap(patientId)
        res && setResponses(res.reverse().map((each: any) => { return each.resource }))
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
        {patient &&
            <>
                <Grid container>
                    <Box className={classes.card}>
                        <Typography variant="h2">Patient Information:</Typography>
                        <Box width="100%" borderBottom="1px solid gray" margin=".5em 0" />
                        <Typography variant="body1">Name: {getFhirFullname(patient.name)} </Typography>
                        <Typography variant="body1">Resource ID: {patient.id}</Typography>
                        <CarePlanInfo patient={patient} />
                    </Box>
                    <Box margin="0 auto" className={classes.card}>
                        <Typography variant="h2">Progress Summary:</Typography>
                        <Box width="100%" borderBottom="1px solid gray" margin=".5em 0" />
                    </Box>
                    <Box marginLeft="auto" width="400px">
                        <Calendar valueMap={medAdmins} />
                    </Box>
                </Grid>
                <div>
                    {showResponses && responses.map((response, index) => {
                        return (<div key={`questionnaire-${index}`}>
                            <p>{response.id}</p>
                            <p>Questionnarie ID: {response.questionnaire}</p>
                            <p>Created at: {response.authored} </p>
                            {response.item && <DisplayResponse items={response.item} />}
                            <button onClick={() => response.id && deleteEntry(response.id)} >Delete</button>
                        </div>)
                    })}
                </div>
            </>}
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
        // console.log(item.answer)
    }

    if (item.answer && item.answer[0].valueBoolean !== undefined) {
        return <p>Have I been taking my medicaiton : {item.answer[0].valueBoolean ? "True" : "False"}</p>
    }

    if (item.answer && item.answer[0].valueUri !== undefined) {
        return <AuthImage className={styles.image} path={item.answer[0].valueUri} />
    }

    return <p>Invalid</p>
}

