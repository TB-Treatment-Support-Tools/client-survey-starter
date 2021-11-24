import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import QuestionText from '../../components/Text/QuestionText';
import NextButton from './NextButton';

//@TODO - make this conditional based on the answer to the previous question
//@TODO - dont hardcode these here, move to FHIR Survey definition on HAPI Server 
const reasons = ["I forgot to take it","I ran out of medication","My medication is lost or stolen","I didn’t have time to take it","I didn’t have it with me today","I didn’t have privacy to take it","I wasn’t feeling well","Other"]

export default function AdherenceFactors() {
    return (<Box padding="1em">
        <QuestionText>What has been causing you to miss doses of your medication?</QuestionText>
        <Box height="1em" />
        <FormGroup>
            {reasons.map( (each,index) => <FormControlLabel  control={<Checkbox />} label={each} value={index} key={`adherence-reason-${index}`} />)}
            <NextButton />
        </FormGroup>
    </Box>)
}