import { useCallback } from 'react'
import { Redirect, useLocation,  } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import classes from './styles.module.scss'

const LoginPage = () => {
  const location = useLocation<{ [key: string]: unknown }>()
  const currentLocationState = location.state || {
    from: { pathname: '/home' },
  }

  const { keycloak } = useKeycloak()

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  if (keycloak?.authenticated)
    return <Redirect to={currentLocationState?.from as string} />

  return (
    <div className={classes.container}>
      <h1>Welcome to treatment tracker please login</h1>
      <button className={classes.button} type="button" onClick={login}>Login</button>
      <br />
    </div>
  )
}

export default LoginPage;