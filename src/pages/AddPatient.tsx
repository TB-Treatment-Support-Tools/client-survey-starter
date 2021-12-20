import { FormElement, FormElementTypes } from "../types/form-element"
import Element from "../components/FormElement"
import { MedicationStatement, Organization, Patient, Practitioner, PractitionerRole, PractitionerRoleNotAvailable } from "fhir/r4";
import Fhir from "../api";
import { ChangeEvent, useState } from "react";
import CreatePatientInputs from "../types/create-patient";
import MedicationList from "../components/MedicationList";
import { addTLD } from "../api/practitioner";

const generatePatient = (): Patient => {
    const patient: Patient = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: ["Kyle", "Joseph"],
            family: "Goodwin",

        }],
        telecom: [{ system: "phone", use: "mobile", value: "123456789" }],
        gender: "male",
        birthDate: "1997-10-20",
        managingOrganization: {
            reference: "Organization/1"
        }
    }
    return patient;
}

const medStatement: MedicationStatement = {
    resourceType: "MedicationStatement",
    status: "active",
    subject: { type: "Patient", reference: "Patient/1" },
    medicationCodeableConcept: {}

}

const demoOrganization: Organization = {
    resourceType: "Organization",
    name: "Local Hospital"
}

const demoPractitioner: Practitioner = {
    resourceType: "Practitioner",
    identifier: [{ system: "keycloak", value: "586bdd60-3ff9-4db8-a675-0a807bb40754" }],
    active: true,
    name: [{
        use: "official",
        given: ["Testy"],
        family: "Testson",

    }],
    telecom: [{ system: "email", value: "test@gmail.com" }]
}

const elements: FormElement[] = [
    { id: "givenName", display: "First Name", type: FormElementTypes.String },
    { id: "familyName", display: "Last Name", type: FormElementTypes.String },
    { id: "username", display: "Username", type: FormElementTypes.String }
]

const demoRole: PractitionerRole = {
    resourceType: "PractitionerRole",
    active: true,
    organization: {
        reference: "Organization/102"
    }

}

export default function AddPatient() {
    //TODO: Add dynamic organization ID
    const [details, setDetails] = useState<CreatePatientInputs>({ givenName: "", familyName: "", username: "", medication: "truvada", organizationId: 102 })

    const handleSubmit = (event: React.FormEvent) => {
        Fhir.createPatient(details);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newDetails: any = {}
        newDetails[event.target.id] = event.target.value
        setDetails({ ...details, ...newDetails });
    }

    return (<div>
        <h1>Add a patient</h1>
        <form onSubmit={(e) => { e.preventDefault() }}>
            {elements.map(element => <Element key={element.id} onChange={handleChange} value={details[element.id]} {...element} />)}
            {/* <select id="medication" onChange={handleChange} value={details.medication}>
                <option value="truvada" >Truvada</option>
                <option value="descovy">Descovy</option>
            </select> */}
            <div>
                <p>Possible Medications</p>
                <MedicationList />
            </div>
            <br />
            <p>Organization {details.organizationId} </p>
            <button onClick={handleSubmit}>Add Patient</button>
            <button onClick={addTLD}>Tld</button>
        </form>
    </div>)
}
