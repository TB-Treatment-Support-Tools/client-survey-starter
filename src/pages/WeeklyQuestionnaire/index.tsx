import { Cancel } from "@mui/icons-material";
import { Fade, Grid, IconButton, Button } from '@mui/material'
import { Link, useLocation, useHistory } from "react-router-dom";
import classes from './styles.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
import Left from '@mui/icons-material/KeyboardArrowLeft'
import { Questionnaire, QuestionnaireItem, QuestionnaireResponse, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from 'fhir/r4';
import QuestionnaireItemRouter from "./QuestionnaireItemRouter";
import { useContext, useState } from "react";
import NextButton from "./NextButton";
import OptionButton from "../../components/Buttons/OptionButton";
import UserContext from "../../context/user-context";
import {uploadQuestionnaireResponse} from '../../api/patient';

interface Props {
    questionnaire: Questionnaire
}

export default function WeeklyQuestionnaire({ questionnaire }: Props) {

    const { user } = useContext(UserContext);

    const [responses, setResponses] = useState<QuestionnaireResponseItem[]>([]);

    let questions: QuestionnaireItem[] = [];
    if (questionnaire.item && questionnaire.item.length > 0) {
        questions = questionnaire.item
    }

    const location = useLocation();
    const history = useHistory();

    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);
    const progress = (questionNumber / questions.length) * 100;

    const submitResponse = async () => {

        if (user && responses.length > 0) {
            let body: QuestionnaireResponse = {
                questionnaire: `Questionnaire/${questionnaire.id}`,
                resourceType: "QuestionnaireResponse",
                status: "completed",
                subject: {
                    reference: `Patient/${user?.id}`
                },
                author: {
                    reference: `Patient/${user?.id}`
                },
                item: responses
            }
            let res = await uploadQuestionnaireResponse(body);
            console.log(res)
        }
    }

    //Refactor this to make more sense
    if (questionNumber > questions.length) {
        return (<div className={classes.container}>
            <Button onClick={()=>{history.goBack()}}>Back</Button>
            <p>This is the Summary Page</p>
            <OptionButton onClick={() => { console.log(responses) }}> Review Responses</OptionButton>
            <OptionButton onClick={submitResponse}>Upload Responses</OptionButton>
            <Link to="/home">
                <OptionButton > Submit and Go Home</OptionButton>
            </Link>
        </div>)

    }

    const currentQuestion = questions[questionNumber - 1];

    const handleGroupResponse = (items: QuestionnaireResponseItem[], code: string) => {
        const index = responses.findIndex(value => { return value.linkId === code })
        let answersCopy = [...responses];
        const newValue = { linkId: code, item: items };

        if (index < 0) {
            answersCopy.push(newValue)
        } else {
            answersCopy[index] = newValue
        }
        setResponses(answersCopy)
    }

    const handleResponse = (answers: QuestionnaireResponseItemAnswer[], code: string) => {
        const index = responses.findIndex(value => { return value.linkId === code })
        let answersCopy = [...responses];
        const newValue = { linkId: code, answer: answers };

        if (index < 0) {
            answersCopy.push(newValue)
        } else {
            answersCopy[index] = newValue
        }
        setResponses(answersCopy)
    }

    return (
        <Fade in appear timeout={1000}>
            <div className={classes.container}>
                <TopText progress={progress} />
                <QuestionnaireItemRouter responses={responses} handleGroupResponse={handleGroupResponse} handleResponse={handleResponse} item={currentQuestion} />
                <NextButton questions={questions} responses={responses} />
            </div>
        </Fade>
    )
}

interface TopTextProps {
    progress: number
}

const TopText = ({ progress }: TopTextProps) => {
    const history = useHistory();
    return (
        <div>
            <Grid justifyContent="space-between" alignItems="center" container >
                <IconButton className={classes.backButton} onClick={history.goBack}>
                    <Left />
                </IconButton>
                <Link className={classes.exit} to="/home">
                    <Cancel />
                </Link>
            </Grid>
            <div style={{ flexGrow: 1, padding: "1em" }}>
                <LinearProgress variant="determinate" value={progress} />
            </div>
        </div>
    )
}