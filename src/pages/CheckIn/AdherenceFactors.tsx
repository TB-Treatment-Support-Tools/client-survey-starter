import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import QuestionText from '../../components/Text/QuestionText';
import NextButton from './NextButton';

export default function AdherenceFactors() {
    return (<Box padding="1em">
        <QuestionText>What has been causing you to miss doses of your medication?</QuestionText>
        <p>TODO: This screen will be conditional based on the previous question</p>
        <Box height="1em" />
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Reason One" />
            <FormControlLabel control={<Checkbox />} label="Reason Two" />
            <FormControlLabel control={<Checkbox />} label="Other:" />
            <NextButton />
        </FormGroup>
    </Box>)
}