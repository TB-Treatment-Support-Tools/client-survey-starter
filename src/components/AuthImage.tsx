import { useEffect, useState } from "react"
import Fhir from "../api"

interface Props {
    path: string,
    className?: string | undefined
}
export default function AuthImage({ path, className }: Props) {
    const [photo, setPhoto] = useState<any>(null);

    useEffect(() => {
        Fhir.getPhoto(path).then(res => {
             setPhoto(window.URL.createObjectURL(res));

        })
    }, [path])
    return (<>
        {photo ? <img className={className} src={photo} /> : <p>Loading photo. path: {path} </p>}
    </>)
    

}