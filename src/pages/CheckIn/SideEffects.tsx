import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import QuestionText from '../../components/Text/QuestionText';
import NextButton from './NextButton';
import { useState } from 'react';

//@TODO - make this conditional based on the answer to the previous question
//@TODO - dont hardcode these here, move to FHIR Survey definition on HAPI Server 
const reasons = ["Nausea", "Vomiting", "Upset Stomach", "Vision Loss", "Other"]
const initalValues = reasons.map( each => {return false});

export default function SideEffects() {

    const [response,setResponse] = useState<boolean[]>(initalValues)

    return (<Box padding="1em">
        <QuestionText>What side effects have you experienced?</QuestionText>
        <Box height="1em" />
        <FormGroup>
            {reasons.map( (each,index) => {
                    const handleCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean) : void => {
                        let temp = [...response];
                        temp[index] = checked;
                        setResponse(temp)
                    }
                return (<FormControlLabel checked={response[index]} onChange={handleCheck} control={<Checkbox />} label={each} value={index} key={`adherence-reason-${index}`} />)})}
            <NextButton />
        </FormGroup>
    </Box>)
}