import { fhirFetch, fetchFhirResource, requestFhirBundle } from "./base";
import { Bundle, CarePlan, Condition, Medication, MedicationRequest, Patient, PractitionerRole } from "fhir/r4";
import { createIngredient } from "../utility/fhir-utilities";

export const getPractitionerRoles = (id: string) => {
    return fhirFetch(`PractitionerRole?practitioner=${id}`).then((json: Bundle) => {
        return json.entry?.map(each => { return each.resource as PractitionerRole })
    })
}

export const getConditions = (): Promise<any> => {
    return fhirFetch(`Condition?patient.organization=102`)
}

export const addCarePlan = (carePlan: CarePlan) => {
    return fhirFetch(`CarePlan`, { method: "POST", body: JSON.stringify(carePlan) })
}

export const getMedications = () => {
    return fhirFetch(`Medication`).then((json : Bundle) => { return json.entry?.map( each => each.resource) as Medication[]} )
}

export const addTLD = () => {
    const medication: Medication = {
        code: {
            text: "TDF 300 mg, 3TC 300 mg, and DTG 50 mg",
        },
        resourceType: "Medication",
        ingredient: [
            createIngredient(30,"422091007","Tenofovir"),
            createIngredient(30,"386897000"," Lamivudine"),
            createIngredient(30,"713464000","Dolutegravir")
        ]
    }
}

export const addMedicaiton = () => {
    const medication: Medication = {
        code: {
            coding: [{
                system: "http://snomed.info/sct",
                id: "3738612019",
                display: "Bictegravir and emtricitabine and tenofovir only product in oral dose form"
            }],
            text: "Bictegravir and emtricitabine and tenofovir only product in oral dose form",
        },
        resourceType: "Medication",
        ingredient: [
            {
                itemCodeableConcept: {
                    coding: [{
                        system: "http://snomed.info/sct",
                        id: "715220007",
                        display: "Tenofovir alafenamide"
                    }]
                },
                strength: {
                    numerator: {
                        value: 25,
                        system: "http://unitsofmeasure.org",
                        unit: "mg"
                    }
                }
            },
            {
                itemCodeableConcept: {
                    coding: [{
                        system: "http://snomed.info/sct",
                        id: "404856006",
                        display: "Emtricitabine",
                    }]
                },
                strength: {
                    numerator: {
                        value: 200,
                        system: "http://unitsofmeasure.org",
                        unit: "mg"
                    }
                }
            },
            {
                itemCodeableConcept: {
                    coding: [{
                        system: "http://snomed.info/sct",
                        id: "772193003",
                        display: "Bictegravir"
                    }]
                },
                strength: {
                    numerator: {
                        value: 50,
                        system: "http://unitsofmeasure.org",
                        unit: "mg"
                    }
                }
            }]
    }

}

export function addPatient(details : Patient){
    return fetchFhirResource<Patient>('/Patient',{method:"POST",body: JSON.stringify(details)})
}

export function addCondition(condition: Condition){
    return fetchFhirResource('/Condition',{method: "POST",body: JSON.stringify(condition)})
}

export function deletePatient(id: string){
    return fhirFetch(`/Patient/${id}`,{method: "DELETE"})
}

export function getPatients(organizationId :string){
    return requestFhirBundle<Patient>(`Patient?organization=${organizationId}`)
}
