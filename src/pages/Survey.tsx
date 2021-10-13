import { useState } from 'react'
import Camera from '../image-capture/Camera'

export default function Survey(){
    const [open,setOpen] = useState<boolean>(false);

    const toggle = () => {setOpen(!open)}
    
    const handlePhoto = (photo : any) => {
        console.log(photo);
    }
    
    return (<div>
        <p>What Symptoms Have you been experienceing?</p>
        <input type="text"></input>
        <br />
        <br />
        <button onClick={toggle}>Open</button>
        <div style={{width: "100%"}}>
                 {open && <Camera  handleExit={toggle} returnPhoto={handlePhoto} />}
        </div>
   
    </div>)
}