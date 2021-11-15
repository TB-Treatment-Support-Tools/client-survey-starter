import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/';
import reportWebVitals from './reportWebVitals';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { StyledEngineProvider } from '@mui/material/styles';
import './app.css'

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}>
      <StyledEngineProvider injectFirst>
        <AppRouter />
      </StyledEngineProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
