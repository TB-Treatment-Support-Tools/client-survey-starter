import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import Login from '../pages/Login'

import { PrivateRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'
import styles from './main-content.module.scss'
import Chat from '../pages/Chat'
import keycloak from '../keycloak'

import TopBar from '../components/TopBar'
import Fhir from '../api'
import { Patient, Practitioner } from 'fhir/r4'

import UserContext from '../context/user-context'
import ProviderRoutes from './ProviderRoutes'
import PatientHome from '../pages/Patient/Home'
import Progress from '../pages/Progress'
import { getPractitionerRoles } from '../api/practitioner'
import { UserInformation } from '../types/user-information'
import { getIdFromReference } from '../utility/fhir-utilities'

const AppRouter = () => {
  const { initialized } = useKeycloak();

  const [userResource, setUserResource] = useState<Patient | Practitioner | null>(null);
  const [orgID, setOrgId] = useState<string | null>(null);

  const isPatient = keycloak?.hasRealmRole('patient')
  const isProvider = keycloak?.hasRealmRole('provider')

  const getCurrentUser = async () => {
    const user = await Fhir.getUserInformation();
    setUserResource(user);

    if (user?.resourceType === "Patient" && user.managingOrganization && user.managingOrganization.id) {
      setOrgId(user.managingOrganization.id)
    } else if (user?.resourceType === "Practitioner" && user.id) {
      const roles = await getPractitionerRoles(user.id);
      if (roles && roles.length > 0 && roles[0].organization?.reference) {
        setOrgId(getIdFromReference(roles[0].organization?.reference));
      }
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [initialized])

  return (
    <Router>
      <UserContext.Provider value={{ user: userResource, organizationID: orgID }}>
        <div className={styles.container}>
          {isProvider && <TopBar />}
          <div className={styles.main}>
            <Switch>
            <PrivateRoute path="/progress" component={Progress} />
            <PrivateRoute path="/home" component={PatientHome} />
            <Route path="/chat" component={Chat} />
            <Route path="/survey" component={PatientHome} />
            <Route path="/login" component={Login} />
            <Route path="/">
              <DefaultComponent />
            </Route>
            {isProvider && <ProviderRoutes />}
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