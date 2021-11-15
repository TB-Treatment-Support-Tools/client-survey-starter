import { HumanName } from "fhir/r4";

export function getFhirFullname(names : HumanName[] | undefined){
    const firstResult = (names && names.length > 0) ? names[0] : undefined
    if(firstResult && firstResult.given && firstResult.given[0] && firstResult.family){
        return `${firstResult.given[0]} ${firstResult.family}`
    }
    return "No name found"
}

export function getFhirFirstName(names : HumanName[] | undefined){
    const firstResult = (names && names.length > 0) ? names[0] : undefined
    if(firstResult && firstResult.given && firstResult.given[0] && firstResult.family){
        return firstResult.given[0]
    }
    return "No name found"
}