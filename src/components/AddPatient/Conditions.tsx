import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import NextButton from './NextButton';
import AddPatientFlowProps from './AddPatientFlowProps';
import { positiveHIVCodeableConcept, riskForHIVCodeableConcept } from "../../resources/conditions";

export default function Conditions({ goToNext, information, setInformation }: AddPatientFlowProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {

        if (setInformation) {
            let tempInformation = { ...information }
            tempInformation.condition = (value === "prep" ? riskForHIVCodeableConcept : positiveHIVCodeableConcept)
            setInformation(tempInformation)
        }
    }

    return (
        <>
            <Box padding="2em 0">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Treatment Type</FormLabel>
                    <RadioGroup
                        onChange={handleChange}
                        aria-label="gender"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="prep" control={<Radio />} label="PrEP Treatment" />
                        <FormControlLabel value="art" control={<Radio />} label="ART Treatment" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <NextButton onClick={goToNext} />
        </>
    );
}