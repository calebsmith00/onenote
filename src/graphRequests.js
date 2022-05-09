import { callMsGraph } from './graph'
import * as scope from './authConfig'

// async function getAccessToken() {
//     const { instance, accounts } = useMsal()
//     let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account: accounts[0] })

//     if (!response) throw new Error("[ERROR] Response from instance could not be located.")
//     return response
// }

export async function getNotebooks(instance, account, user = {}) {

}

// export function getSection() {

// }

export async function getPage(instance, account, user = {}) {
    // let response = await useAccessToken()
    let pageId = '1'
    let response = await instance.acquireTokenSilent({ ...scope.loginRequest, account })
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
    let graphResponse = await callMsGraph(response.accessToken, "userSelector", 
        `/${account.localAccountId}/memberOf?$select=displayName`
    )
    graphResponse = await graphResponse.json()
    if (!graphResponse) throw new Error("There was no valid response from MSGraph.")

    graphResponse.map(member => {
        if (!member.displayName === "Global Administrator") return undefined
        
    })
}