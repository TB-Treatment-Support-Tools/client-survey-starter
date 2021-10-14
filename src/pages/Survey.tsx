import { useEffect, useState } from 'react'
import CapturePhoto from '../components/SurveyItem/CapturePhoto';
import Fhir from '../api'
import { CircularProgress } from '@mui/material';
import SurveyItem from '../types/survey-item';
import Item from '../components/SurveyItem'

export default function Survey() {
    const [survey, setSurvey] = useState<any>({});
    const [userInput,setUserInput] = useState<any>({});

    const getSurvey = async () => {
        let surveyJSON = await Fhir.getSimpleSurvey('52');
        setSurvey(surveyJSON.resource);
    }

    useEffect(() => {
        getSurvey()
    }, [])

    const handleSurveyResponse = (value : any, code : string) => {
        let existingValue = userInput;
        existingValue[`${code}`] = value;
    }

    return (<div>
        {survey ? <div style={{padding: "1em"}}>
            {survey.item?.map((item: SurveyItem) => <Item handleResponse={handleSurveyResponse} surveyItem={item} /> )}
        </div> : <CircularProgress variant="indeterminate" />}

    </div>)
}