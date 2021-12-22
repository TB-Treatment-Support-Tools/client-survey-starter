import { CodeableConcept } from "fhir/r4"

export const riskForHIVCodeableConcept: CodeableConcept = {
    coding: [{
        system: "http://snomed.info/sct",
        display: "Human immunodeficiency virus risk lifestyle",
        code: "266974005"
    }]
}

export const positiveHIVCodeableConcept: CodeableConcept = {
    coding: [{
        system: "http://snomed.info/sct",
        display: "Human immunodeficiency virus infection",
        code: "86406008"
    }]
}
