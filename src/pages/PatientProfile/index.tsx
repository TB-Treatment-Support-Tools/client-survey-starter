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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
                <BasicTabs loadResponses={loadResponses} responses={responses} />
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabProps{
    responses: QuestionnaireResponse[],
    loadResponses: () => void
}

function BasicTabs({responses, loadResponses} : TabProps) {
    const [value, setValue] = useState(0);

    const deleteEntry = async (id: string) => {
        await Fhir.deleteQuestionnaireResponse(id)
        loadResponses()
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Medication Reports" {...a11yProps(0)} />
                    <Tab label="Photos" {...a11yProps(1)} />
                    <Tab label="Survey Responses" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Medication Reports
            </TabPanel>
            <TabPanel value={value} index={1}>
                Photos
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>
                    {responses.map((response, index) => {
                        return (<div key={`questionnaire-${index}`}>
                            <p>{response.id}</p>
                            <p>Questionnarie ID: {response.questionnaire}</p>
                            <p>Created at: {response.authored} </p>
                            {response.item && <DisplayResponse items={response.item} />}
                            <button onClick={() => response.id && deleteEntry(response.id)} >Delete</button>
                        </div>)
                    })}
                </div>
            </TabPanel>
        </Box>
    );
}

