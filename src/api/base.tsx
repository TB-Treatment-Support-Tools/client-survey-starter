import keycloak from "../keycloak";

const baseURL = "http://localhost:8100";

const fhirFetch = (resource: string, options?: RequestInit): Promise<any> => {
    return fetch(`${baseURL}/fhir/${resource}`, { headers: { 'Content-Type': "application/fhir+json", 'Authorization': `Bearer ${keycloak.token}` }, ...options })
    .then(res => { return res.json() })
}

const fileFetch = (resource: string, options?: RequestInit): Promise<any> => {
    return fetch(`${baseURL}/${resource}`, { headers: { 'Authorization': `Bearer ${keycloak.token}` }, ...options })
    .then(res => { return res.json() })
}

export {fhirFetch,fileFetch}

