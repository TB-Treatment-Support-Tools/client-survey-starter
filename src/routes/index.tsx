import * as React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import Survey from '../pages/Survey'

import { PrivateRoute, ProviderRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'
import styles from './main-content.module.scss'
import Chat from '../pages/Chat'
import keycloak from '../keycloak'
import AddPatient from '../pages/AddPatient'

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
        <div className={styles.main}>
          {isProvider && <p>Provider</p>}
          {isPatient && <p>Patient</p>}
          {!initialized ? <p>Keycloak loading</p> : <>
            <Redirect from="/" to="/home" />
            <Route path="/home" component={HomePage} />
            <Route path="/chat" component={Chat} />
            <Route path="/survey" component={Survey} />
            <Route path="/add-patient" component={AddPatient} />
          </>}
        </div>
        {isPatient &&<BottomNavigation /> }
      </div>
    </Router>
  )
}

export default AppRouter;