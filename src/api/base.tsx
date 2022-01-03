import keycloak from "../keycloak";
import { BundleEntry } from "fhir/r4";
import { Type } from "typescript";

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
    return fhirFetch(resource).then( json => { 
        if(json.entry){
             return json.entry.map((each : BundleEntry) => each.resource) as Type[]
        }
        return []
       
    })
}

async function fetchFhirResource<Type>(resource: string, options?: RequestInit): Promise<Type>{
    return fetch(`${baseURL}/fhir/${resource}`, { headers: { 'Content-Type': "application/fhir+json", 'Authorization': `Bearer ${keycloak.token}` }, ...options })
    .then(res => { return res.json()}).then( json => json as Type)
}

export {fhirFetch,fileFetch,requestFhirBundle,fetchFhirResource}

