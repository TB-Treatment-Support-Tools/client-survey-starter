import { Patient, Practitioner } from "fhir/r4";
import { createContext } from "react";

interface Context {
    user: Patient | Practitioner | null,
    organizationID: string | null
}

const UserContext = createContext<Context>({ user: null, organizationID: null });

export default UserContext;