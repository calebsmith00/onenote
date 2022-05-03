import { useParams } from 'react-router-dom'
import { Providers } from '@microsoft/mgt-element'
import { PureComponent, useState } from 'react'

export default function Section() {
    const { section } = useParams()
    const [pageHtml, setPageHtml] = useState(undefined)

    const fetchPageContent = () => {
        const provider = Providers.globalProvider
        if (!provider) return

        let graphClient = provider.graph.client
        const API_URL = `https://graph.microsoft.com/v1.0/me/onenote/pages/1-96572383b16106cc3a1d2386e1828cdd!1-3045e342-4f4f-4359-9cec-ee23e7ca7a1d/content?includeIDs=true`

        let options = {
            method: "GET",
            headers: {
                'Content-Type': 'text/html',
                'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
            }    
        }

         fetch(API_URL, options)
            .then(response => response.text())
            .then(html => {
                let parser = new DOMParser()
                let doc = parser.parseFromString(html, "text/html")

                console.log(doc.querySelectorAll("table"))
            })
            .catch(err => console.error(err))   
    }
    
    return (
        <div>
            <h1>Section</h1>

            <button onClick={fetchPageContent}>Fetch page content</button>

            {pageHtml &&
                <div dangerouslySetInnerHTML={{__html: pageHtml}}></div>
            }
        </div>
    )
}