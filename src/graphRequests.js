import { callMsGraph, postMsGraph } from './graph'
import * as scope from './authConfig'

function validateToken({ accessToken }) {
    if (!accessToken) throw new Error("Invalid access token submitted!")
}

export async function getNotebooks(instance, account, user = {}) {

}

// export function getSection() {

// }

export async function getPage(instance, account, user = {}) {
    // let response = await useAccessToken()
    let pageId = '1'
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    let graphResponse = await callMsGraph(response.accessToken, undefined, `/onenote/pages/${pageId}/content?includeIDs=true`)
    graphResponse = await graphResponse.text()
    if (!graphResponse) throw new Error("There was no valid response from MSGraph.")

    let parser = new DOMParser()
    let doc = parser.parseFromString(graphResponse, "text/html")

    console.log(doc.querySelectorAll("table"))

    console.log(account)
}

export async function getMemberOf(instance, account) {
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    let graphResponse = await callMsGraph(response.accessToken, "userSelector", 
        `/${account.localAccountId}/memberOf?$select=displayName`
    )
    graphResponse = await graphResponse.json()
    if (!graphResponse) throw new Error("There was no valid response from MSGraph.")

    graphResponse.map(member => {
        if (!member.displayName === "Global Administrator") return undefined
        
    })
}

export async function createTemplate(instance, account, template) {
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
    validateToken(response)

    let graphResponse = await postMsGraph({
        accessToken: response.accessToken,
        endpoint: `/onenote/notebooks/`,
        body: {
            displayName: template.title,
        }
    })

    return graphResponse
}