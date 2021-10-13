import keycloak from "./keycloak";

export default class Fhir{

    requestHeaders : HeadersInit
    baseURL = "http://localhost:8100/fhir"

    constructor() {
        this.requestHeaders = new Headers();
        this.requestHeaders.set('Authorization', `Bearer ${keycloak.token}`);
        this.requestHeaders.set('Content-Type', "application/fhir+json")
    }

    fetchPatients(){
        return this.baseFetch('Patient')
    }

    private baseFetch(resource : string) : Promise<any> {
        return fetch(`${this.baseURL}/${resource}`, {headers: this.requestHeaders}).then(res=>{return res.json()})
    }
}