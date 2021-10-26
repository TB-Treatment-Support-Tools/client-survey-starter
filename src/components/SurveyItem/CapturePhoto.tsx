import { useEffect, useState } from 'react'
import Fhir from '../../api';
import Camera from '../../image-capture/Camera'
import AuthImage from '../AuthImage';

interface Props{
    code : string,
    handleResponse(value: any, code: string): void
}

export default function CapturePhoto({code,handleResponse} : Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [photo, setPhoto] = useState<string>('');
    const [success,setSuccess] = useState('');

    const toggle = () => { setOpen(!open) }

    const handlePhoto = (photo: any, blob: Blob) => {
        setPhoto(photo);
        setBlob(blob);
    }

    const handleUpload = () => {
        if (blob) {
            Fhir.uploadPhoto(blob).then( res => {
                setSuccess(res.path);
                handleResponse(res.path, code);
            })
        }
    }

    return (
        <div>
            <button onClick={toggle}>Open Camera</button>
            <div style={{ width: "100%" }}>
                {open && <Camera handleExit={toggle} returnPhoto={handlePhoto} />}
                {photo && <img style={{ width: "90%", margin: "auto", display: "block" }} src={photo} />}
                {photo && <button onClick={handleUpload}>Test Upload Capability</button>}
                From Server:
                {success && <AuthImage path={success} />}
            </div>
        </div>
    )
}