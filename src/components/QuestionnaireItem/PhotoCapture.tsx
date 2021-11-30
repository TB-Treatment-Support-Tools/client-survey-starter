import { CameraAlt } from '@mui/icons-material';
import { Box, ButtonBase } from '@mui/material'
import QuestionnaireElementProps from "../../types/questionnaire-element";
import QuestionText from '../Text/QuestionText';
import classes from './styles.module.scss'

export default function PhotoCapture({ item, handleResponse }: QuestionnaireElementProps) {
    return (<Box padding="1em">
        <QuestionText>{item.text || "Question Text Missing"}</QuestionText>
        <Box height="1em" />
        <ButtonBase className={classes.launchCamera}>
            <CameraAlt />
            <Box width="1em" />
            Launch Camera
        </ButtonBase>
    </Box>)
}