import { CodeableConcept } from "fhir/r4"

type AddPatient = {
    firstName?: string,
    lastName?: string,
    condition?: CodeableConcept,
    medicationID?: string,

}

export default AddPatient