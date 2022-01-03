import { Patient } from "fhir/r4";
import AddPatient from "../../types/add-patient";

interface AddPatientFlowProps{
    goToNext?: () => void,
    information?: Patient,
    setInformation?: (information : Patient) => void
}

export default AddPatientFlowProps;