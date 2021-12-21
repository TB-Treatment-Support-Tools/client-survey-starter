import { CarePlan, Patient, Practitioner } from "fhir/r4";
import { createContext } from "react";
import DateMap from "../types/date-map";

interface Context {
    user: Patient | Practitioner | null,
    organizationID: string | null,
    carePlan: CarePlan | null,
    medicationDates: DateMap | null
}

const UserContext = createContext<Context>({ user: null, organizationID: null, carePlan: null, medicationDates: null });

export default UserContext;