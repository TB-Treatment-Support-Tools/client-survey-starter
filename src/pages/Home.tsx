import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import LoginPage from './Login';
import Fhir from '../api'
import { Link } from 'react-router-dom';


export default function Home() {
    const { keycloak } = useKeycloak()
    const fetchData = () => {

        Fhir.fetchPatients().then(json => {
            console.log(json);
        })
    }

    const fetchSurveys = () => {

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Bearer ${keycloak.token}`)
        fetch('http://localhost:8100/fhir/Questionnaire', { headers: requestHeaders }).then(res => { return res.json }).then(json => {
            console.log(json)
        })
    }

    const test = () => {
        // console.log(keycloak?.token)
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Bearer ${keycloak.token}`)
        fetch('http://localhost:8100/test', { headers: requestHeaders }).then(res => { return res.json }).then(json => {
            console.log(json)
        })
    }

    const isProvider = keycloak?.hasRealmRole('provider')

    const initalizeUserProfile = () => {
        Fhir.getProviderProfile();
    }

    useEffect(() => {
        if (keycloak?.hasRealmRole('provider')) {
            initalizeUserProfile();
        }

    }, [keycloak.authenticated])

    return (
        <>
            <LoginPage />
            <div>
                <button onClick={fetchData}>Fetch Data</button>
                <button onClick={fetchSurveys}>Fetch Surveys</button>
                <button onClick={test}>Test</button>
                {isProvider && <Link to="/add-patient">Add Patient Page</Link>}
            </div>
        </>)
}