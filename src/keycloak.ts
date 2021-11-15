import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: 'https://keycloak.local.app:4400/auth',
  realm: 'survey-app',
  clientId: 'tls-client'
});

export default keycloak;