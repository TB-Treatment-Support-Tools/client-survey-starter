import keycloak from "../keycloak";
import { BundleEntry } from "fhir/r4";

const baseURL = "http://localhost:8100";

const fhirFetch = (resource: string, options?: RequestInit): Promise<any> => {
    return fetch(`${baseURL}/fhir/${resource}`, { headers: { 'Content-Type': "application/fhir+json", 'Authorization': `Bearer ${keycloak.token}` }, ...options })
    .then(res => { return res.json() })
}

const fileFetch = (resource: string, options?: RequestInit): Promise<any> => {
    return fetch(`${baseURL}/${resource}`, { headers: { 'Authorization': `Bearer ${keycloak.token}` }, ...options })
    .then(res => { return res.json() })
}

async function requestFhirBundle<Type>(resource: string, options?: RequestInit) : Promise<Type[]>{
    return fhirFetch(resource).then( json => { return json.entry.map((each : BundleEntry) => each.resource) as Type[]})
}

export {fhirFetch,fileFetch,requestFhirBundle}

