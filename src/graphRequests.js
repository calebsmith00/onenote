import { callMsGraph } from './graph'
import * as scope from './authConfig'

function validateToken({ accessToken }) {
    if (!accessToken) throw new Error("Invalid access token submitted!")
}

export async function getNotebooks(instance, account, user = {}) {
    const response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    const graphResponse = await callMsGraph({
        accessToken: response.accessToken,
        endpoint: "/onenote/notebooks?$expand=sections"
    })

    const notebooks = await graphResponse.json()

    return notebooks.value
}

export async function getPage(instance, account, user = {}) {
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
        
    })
}

export async function createTemplate(instance, account, template) {
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    let graphResponse = await callMsGraph({
        accessToken: response.accessToken,
        endpoint: `/onenote/notebooks/`,
        method: "POST",
        body: JSON.stringify({
            displayName: template.title,
        })
    })

    return graphResponse
}