import { fhirFetch } from "./base";
import { Bundle, PractitionerRole } from "fhir/r4";

export const getPractitionerRoles = (id : string) => {
    return fhirFetch(`PractitionerRole?practitioner=${id}`).then( (json : Bundle) => {
        return json.entry?.map( each => { return each.resource as PractitionerRole})
    })
}

export const getConditions = () : Promise<any> => {
    return fhirFetch(`Condition?patient.organization=102`)
}

