import { loginRequest, graphConfig } from './authConfig'

export const callMsGraph = async (accessToken, endpoint = "") => {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`

    headers.append("Authorization", bearer)

    const options = {
        method: "GET",
        headers: headers
    }

    return fetch(`${graphConfig.graphMeEndpoint}${endpoint}`, options)
        .then(response => response)
        .catch(err => console.error(err))
}