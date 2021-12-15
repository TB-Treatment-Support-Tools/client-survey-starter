import QuestionnaireElementProps from "../../types/questionnaire-element";
import { CameraAlt } from '@mui/icons-material';
import { Box, ButtonBase } from '@mui/material';
import useToggle from '../../hooks/useToggle';
import QuestionText from '../Text/QuestionText';
import classes from './styles.module.scss';
import CroppableCamera from "../../image-capture/CroppableCamera";

export default function PhotoCapture({ item, handleResponse }: QuestionnaireElementProps) {

    const [cameraOpen,toggleCameraOpen] = useToggle(false);

    return (<Box padding="1em">
        <QuestionText>{item.text || "Question Text Missing"}</QuestionText>
        <Box height="1em" />
        {!cameraOpen && <ButtonBase onClick={toggleCameraOpen} className={classes.launchCamera}>
            <CameraAlt />
            <Box width="1em" />
            Launch Camera
        </ButtonBase>}
        {cameraOpen && <CroppableCamera closeCamera={toggleCameraOpen} setImages={(tests)=>{console.log("TODO")}} />}
    </Box>)
}