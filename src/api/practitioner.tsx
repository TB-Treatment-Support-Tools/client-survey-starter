import { fhirFetch } from "./base";
import { Bundle, CarePlan, Patient, PractitionerRole } from "fhir/r4";

export const getPractitionerRoles = (id: string) => {
    return fhirFetch(`PractitionerRole?practitioner=${id}`).then((json: Bundle) => {
        return json.entry?.map(each => { return each.resource as PractitionerRole })
    })
}

export const getConditions = (): Promise<any> => {
    return fhirFetch(`Condition?patient.organization=102`)
}

export const addCarePlan = (patient: Patient) => {

    const carePlan: CarePlan = {
        intent: "plan",
        resourceType: "CarePlan",
        status: "active",
        subject: { reference: `Patient/${patient.id}` },
        activity: [{
            detail: {
                status: "in-progress",
                description: "Take medication",
                kind: "MedicationRequest",
                dailyAmount: {
                    value: 1,
                    unit: "pill"
                },
                scheduledTiming: {
                    repeat: {
                        timeOfDay: ["12:00"]
                    }
                }
            }
        },
        {
            detail: {
                description: "Complete survey",
                status: "scheduled",
                instantiatesCanonical: ["Questionnaire/52"],
                scheduledTiming: {
                    repeat: {
                        frequency: 1,
                        period: 1,
                        periodUnit: "d"
                    }
                }
            }
        }
        ]

    }

    return fhirFetch(`CarePlan`,{method: "POST", body: JSON.stringify(carePlan)})
}

