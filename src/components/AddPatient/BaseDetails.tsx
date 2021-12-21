import { ChangeEvent, useContext, useState } from "react";
import Fhir from "../../api";
import Element from "../FormElement";
import UserContext from "../../context/user-context";
import CreatePatientInputs from "../../types/create-patient";
import { FormElement, FormElementTypes } from "../../types/form-element";
import OptionButton from "../Buttons/OptionButton";
import { Box } from "@mui/system";
import NextButton from "./NextButton"

const elements: FormElement[] = [
    { id: "givenName", display: "First Name", type: FormElementTypes.String },
    { id: "familyName", display: "Last Name", type: FormElementTypes.String },
    { id: "username", display: "Username", type: FormElementTypes.String }
]

interface Props{
    goToNext? : () => void
}

export default function BaseDetails({goToNext} : Props) {

    const {organizationID} = useContext(UserContext);

    const [details, setDetails] = useState<CreatePatientInputs>({ givenName: "", familyName: "", username: "", organizationId: organizationID || "" })

    const handleSubmit = (event: React.FormEvent) => {
        Fhir.createPatient(details);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newDetails: any = {}
        newDetails[event.target.id] = event.target.value
        setDetails({ ...details, ...newDetails });
    }

    const handleNext = () => {
        if(goToNext){
            goToNext();
        }
    }

    return (<form onSubmit={(e) => { e.preventDefault() }}>
        <Box padding="1em 0">
        {elements.map(element => <Element key={element.id} onChange={handleChange} value={details[element.id]} {...element} />)}
        </Box>
        {/* <OptionButton onClick={handleSubmit}>Add Patient </OptionButton> */}
        <NextButton onClick={handleNext} />
    </form>)
}