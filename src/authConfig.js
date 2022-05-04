export const msalConfig = {
    auth: {
        clientId: "f2e346d7-bfb2-4cb6-ad65-dc69d6f2cbc8",
        authority: "https://login.microsoftonline.com/organizations",
        redirectUri: "http://localhost:3000"
    },

    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
}

export const loginRequest = {
    scopes: ["User.Read"]
}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}