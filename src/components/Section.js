import { useParams } from 'react-router-dom'
import { Providers } from '@microsoft/mgt-element'
import { useEffect, useState } from 'react'
import { InteractionRequiredAuthError, InteractionStatus } from '@azure/msal-browser'
import { useMsal, AuthenticatedTemplate } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { callMsGraph } from '../graph.js'

function Page() {
    const { instance, inProgress, accounts } = useMsal()
    const [apiData, setApiData] = useState(null)

    let pageId = "1-96572383b16106cc3a1d2386e1828cdd!1-3045e342-4f4f-4359-9cec-ee23e7ca7a1d"

    function RequestPage() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        })
        .then(response => {
            callMsGraph(response.accessToken, `/onenote/pages/${pageId}/content?includeIDs=true`)
            .then(graphResponse => graphResponse.text())
            .then(html => {
                let parser = new DOMParser()
                let doc = parser.parseFromString(html, "text/html")

                console.log(doc.querySelectorAll("table"))
            })
            .catch(err => console.error(err))
        })
    }

    return (
        <>
            <button onClick={RequestPage}>Request page(s)</button>
        </>
    )
}

export default function Section() {
    const { section } = useParams()
    
    return (
        <AuthenticatedTemplate>
            <div>
                <h1>Section</h1>
                <Page />
            </div>
        </AuthenticatedTemplate>
    )
}