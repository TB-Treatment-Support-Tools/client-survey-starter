import { CameraAlt } from "@mui/icons-material";
import { ButtonBase, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useToggle from "../../../hooks/useToggle";
import CroppableCamera from "../../../image-capture/CroppableCamera";
import classes from './styles.module.scss'

export default function TestSubmission() {

    const [cameraOpen,toggleCameraOpen] = useToggle(false);

    return (<Box padding="1em">
        <Box height="2em" />
        <Typography variant="body1">Please complete a test strip, then press the button bellow to capture and upload your result</Typography>
        <Box height="1em" />
        {!cameraOpen && <ButtonBase onClick={toggleCameraOpen} className={classes.launchCamera}>
            <CameraAlt />
            <Box width="1em" />
            Launch Camera
        </ButtonBase>}
        {cameraOpen && <CroppableCamera />}
        </Box>)
}