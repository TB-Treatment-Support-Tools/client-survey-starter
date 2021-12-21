import { useContext } from "react";
import MedAdminCalendar from "../../components/MedAdminCalendar";
import UserContext from "../../context/user-context";

export default function Progress() {

    const {medicationDates} = useContext(UserContext);

    return (<div>
        {medicationDates && <MedAdminCalendar valueMap={medicationDates}  />}
    </div>)
}