import * as React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

interface PrivateRouteParams extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
}

export function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteParams) {
  const { keycloak } = useKeycloak()

  return (
    <Route
      {...rest}
      render={(props) =>
       !keycloak || keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export function ProviderRoute({
  component: Component,
  ...rest
}: PrivateRouteParams) {
  const { keycloak } = useKeycloak()
  const authorized = keycloak?.authenticated && keycloak?.hasRealmRole('provider')


  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
