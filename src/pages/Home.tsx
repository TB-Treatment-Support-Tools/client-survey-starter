import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export default function Home() {
    const { keycloak } = useKeycloak()


    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])

    useEffect(() => {
        if (keycloak) {
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Authorization', `Bearer ${keycloak.token}`)
            fetch('http://localhost:8100/patients',{headers:requestHeaders}).then(res => { return res.json }).then(json => {
                console.log(json)
            })
        }
    }, [keycloak])

    return (<div>
        {keycloak?.authenticated && <button onClick={logout}>Logout</button>}
        {keycloak?.authenticated && console.log(keycloak.tokenParsed)}
        <p>Home</p>
    </div>)
}