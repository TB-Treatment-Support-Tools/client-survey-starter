import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import LoginPage from './Login';
import Fhir from '../api'
import { Link } from 'react-router-dom';


export default function Home() {
    const { keycloak } = useKeycloak()

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
        </>)
}