import { fhirFetch, requestFhirBundle, fetchFhirResource } from "./base";
import { CarePlan, Condition, Questionnaire, QuestionnaireResponse, BundleEntry, Patient, MedicationAdministration, Medication } from "fhir/r4";

export function getMedication(medicaitonId : string){
    return fetchFhirResource<Medication>(`Medication/${medicaitonId}`)
}