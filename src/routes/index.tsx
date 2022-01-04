import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DateMap from '../types/date-map'

import { useKeycloak } from '@react-keycloak/web'

import Login from '../pages/Login'

import { PrivateRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'
import styles from './main-content.module.scss'
import Chat from '../pages/Chat'
import keycloak from '../keycloak'

import TopBar from '../components/TopBar'
import Fhir from '../api'
import { CarePlan, Patient, Practitioner } from 'fhir/r4'

import UserContext from '../context/user-context'
import ProviderRoutes from './ProviderRoutes'
import PatientHome from '../pages/Patient/Home'
import Progress from '../pages/Progress'
import { getPractitionerRoles } from '../api/practitioner'
import { getIdFromReference } from '../utility/fhir-utilities'
import SubmitTest from '../pages/Patient/SubmitTest'
import { getCarePlans, getMedAdminsMap, getMedcationAdministration } from '../api/patient'
import { DateTime } from 'luxon'

const AppRouter = () => {
  const { initialized } = useKeycloak();

  const [userResource, setUserResource] = useState<Patient | Practitioner | null>(null);
  const [orgID, setOrgId] = useState<string | null>(null);
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null);
  const [map, setMap] = useState<DateMap>(new Map<string, boolean>());

  const isPatient = keycloak?.hasRealmRole('patient')
  const isProvider = keycloak?.hasRealmRole('provider')

  const getCarePlanDetails = async (user: Patient) => {
    if (user.id) {
      const carePlans = await getCarePlans(user.id);
      if (carePlans.length > 0) {
        setCarePlan(carePlans[0])
      }
    }
  }

  const getCurrentUser = async () => {
    const user = await Fhir.getUserInformation();
    setUserResource(user);
    if (user?.resourceType === "Patient" && user.managingOrganization && user.id) {
      setOrgId(getIdFromReference(user.managingOrganization))
      getCarePlanDetails(user);
      getCalendarData(user.id);
    } else if (user?.resourceType === "Practitioner" && user.id) {
      const roles = await getPractitionerRoles(user.id);
      if (roles && roles.length > 0 && roles[0].organization?.reference) {
        setOrgId(getIdFromReference(roles[0].organization));
      }
    }
  }

  const getCalendarData = async (id: string) => {
    let adminMap = await getMedAdminsMap(id)
    setMap(adminMap)
  }

  useEffect(() => {
    getCurrentUser();
  }, [initialized])

  return (
    <Router>
      <UserContext.Provider value={{ user: userResource, organizationID: orgID, carePlan: carePlan, medicationDates: map }}>
        <div className={styles.container}>
          {isProvider && <TopBar />}
          <div className={styles.main}>
            <Switch>
              {isProvider && <ProviderRoutes />}
              <PrivateRoute path="/progress" component={Progress} />
              <PrivateRoute path="/home" component={PatientHome} />
              <Route path="/chat" component={Chat} />
              <Route path="/survey" component={PatientHome} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/submit-photo" component={SubmitTest} />
              <Route path="/">
                <DefaultComponent />
              </Route>
            </Switch>
          </div>
          {isPatient && <BottomNavigation />}
        </div>
      </UserContext.Provider>
    </Router>
  )
}

const DefaultComponent = () => <div>Page Not Found <Login /></div>

export default AppRouter;