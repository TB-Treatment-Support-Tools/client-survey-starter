import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import LoginPage from './Login';


export default function Home() {
    const { keycloak } = useKeycloak()


    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])


    const fetchData = () => {
        if (keycloak) {
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Authorization', `Bearer ${keycloak.token}`)
            fetch('http://localhost:8100/fhir/Patient?_format=json', { headers: requestHeaders }).then(res => { return res.json }).then(json => {
                console.log(json)
            })
        }
    }

    const fetchSurveys = () => {

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Bearer ${keycloak.token}`)
        fetch('http://localhost:8100/fhir/Questionnaire?_format=json', { headers: requestHeaders }).then(res => { return res.json }).then(json => {
             console.log(json)
        })
    }

    const getUsername = () => {
        const token: any = keycloak.tokenParsed
        return token.preferred_username || "Unset"
    }


    return (
        <>
            <LoginPage />
            <div>
                {keycloak?.authenticated && <button onClick={logout}>Logout</button>}
                {keycloak?.authenticated && console.log('parsed log')}
                {keycloak?.authenticated && console.log(keycloak.tokenParsed)}
                {keycloak?.authenticated && <h1>You are logged in as: {getUsername()} </h1>}
                <button onClick={fetchData}>Fetch Data</button>
                <button onClick={fetchSurveys}>Fetch Surveys</button>
                <p>Home</p>
            </div>
        </>)
}