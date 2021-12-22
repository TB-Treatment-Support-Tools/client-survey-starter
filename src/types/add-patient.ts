import { CarePlan, CodeableConcept, Condition, Patient } from "fhir/r4"

type AddPatient = {
    firstName?: string,
    lastName?: string,
    condition?: CodeableConcept,
    medicationID?: string,

}

export default AddPatient