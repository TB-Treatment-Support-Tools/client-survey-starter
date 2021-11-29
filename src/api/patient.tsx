import { fhirFetch } from "./base";
import { CarePlan, CodeableConcept, Condition, Questionnaire } from "fhir/r4";

const riskForHIVCodeableConcept: CodeableConcept = {
    coding: [{
        system: "http://snomed.info/sct",
        display: "Human immunodeficiency virus risk lifestyle",
        code: "266974005"
    }],
}

const positiveHIVCodeableConcept: CodeableConcept = {
    coding: [{
        system: "http://snomed.info/sct",
        display: "Human immunodeficiency virus infection",
        code: "86406008"
    }],
}

const addCondition = (patientID: string, hivPositive : boolean) => {
    const condition: Condition = {
        resourceType: "Condition",
        code: hivPositive ? positiveHIVCodeableConcept : riskForHIVCodeableConcept,
        subject: {
            reference: `Patient/${patientID}`
        }
    }

    fhirFetch(`Condition`, { method: "POST", body: JSON.stringify(condition) })
}

const getQuestionnaire = async () => {
    return fhirFetch('Questionnaire/52').then(json => { 
        if(json.resourceType === "Questionnaire"){
             return json as Questionnaire 
        }else{
            return null;
        }
       
    })
}

export {addCondition, getQuestionnaire}
