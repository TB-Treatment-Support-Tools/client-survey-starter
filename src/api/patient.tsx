import { fhirFetch, requestFhirBundle, fetchFhirResource } from "./base";
import { CarePlan, Condition, Questionnaire, QuestionnaireResponse, BundleEntry, Patient, MedicationAdministration } from "fhir/r4";
import { DateTime } from "luxon";
import { positiveHIVCodeableConcept, riskForHIVCodeableConcept } from "../resources/conditions";

const addCondition = (patientID: string, hivPositive: boolean) => {
    const condition: Condition = {
        resourceType: "Condition",
        code: hivPositive ? positiveHIVCodeableConcept : riskForHIVCodeableConcept,
        subject: {
            reference: `Patient/${patientID}`
        }
    }

    fhirFetch(`Condition`, { method: "POST", body: JSON.stringify(condition) })
}

const getQuestionnaire = async () => {
    return fhirFetch('Questionnaire/52').then(json => {
        if (json.resourceType === "Questionnaire") {
            return json as Questionnaire
        } else {
            return null;
        }

    })
}

export const getCarePlans = async (patientID: string) => {
    return fhirFetch(`CarePlan?subject:Patient=${patientID}`).then(json => { return json.entry.map((each: BundleEntry) => each.resource) as CarePlan[] })
}

export const uploadQuestionnaireResponse = async (questionnaireResponse: QuestionnaireResponse) => {
    return fhirFetch(`QuestionnaireResponse`, { method: "POST", body: JSON.stringify(questionnaireResponse) })
}

export const addMedicationAdministration = async (patientID: string, medicationID: string, tookMedication: boolean, datetime: string = DateTime.local().toISO()) => {
    const body: MedicationAdministration = {
        resourceType: "MedicationAdministration",
        medicationReference: { reference: `Medication/${medicationID}` },
        subject: { reference: `Patient/${patientID}` },
        status: tookMedication ? "completed" : "not-done",
        effectiveDateTime: datetime
    }
    return fetchFhirResource<MedicationAdministration>(`MedicationAdministration`, { method: "POST", body: JSON.stringify(body) })
}

export async function getMedcationAdministration(patientID: string) {
    const admins = await requestFhirBundle<MedicationAdministration>(`MedicationAdministration?subject:Patient=${patientID}`);
    return admins;
}

export async function seedPatientData(patientID: string, medicationID: string) {
    let dt = DateTime.local()

    for (let i = 15; i > 0; i--) {
        dt = dt.minus({ days: 1 });
        await addMedicationAdministration(patientID, medicationID, true, dt.toISO());
    }
}

export async function getMedAdminsMap(id: string) {
    let medAdmins = await getMedcationAdministration(id)
    let tempMap = new Map<string, boolean>();
    for (let medAdmin of medAdmins) {
        if (medAdmin.effectiveDateTime) {
            const date = DateTime.fromISO(medAdmin.effectiveDateTime).toISODate();
            tempMap.set(date, medAdmin.status === "completed");
        }
    }
    return tempMap;
}

export { addCondition, getQuestionnaire }
