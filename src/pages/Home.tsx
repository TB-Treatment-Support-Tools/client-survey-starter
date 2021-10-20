import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import LoginPage from './Login';
import Fhir from '../api'
import { Link } from 'react-router-dom';


export default function Home() {
    const { keycloak } = useKeycloak()
    const [patient,setPatient] = useState({});


    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])


    const fetchData = () => {

        Fhir.fetchPatients().then( json => {
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
        console.log(keycloak?.token)
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Bearer ${keycloak.token}`)
        fetch('http://localhost:8100/test', { headers: requestHeaders }).then(res => { return res.json }).then(json => {
             console.log(json)
        })
    }

    const getUsername = () => {
        const token: any = keycloak.tokenParsed
        return token.preferred_username || "Unset"
    }

    const isProvider = keycloak?.hasRealmRole('provider')


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
                <button onClick={test}>Test</button>
                {isProvider && <button onClick={()=>{Fhir.testCreatePatient()}}>Create Patient</button>}
                {isProvider && <Link to="/add-patient">Add Patient Page</Link>}
            </div>
        </>)
}