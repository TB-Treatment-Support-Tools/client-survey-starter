import { Box, ButtonBase } from '@mui/material'
import QuestionnaireElementProps from "../../types/questionnaire-element";
import QuestionText from '../Text/QuestionText';

export default function PhotoCapture({ item, handleResponse }: QuestionnaireElementProps) {
    return (<Box padding="1em">
        <QuestionText>{item.text || "Question Text Missing"}</QuestionText>
        <Box height="1em" />
        <ButtonBase>Launch Camera</ButtonBase>
    </Box>)
}