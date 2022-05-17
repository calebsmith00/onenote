import { graphConfig } from './authConfig'

export const callMsGraph = async ({
    accessToken,
    base = `${graphConfig.graphMeEndpoint}`,
    endpoint = "",
    contentType = "text/html",
    method = "GET",
    body = undefined
}) => {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`

    headers.append("Authorization", bearer)
    headers.append("Content-Type", contentType)

    const options = {
        method,
        headers: headers,
        body
    }

    if (base === "userSelector")
        base = `${graphConfig.graphUserEndpoint}`
    return fetch(`${base}${endpoint}`, options)
        .then(response => response)
        .catch(err => err)
}

export const callMyAPI = async ({
    userId,
    base = "http://localhost:3001",
    endpoint = "",
    contentType = "application/json",
    method = "GET",
    body = undefined
}) => {
    return await fetch(`${base}/${endpoint}`)
}