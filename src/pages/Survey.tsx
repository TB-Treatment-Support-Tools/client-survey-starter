import { useEffect, useState } from 'react'
import CapturePhoto from '../components/SurveyItem/CapturePhoto';
import Fhir from '../api'
import { CircularProgress } from '@mui/material';
import SurveyItem from '../types/survey-item';
import Item from '../components/SurveyItem'
import { Bundle, Questionnaire, QuestionnaireItem } from 'fhir/r4';

export default function Survey() {
    const [survey, setSurvey] = useState<Questionnaire | false>(false);
    const [userInput,setUserInput] = useState<any>({});

    const getSurvey = async () => {
        let surveyJSON = await Fhir.getSimpleSurvey('52');
        console.log(surveyJSON)
        setSurvey(surveyJSON);
        console.log("Survey Set")
    }

    useEffect(() => {
        getSurvey();
    }, [])

    const handleSurveyResponse = (value : any, code : string) => {
        let existingValue = userInput;
        existingValue[`${code}`] = value;
    }

    return (<div>
        {survey ? <div style={{padding: "1em"}}>
            {survey && survey.item?.map((item: QuestionnaireItem) => <Item handleResponse={handleSurveyResponse} surveyItem={item} /> )}
        </div> : <CircularProgress variant="indeterminate" />}

    </div>)
}