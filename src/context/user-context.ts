import { CarePlan, Patient, Practitioner } from "fhir/r4";
import { createContext } from "react";

interface Context {
    user: Patient | Practitioner | null,
    organizationID: string | null,
    carePlan: CarePlan | null
}

const UserContext = createContext<Context>({ user: null, organizationID: null, carePlan: null });

export default UserContext;