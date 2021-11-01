import { useHistory } from "react-router";

export default function PatientProfile(){
    const {location} = useHistory();

    const splitPath= location.pathname.split("/")
    const patientId = splitPath[splitPath.length - 1]

    return(<div>
        <p>{patientId}</p>
    </div>)
}