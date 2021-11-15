import { useContext } from "react";
import UserContext from "../../context/user-context";
import { getFhirFirstName } from "../../utility/fhir-utilities";
import classes from './styles.module.scss'


export default function UserGreeting() {
    const { user } = useContext(UserContext)
    const firstName = user?.name ? getFhirFirstName(user.name) : "No name found"


    return (<div className={classes.greeting}>
        <p>Good Afternoon, <br /> {firstName}</p>
    </div>)
}