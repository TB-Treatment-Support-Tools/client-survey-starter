import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
import PhotoTest from '../components/PhotoTest'
import ProviderRoutes from './ProviderRoutes'
import PatientHome from '../pages/Patient/Home'
import Progress from '../pages/Progress'

const AppRouter = () => {
  const { initialized } = useKeycloak();
  const [userResource, setUserResource] = useState<Patient | Practitioner | null>(null);

  const isPatient = keycloak?.hasRealmRole('patient')
  const isProvider = keycloak?.hasRealmRole('provider')

  const getCurrentUser = async () => {
    const user = await Fhir.getUserInformation();
    setUserResource(user);
  }

  useEffect(() => {
    getCurrentUser();
  }, [initialized])

  return (
    <Router>
      <UserContext.Provider value={{ user: userResource }}>
        <div className={styles.container}>
          {isProvider && <TopBar />}
          <div className={styles.main}>
            <Route path="/photo-test" component={PhotoTest} />
            <Route path="/progress" component={Progress} />
            <PrivateRoute path="/home" component={PatientHome} />
            <Route path="/chat" component={Chat} />
            <Route path="/survey" component={PatientHome} />
            <Route path="/login" component={Login} />
            {isProvider && <ProviderRoutes />}
          </div>
          {isPatient && <BottomNavigation />}
        </div>
      </UserContext.Provider>
    </Router>
  )
}

export default AppRouter;