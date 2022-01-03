import { ChangeEvent, useContext, useState } from "react"
import Fhir from "../../api"
import Element from "../FormElement"
import UserContext from "../../context/user-context"
import CreatePatientInputs from "../../types/create-patient"
import { FormElement, FormElementTypes } from "../../types/form-element"
import OptionButton from "../Buttons/OptionButton"
import { Box } from "@mui/system"
import NextButton from "./NextButton"
import { Patient } from "fhir/r4"
import { createFhirName } from "../../utility/fhir-utilities"
import { addPatient } from "../../api/practitioner"
import Loading from '../Loading'
import AddPatientFlowProps from "./AddPatientFlowProps"

type InputTypes = {
    [key: string]: string | number,
    givenName: string,
    familyName: string,
}

const elements: FormElement[] = [
    { id: "givenName", display: "First Name", type: FormElementTypes.String },
    { id: "familyName", display: "Last Name", type: FormElementTypes.String }
]

export default function BaseDetails({ goToNext, setInformation }: AddPatientFlowProps) {

    const { organizationID } = useContext(UserContext)
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<InputTypes>({ givenName: "", familyName: "", username: "", organizationId: organizationID || "" })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newDetails: any = {}
        newDetails[event.target.id] = event.target.value
        setDetails({ ...details, ...newDetails })
    }

    const enableButton = (details.givenName !== "" && details.familyName !== "")

    const handleNext = async () => {

        if (setInformation && goToNext) {
            const defaultPatient: Patient = {
                resourceType: "Patient",
                managingOrganization: { reference: `Organization/${organizationID}` },
                name: [createFhirName(details.givenName, details.familyName)]
            }

            setLoading(true);
            let newPatient = await addPatient(defaultPatient)
            setInformation(newPatient)
            setLoading(false);
            goToNext();
        }

    }

    return (<form onSubmit={(e) => { e.preventDefault() }}>
        <Box padding="1em 0">
            {loading ?
                <Loading />
                :
                <>
                    {elements.map(element => <Element key={element.id} onChange={handleChange} value={details[element.id]} {...element} />)}
                </>}
        </Box>
        <NextButton disabled={!enableButton} onClick={handleNext} />
    </form>)
}