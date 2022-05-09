import { graphConfig } from './authConfig'

export const callMsGraph = async (accessToken, base = `${graphConfig.graphMeEndpoint}`, endpoint = "", contentType = "text/html") => {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`

    headers.append("Authorization", bearer)
    headers.append("Content-Type", contentType) 

    const options = {
        method: "GET",
        headers: headers
    }

    if (base === "userSelector") base = `${graphConfig.graphUserEndpoint}`
    return fetch(`${base}${endpoint}`, options)
        .then(response => response)
        .catch(err => err)
}

export const postMsGraph = async ({ 
    accessToken, 
    base = `${graphConfig.graphMeEndpoint}`, 
    endpoint = "", 
    contentType = "application/json",
    body
}) => {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`

    headers.append("Authorization", bearer)
    headers.append("Content-Type", contentType)

    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    }

    return fetch(`${base}${endpoint}`, options)
        .then(response => response)
        .catch(err => err)
}