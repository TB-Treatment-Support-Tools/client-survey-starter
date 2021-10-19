import { useEffect, useState } from "react"
import Fhir from "../api"

interface Props {
    path: string
}
export default function AuthImage({ path }: Props) {
    const [photo, setPhoto] = useState<any>(null);
    useEffect(() => {
        Fhir.getPhoto(path).then(res => {
             setPhoto(window.URL.createObjectURL(res));

        })
    }, [path])
    return (<>
        {photo ? <img style={{width: "90%"}} src={photo} /> : <p>Loading photo. path: {path} </p>}
    </>)
    

}