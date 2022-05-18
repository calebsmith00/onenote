import { callMsGraph } from './graph'
import * as scope from './authConfig'

function validateToken({ accessToken }) {
    if (!accessToken) throw new Error("Invalid access token submitted!")
}

export async function getPage(instance, account) {
    let pageId = '1-ca464fdd477048068c186923fbaf131e!1-7ae5de74-ecdd-433d-9cb8-f1c98b8cbcdd'
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    let graphResponse = await callMsGraph({
        accessToken: response.accessToken,
        endpoint: `/onenote/pages/${pageId}/content?includeIDs=true`
    })

    graphResponse = await graphResponse.text()
    if (!graphResponse) throw new Error("There was no valid response from MSGraph.")

    let parser = new DOMParser()
    let doc = parser.parseFromString(graphResponse, "text/html")

    return doc
}

export async function getMemberOf(instance, account) {
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    let graphResponse = await callMsGraph({
        accessToken: response.accessToken,
        base: "userSelector",
        endpoint: `/${account.localAccountId}/memberOf?$select=displayName`
    })
    graphResponse = await graphResponse.json()
    if (!graphResponse) throw new Error("There was no valid response from MSGraph.")

    graphResponse.map(member => {
        if (!member.displayName === "Global Administrator") return undefined
        return member.displayName
    })
}

export async function createTemplate(instance, account, template) {
    const response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    const { title, trainings } = template

    let graphResponse = await callMsGraph({
        accessToken: response.accessToken,
        endpoint: `/onenote/notebooks/`,
        method: "POST",
        body: JSON.stringify({
            displayName: title,
            content: trainings
        })
    })

    return graphResponse
}

export async function getUsers(instance, account) {
    const response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    const graphResponse = await callMsGraph({
        accessToken: response.accessToken,
        base: scope.graphConfig.graphUserEndpoint,
        contentType: "application/json"
    })

    const parsedResponse = await graphResponse.json()
    if (!graphResponse) throw new Error("There was no valid response from MSGraph.")

    return parsedResponse.value
}