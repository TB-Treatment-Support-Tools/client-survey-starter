import { CameraAlt } from "@mui/icons-material";
import { ButtonBase, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import OptionButton from "../../../components/Buttons/OptionButton";
import useToggle from "../../../hooks/useToggle";
import CroppableCamera from "../../../image-capture/CroppableCamera";
import ImageAnalysis from "../../../image-capture/ImageAnalysis";
import classes from './styles.module.scss'

interface TestCapture {
    fullImage: string,
    croppedImage: string
}

export default function TestSubmission() {

    const [cameraOpen, toggleCameraOpen] = useToggle(false);
    const [images, setImages] = useState<TestCapture | null>(null);

    const handleSubmission = (tests: TestCapture) => {
        setImages(tests);
        toggleCameraOpen(false)
    }

    return (<Box padding="1em">
        <Typography className={classes.title} variant="h2">Test Strip Submission </Typography>
        <Box height="1em" />
        <Box height="1em" />
        {(!cameraOpen && !images) && <>
            <Typography variant="body1">Please complete a test strip, then press the button bellow to capture and upload your result</Typography>
            <Box height=".5em" />
            <ButtonBase onClick={toggleCameraOpen} className={classes.launchCamera}>
                <CameraAlt />
                <Box width="1em" />
                Launch Camera
            </ButtonBase>
        </>}
        {images && <>
        <OptionButton onClick={()=>{setImages(null)}}>Back</OptionButton>
        <ImageAnalysis imageSrc={images.croppedImage} />
        </>}
        {cameraOpen && <CroppableCamera closeCamera={()=>{toggleCameraOpen(false)}} setImages={handleSubmission} />}
    </Box>)
}