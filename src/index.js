import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { msalConfig } from './authConfig'
import * as Msal from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

const publicClientApplication = new Msal.PublicClientApplication(msalConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MsalProvider instance={publicClientApplication}>
      <App />
    </MsalProvider>
  </BrowserRouter>
);