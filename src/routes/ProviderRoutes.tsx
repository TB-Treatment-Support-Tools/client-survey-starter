
import AddPatient from '../pages/AddPatient'
import ViewPatients from '../pages/ViewPatients'
import PatientProfile from '../pages/PatientProfile'
import { PrivateRoute, ProviderRoute } from './utils'

export default function ProviderRoutes() {

    return (
        <>
            <ProviderRoute path="/add-patient" component={AddPatient} />
            <ProviderRoute path="/patients" component={ViewPatients} />
            <ProviderRoute path="/patient/*" component={PatientProfile} />
        </>
    )

}