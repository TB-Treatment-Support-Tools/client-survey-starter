 import { useKeycloak } from '@react-keycloak/web';
import LoginPage from './Login';


export default function Home() {
    const { keycloak } = useKeycloak()

    const isProvider = keycloak?.hasRealmRole('provider')

    return (
        <>
            <p>Provider page</p>
            <LoginPage />
        </>)
}