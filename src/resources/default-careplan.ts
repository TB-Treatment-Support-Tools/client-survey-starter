import { CarePlan, Patient } from "fhir/r4";

export default function generateCarePlan(patientId: string, medicationId: string): CarePlan {
    return {
        intent: "plan",
        resourceType: "CarePlan",
        status: "active",
        subject: { reference: `Patient/${patientId}` },
        activity: [{
            detail: {
                productReference: {
                    reference: `Medication/${medicationId}`
                },
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

}