import React, { Component } from 'react';
import Webcam from './WebCam'
import { Close, CameraAlt } from '@mui/icons-material/';
import IconButton from '@mui/material/IconButton'
import Fab from '@mui/material/Fab'
import { container, exitButtons, cameraButtons, webcamContainer, video } from './styles.module.scss'
import { fixRotation } from 'fix-image-rotation'

export default class Camera extends Component {
    constructor() {
        super();
        this.webcam = null;
        this.state = {
            capturedImage: null,
            captured: false,
            uploading: false,
            capturing: false,
            blob: null

        }
    }

    myRotationFunction = async function (ArrayOfFilesToBeRotated) {
        return ArrayOfFilesToBeRotated
        let blobOfArray = await fixRotation.fixRotation(ArrayOfFilesToBeRotated)
        return blobOfArray

    }

    captureImage = async () => {

        let image = this.webcam.takePhoto();
        let captureHeight;

        image.getPhotoCapabilities().then(settings => {
            if (settings) {
                //Makesure Adjusted size is in range of min-max
                captureHeight = settings.imageHeight.max / 2;

                if (captureHeight < settings.imageHeight.min) {
                    captureHeight = settings.imageHeight.max;
                }
            }
            image.takePhoto({ imageHeight: captureHeight }).then(blob => {


                    let reader = new FileReader();
                    reader.readAsDataURL([blob][0]); // converts the blob to base64 and calls onload
                    reader.onload = () => {

                        this.setState({
                            captured: true,
                            capturedImage: reader.result,
                            blob: blob,
                            capturing: false
                        })

                        this.handleUsePhoto()
                    };

               
            })
                .catch(error => console.error('takePhoto() error:', error));
        });
    }

    discardImage = () => {
        this.setState({
            captured: false,
            capturedImage: null
        })
    }

    uploadImage = () => {

    }

    componentDidMount() {
        // initialize the camera
        this.canvasElement = document.createElement('canvas');
        this.webcam = new Webcam(
            document.getElementById('webcam'),
            this.canvasElement
        );
        this.webcam.setup().catch(() => {
            alert('Error getting access to your camera');
        });
    }

    componentWillUnmount() {
        this.webcam.endVideo();
    }

    handleUsePhoto = () => {
        this.props.returnPhoto(this.state.capturedImage,this.state.blob);
        this.props.handleExit();
    }

    render() {

        const imageDisplay = this.state.capturedImage ?
            <img src={this.state.capturedImage} alt="captured" />
            :
            <span />;

        const buttons = this.state.captured ?
            <>

            </>
            :
            <div className={cameraButtons}>
                <Fab onClick={this.captureImage}><CameraAlt /></Fab>
            </div>

        const exit = (<div className={exitButtons}><IconButton onClick={this.props.handleExit}><Close /></IconButton></div>)


        return (
            <div className={container} >
                {exit}
                <div className={webcamContainer}>
                    <video width="350px" autoPlay playsInline muted id="webcam" className={`${video} ${this.state.captured ? "hidden" : ""}`} />
                </div>

                <br />
                <div className={"imageCanvas " + this.state.captured ? "" : "hidden"}>
                    {imageDisplay}
                </div>

                {buttons}
            </div>
        )
    }
}