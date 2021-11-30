import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import QuestionText from '../Text/QuestionText';
import { useEffect, useState } from 'react';
import QuestionnaireElementProps from '../../types/questionnaire-element';

export default function Choice({ item, handleResponse }: QuestionnaireElementProps) {

    let reasons : string[] = []

    if (item.answerOption && item.answerOption.length > 0) {
        reasons = item.answerOption.map(answerOptionItem => { return answerOptionItem.valueCoding?.display || "" })
    }

    const initalValues = reasons.map(each => { return false });
    const [response, setResponse] = useState<boolean[]>(initalValues)

    useEffect(()=>{
        handleResponse(item.linkId,response)
    },[response])

    return (<Box padding="1em">
        <QuestionText>What has been causing you to miss doses of your medication?</QuestionText>
        <Box height="1em" />
        <FormGroup>
            {reasons.map((each, index) => {
                const handleCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean): void => {
                    let temp = [...response];
                    temp[index] = checked;
                    setResponse(temp)
                }
                return (<FormControlLabel checked={response[index]} onChange={handleCheck} control={<Checkbox />} label={each} value={index} key={`adherence-reason-${index}`} />)
            })}
        </FormGroup>
    </Box>)
}