
import ViewPatients from '../pages/ViewPatients'
import PatientProfile from '../pages/PatientProfile'
import { ProviderRoute } from './utils'
import Medications from '../pages/Medication'

export default function ProviderRoutes() {

    return (
        <>
            <ProviderRoute path="/patients" component={ViewPatients} />
            <ProviderRoute path="/patient/*" component={PatientProfile} />
            <ProviderRoute path="/medications" component={Medications} />
        </>
    )

}