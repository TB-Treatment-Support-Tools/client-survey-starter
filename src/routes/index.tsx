import { useEffect, useState} from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import Survey from '../pages/Survey'

import Login from '../pages/Login'

import { PrivateRoute, ProviderRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'
import styles from './main-content.module.scss'
import Chat from '../pages/Chat'
import keycloak from '../keycloak'
import AddPatient from '../pages/AddPatient'
import ViewPatients from '../pages/ViewPatients'

import TopBar from '../components/TopBar'
import Fhir from '../api'
import { Patient, Practitioner } from 'fhir/r4'

import UserContext from '../context/user-context'
import PatientProfile from '../pages/PatientProfile'
import PhotoTest from '../components/PhotoTest'

const AppRouter = () => {
  const { initialized } = useKeycloak();
  const [userResource, setUserResource] = useState<Patient | Practitioner | null>(null);

  const isPatient = keycloak?.hasRealmRole('patient')

  const getCurrentUser = async () => {
    const user = await Fhir.getUserInformation();
    setUserResource(user);
  }

  useEffect(() => {
    getCurrentUser();
  }, [initialized])

  return (
    <Router>
      <UserContext.Provider value={{user: userResource}}>
      <div className={styles.container}>
        <TopBar />
        <Link to={"/photo-test"}>Photo Test</Link>
        <div className={styles.main}>
          <Route path="/photo-test" component={PhotoTest} />
          {!initialized ? <p>Keycloak loading</p> : <>
            <PrivateRoute path="/home" component={Survey} />
            <Route path="/chat" component={Chat} />
            <Route path="/survey" component={Survey} />
            <ProviderRoute path="/add-patient" component={AddPatient} />
            <ProviderRoute path="/patients" component={ViewPatients} />
            <ProviderRoute path="/patient/*" component={PatientProfile} />
            <Route path="/login" component={Login} />
          </>}
        </div>
        {isPatient && <BottomNavigation />}
      </div>
     </UserContext.Provider>
    </Router>
  )
}

export default AppRouter;