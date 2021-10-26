import { useEffect, useState } from 'react'
import Fhir from '../api'
import { CircularProgress } from '@mui/material';
import Item from '../components/SurveyItem'
import {Questionnaire, QuestionnaireItem, QuestionnaireResponse } from 'fhir/r4';

export default function Survey() {
    const [survey, setSurvey] = useState<Questionnaire | false>(false);
    const [response,setResponse] = useState<QuestionnaireResponse>({ resourceType: "QuestionnaireResponse", status: 'in-progress'})

    const getSurvey = async () => {
        let surveyJSON = await Fhir.getSimpleSurvey('52');
        setSurvey(surveyJSON);
    }

    useEffect(() => {
        getSurvey();
    }, [])

    const handleSurveyResponse = (value : any, code : string) => {
        console.log("Handle Response Called")
        console.log(`Value: ${value} code: ${code}`)
    }

    return (<div>
        {survey ? <div style={{padding: "1em"}}>
            {survey && survey.item?.map((item: QuestionnaireItem) => <Item handleResponse={handleSurveyResponse} surveyItem={item} /> )}
        </div> : <CircularProgress variant="indeterminate" />}

    </div>)
}