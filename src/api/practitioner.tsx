import { fhirFetch } from "./base";
import { Bundle, CarePlan, Medication, MedicationRequest, Patient, PractitionerRole } from "fhir/r4";

export const getPractitionerRoles = (id: string) => {
    return fhirFetch(`PractitionerRole?practitioner=${id}`).then((json: Bundle) => {
        return json.entry?.map(each => { return each.resource as PractitionerRole })
    })
}

export const getConditions = (): Promise<any> => {
    return fhirFetch(`Condition?patient.organization=102`)
}

export const addCarePlan = (patient: Patient) => {

    // const medicationRequest: MedicationRequest = {
    //     resourceType: "MedicationRequest",
    //     intent: "plan",
    //     subject: { reference: `Patient/${patient.id}` },
    //     medicationReference: "Medication/"


    // }

    const carePlan: CarePlan = {
        intent: "plan",
        resourceType: "CarePlan",
        status: "active",
        subject: { reference: `Patient/${patient.id}` },
        activity: [{
            reference: {

                reference: `MedicationRequest/${10}`
            },
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

    return fhirFetch(`CarePlan`, { method: "POST", body: JSON.stringify(carePlan) })
}

export const getMedications = () => {
    return fhirFetch(`Medication`).then((json : Bundle) => { return json.entry?.map( each => each.resource) as Medication[]} )
}

export const addMedicaiton = () => {
    const medication: Medication = {
        code: {
            coding: [{
                system: "http://snomed.info/sct",
                id: "3738612019"
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

    console.log(JSON.stringify(medication))
}
