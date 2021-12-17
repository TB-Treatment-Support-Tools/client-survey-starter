import { Medication } from "fhir/r4";

interface Props{
    medication: Medication
}

export default function MedicationResult({medication}: Props){

    if(medication.code && medication.code.text){
        return(<li>{medication.code.text}</li>)
    }else{
        return(<li>No display name</li>)
    }
}