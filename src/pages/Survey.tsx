import { useEffect, useState } from 'react'
import Fhir from '../api'
import { CircularProgress } from '@mui/material';
import Item from '../components/QuestionnaireItem/'
import { Questionnaire, QuestionnaireItem, QuestionnaireResponse, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from 'fhir/r4';
import UserGreeting from '../components/UserGreeting';

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

    useEffect(() => {
        console.log("Answers effect")
    }, [answers.length])

    const handleSurveyResponse = (answer: QuestionnaireResponseItemAnswer, code: string) => {
        const index = answers.findIndex(value => { return value.linkId === code })
        let answersCopy = [...answers]; //Just c
        const newValue = { linkId: code, answer: [answer] };

        if (index < 0) {
            console.log("push")
            answersCopy.push(newValue)
        } else {
            console.log("index")
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
        <div>
            <UserGreeting />
            <div>
                {survey ? <div style={{ padding: "1em" }}>
                    {survey && survey.item?.map((item: QuestionnaireItem) => <Item handleResponse={handleSurveyResponse} questionnaireItem={item} />)}
                    {answers.length === 2 && <button onClick={submitSurvey}>Submit Survey</button>}
                </div> : <CircularProgress variant="indeterminate" />}

            </div>
        </div>
    )
}