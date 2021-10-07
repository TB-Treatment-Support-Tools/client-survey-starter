import * as React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import Survey from '../pages/Survey'

import { PrivateRoute } from './utils'
import BottomNavigation from '../components/BottomNavigation/'

const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Redirect from="/" to="/home" />
      <Route path="/home" component={HomePage} />
      <PrivateRoute path="/survey" component={Survey} />
      <BottomNavigation />
    </Router>
  )
}

export default AppRouter;