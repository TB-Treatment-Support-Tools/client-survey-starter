import { Patient, Practitioner } from "fhir/r4";
import { createContext } from "react";

interface Context {
    user: Patient | Practitioner | null
}

const UserContext = createContext<Context>({ user: null });

export default UserContext;