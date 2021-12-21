import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import NextButton from './NextButton';

interface Props {
    goToNext?: () => void
}

export default function Conditions({ goToNext }: Props) {
    return (
        <Box>
            <FormControl component="fieldset">
                <FormLabel component="legend">Treatment Type</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="prep" control={<Radio />} label="PrEP Treatment" />
                    <FormControlLabel value="art" control={<Radio />} label="ART Treatment" />
                </RadioGroup>
            </FormControl>
            <NextButton onClick={goToNext} />
        </Box>
    );
}