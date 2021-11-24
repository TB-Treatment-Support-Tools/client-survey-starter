import { fhirFetch } from "./base";
import { CarePlan, CodeableConcept, Condition } from "fhir/r4";

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


// const conditionID = 31;

//Condition will need to be created first
// const prepCarePlan: CarePlan = {
//     resourceType: "CarePlan",
//     status: "active",
//     intent: "plan",
//     subject: {
//         reference: "Patient/1"
//     },
//     title: "Monitor PrEP Adherence",
//     addresses: [{ reference: `Condition/${conditionID}` }]

// }


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

export {addCondition}
