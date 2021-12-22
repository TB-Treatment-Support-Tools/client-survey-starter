import AddPatient from "../../types/add-patient";

interface AddPatientFlowProps{
    goToNext?: () => void,
    information?: AddPatient,
    setInformation?: (information : AddPatient) => void
}

export default AddPatientFlowProps;