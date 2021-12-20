import { Medication } from "fhir/r4";

interface Props{
    medication: Medication
}

export default function MedicationResult({medication}: Props){

    if(medication.code && medication.code.text){
        return(<option>{medication.code.text}</option>)
    }else{
        return(<option>No display name</option>)
    }
}