import keycloak from "./keycloak";
import CreatePatientInputs from "./types/create-patient";
import { Patient, Practitioner, QuestionnaireResponse } from "fhir/r4";

export default class Fhir {

    static baseURL = "http://localhost:8100"

    static async getChatToken() {
        return await fetch(`http://localhost:8100/chat-token`, { headers: { 'Authorization': `Bearer ${keycloak.token}` } }).then(res => { return res.json() })
    }

    static async getActiveCarePlans() {
        return await this.fhirFetch(`CarePlan?patient`)
    }

    static async getUserInformation() {
        const isProvider = keycloak?.hasRealmRole('provider')
        const isPatient = keycloak?.hasRealmRole('patient')
        const keycloakID = keycloak?.tokenParsed?.sub;

        if (isProvider) {
            return await this.fhirFetch(`Practitioner?identifier=keycloak|${keycloakID}`).then(json => { return json.entry[0].resource as Practitioner })
        }

        if (isPatient) {
            return await this.fhirFetch(`Patient?identifier=keycloak|${keycloakID}`)
                .then(json => { return json.entry[0].resource as Patient })
        }

        return null

    }

    static async deleteQuestionnaireResponse(responseId: string) {
        await this.fhirFetch(`QuestionnaireResponse/${responseId}`, { method: "DELETE" })
    }

    static async getPatient(patientId: string) {
        return await this.fhirFetch(`Patient/${patientId}`).then(json => { return json as Patient })
    }

    static async getPatientQuestionnaireResponses(patientId: string) {
        return await this.fhirFetch(`QuestionnaireResponse?author=Patient/${patientId}`)
            .then(res => { return res.entry as QuestionnaireResponse[] })
    }

    static getPatients(organizationId: number) {
        return this.fhirFetch(`Patient?organization=${organizationId.toString()}`)
    }

    static getSimpleSurvey(id: string) {
        return this.fhirFetch(`Questionnaire/${id}`)
    }

    static fetchPatients() {
        return this.fhirFetch('Patient')
    }

    static uploadPhoto(photoBlob: Blob) {
        let formData = new FormData();
        formData.append('file', photoBlob)
        return this.fileFetch('files', { method: "POST", body: formData })
    }

    static uploadQuestionnaireResponse(questionnaireResponse: QuestionnaireResponse) {
        return this.fhirFetch(`QuestionnaireResponse`, { method: "POST", body: JSON.stringify(questionnaireResponse) })
    }

    static getPhoto(url: string) {
        return fetch(url, { headers: { 'Authorization': `Bearer ${keycloak.token}` } }).then(res => { return res.blob() })
    }

    static fhirFetch(resource: string, options?: RequestInit): Promise<any> {
        return fetch(`${this.baseURL}/fhir/${resource}`, { headers: { 'Content-Type': "application/fhir+json", 'Authorization': `Bearer ${keycloak.token}` }, ...options }).then(res => { return res.json() })
    }

    static fileFetch(resource: string, options?: RequestInit): Promise<any> {
        return fetch(`${this.baseURL}/${resource}`, { headers: { 'Authorization': `Bearer ${keycloak.token}` }, ...options }).then(res => { return res.json() })
    }

    static testCreatePatient(inputs: CreatePatientInputs): void {

        fetch(`${this.baseURL}/create-patient`, {
            body: JSON.stringify(inputs), method: "POST",
            headers: { 'Authorization': `Bearer ${keycloak.token}`, 'Content-Type': "application/json" }
        })
            .then(res => { return res.json() })
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }

}