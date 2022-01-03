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
import { Condition } from 'fhir/r4';

export default function Conditions({ goToNext, information, setInformation }: AddPatientFlowProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (information?.id) {
            const condition: Condition = {
                resourceType: "Condition",
                subject: { reference: `Patient/${information?.id}` },
                code:  (value === "prep" ? riskForHIVCodeableConcept : positiveHIVCodeableConcept)
            }
            console.log(condition);
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