import { fhirFetch } from "./base";

const getConditions = () : Promise<any> => {
    return fhirFetch(`Condition`)
}

export {getConditions}
