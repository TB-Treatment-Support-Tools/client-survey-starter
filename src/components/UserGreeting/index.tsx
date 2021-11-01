import { useContext } from "react";
import UserContext from "../../context/user-context";
import { getFhirFullname } from "../../utility/fhir-utilities";


export default function UserGreeting() {
    const { user } = useContext(UserContext)
    const fullName = user?.name ? getFhirFullname(user.name) : "No name found"


    return (<div>
        <p>Patient Name: {fullName}</p>
    </div>)
}