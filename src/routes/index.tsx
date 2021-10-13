import * as React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import Survey from '../pages/Survey'

import { PrivateRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'
import styles from './main-content.module.scss'
import Chat from '../pages/Chat'

const AppRouter = () => {
  const { initialized } = useKeycloak()

  // if (!initialized) {
  //   return <div>Loading...</div>
  // }

  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.main}>
          {!initialized ? <p>Keycloak loading</p> : <>
            <Redirect from="/" to="/home" />
            <Route path="/home" component={HomePage} />
            <Route path="/chat" component={Chat} />
            <PrivateRoute path="/survey" component={Survey} />
          </>}
        </div>
        <BottomNavigation />
      </div>
    </Router>
  )
}

export default AppRouter;