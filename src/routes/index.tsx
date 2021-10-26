import * as React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import Survey from '../pages/Survey'

import { PrivateRoute, ProviderRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'
import styles from './main-content.module.scss'
import Chat from '../pages/Chat'
import keycloak from '../keycloak'
import AddPatient from '../pages/AddPatient'
import ViewPatients from '../pages/ViewPatients'

import TopBar from '../components/TopBar'

const AppRouter = () => {
  const { initialized } = useKeycloak()

  // if (!initialized) {
  //   return <div>Loading...</div>
  // }

  const isProvider = keycloak?.hasRealmRole('provider')
  const isPatient = keycloak?.hasRealmRole('patient')

  return (
    <Router>
      <div className={styles.container}>
        <TopBar />
        <div className={styles.main}>
          {isProvider && <div className={styles.providerNav}><p>Provider Links</p>
            <Link to="/home">Home</Link>
            <Link to="/add-patient">Add Patient</Link>
            <Link to="/patients">Patients</Link>
          </div>}
          {!initialized ? <p>Keycloak loading</p> : <>
            <Route path="/home" component={HomePage} />
            <Route path="/chat" component={Chat} />
            <Route path="/survey" component={Survey} />
            <ProviderRoute path="/add-patient" component={AddPatient} />
            <ProviderRoute path="/patients" component={ViewPatients} />
          </>}
        </div>
        {isPatient && <BottomNavigation />}
      </div>
    </Router>
  )
}

export default AppRouter;