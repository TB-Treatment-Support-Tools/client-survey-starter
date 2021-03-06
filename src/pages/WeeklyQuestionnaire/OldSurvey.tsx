import { useEffect, useState } from 'react'
import Fhir from '../../api'
import { CircularProgress, IconButton } from '@mui/material';
import Item from '../../components/QuestionnaireItem'
import { Questionnaire, QuestionnaireItem, QuestionnaireResponse, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from 'fhir/r4';
import UserGreeting from '../../components/UserGreeting';
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import { Cancel } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Fade from '@mui/material/Fade';

export default function Survey() {
    const [survey, setSurvey] = useState<Questionnaire | null>(null);
    const [answers, setAnswers] = useState<QuestionnaireResponseItem[]>([]);

    const getSurvey = async () => {
        let surveyJSON = await Fhir.getSimpleSurvey('52');
        setSurvey(surveyJSON);
    }

    useEffect(() => {
        getSurvey();
    }, [])

    const handleSurveyResponse = (answer: QuestionnaireResponseItemAnswer, code: string) => {
        const index = answers.findIndex(value => { return value.linkId === code })
        let answersCopy = [...answers];
        const newValue = { linkId: code, answer: [answer] };

        if (index < 0) {
            answersCopy.push(newValue)
        } else {
            answersCopy[index] = newValue
        }
        console.log(`handle response: ${answer} Value: ${code}`)
        setAnswers(answersCopy)
    }

    const submitSurvey = () => {
        const questionnaireResponse: QuestionnaireResponse = {
            resourceType: "QuestionnaireResponse",
            status: 'completed',
            authored: new Date().toISOString(),
            questionnaire: `${survey?.id}`,
            author: {
                reference: "Patient/1",
                type: "Patient"
            },
            item: answers
        }

        Fhir.uploadQuestionnaireResponse(questionnaireResponse)
    }

    return (
        <Fade appear in timeout={1500} >
            <div className={classes.container}>
                <div>
                    {survey ? <div style={{ padding: "1em" }}>
                        {survey && survey.item?.map((item: QuestionnaireItem) => <Item handleResponse={handleSurveyResponse} questionnaireItem={item} />)}
                        {answers.length === 2 && <button onClick={submitSurvey}>Submit Survey</button>}
                    </div> : <CircularProgress variant="indeterminate" />}
                </div>
            </div>
        </Fade>
    )
}