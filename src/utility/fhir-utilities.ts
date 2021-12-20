import { CarePlan, HumanName, Reference } from "fhir/r4";

export function getFhirFullname(names: HumanName[] | undefined) {
    const firstResult = (names && names.length > 0) ? names[0] : undefined
    if (firstResult && firstResult.given && firstResult.given[0] && firstResult.family) {
        return `${firstResult.given[0]} ${firstResult.family}`
    }
    return "No name found"
}

export function getFhirFirstName(names: HumanName[] | undefined) {
    const firstResult = (names && names.length > 0) ? names[0] : undefined
    if (firstResult && firstResult.given && firstResult.given[0] && firstResult.family) {
        return firstResult.given[0]
    }
    return "No name found"
}

// export function getIdFromReference(reference: string | undefined) {
//     if (!reference) {
//         return null
//     }
//     return reference.split("/")[1] || null;
// }

export function extractTreatmentTypeFromSnomedCode(code : string | undefined){
    if(code === "266974005") return "ART"
    if(code === "86406008") return "PrEP"
    return "Unsupported Diagnosis"
}

export function createIngredient(mg: number, ctCode : string, display: string){
    return( {
                itemCodeableConcept: {
                    coding: [{
                        system: "http://snomed.info/sct",
                        id: ctCode,
                        display: display
                    }]
                },
                strength: {
                    numerator: {
                        value: mg,
                        system: "http://unitsofmeasure.org",
                        unit: "mg"
                    }
                }
            }
    )
}

export const getMedicationIdFromCarePlan = (carePlan : CarePlan | null) : string => {

    if(carePlan && carePlan.activity){
        for(let activity of carePlan.activity){
            if(activity.detail?.productReference){
                const medicationID = getIdFromReference(activity.detail.productReference)
                return medicationID
            }
        }
    }
    throw Error("No medication reference found in this careplan")
}

export const getIdFromReference = (reference : Reference) : string => {
    if(reference.reference){
        return reference.reference?.split("/")[1]
    }
    throw new Error("Reference not valid")
}
