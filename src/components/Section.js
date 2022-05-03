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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IjZ4Y1FOcThhV3dZNkxGV2sxLU9ISlE4ZEhhQ1lod2FNUUJfb0VNRmlKd0UiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85NzYzZWI3MC00YmY5LTQ0MDMtODRiZS0yYmQ0MDExOGU3ZjIvIiwiaWF0IjoxNjUxNTA5NDc1LCJuYmYiOjE2NTE1MDk0NzUsImV4cCI6MTY1MTUxNDA4NSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQStpQWZQdEVGVGpxeHdiOVdNVWMzaFU3blFyU0xhVSs1NmFjdzNNUkxnZ2RiMEIyM0lFY3dnZlQwZ0ZXcWg0WjZCSzBJcFlYZnY0UHZOdVdKOHB3OTFWZ09ra085aUlIRmhMT1lsYnBEamRRPSIsImFtciI6WyJwd2QiLCJyc2EiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiNDczMjBjYWQtOTUwNC00YzBjLTk3Y2ItYzFlOWRhZWUxYjRlIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImdpdmVuX25hbWUiOiJDYWxlYiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjMyLjY2LjMyLjE1IiwibmFtZSI6IkNhbGViIFNtaXRoIiwib2lkIjoiMGVjMTg5YTYtZDhjZS00YmJiLWFlM2MtZmRmZmRlNzFkNmE3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxRUU0Qzc1QTgiLCJyaCI6IjAuQVhZQWNPdGpsX2xMQTBTRXZpdlVBUmpuOGdNQUFBQUFBQUFBd0FBQUFBQUFBQUNaQUVJLiIsInNjcCI6Ik5vdGVzLlJlYWQuQWxsIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJaNnROZm8yMjR1bTN3UlVjVmF2S1IxT3N3Wk5XNXJKaEp3dXdoNEpLQ2VjIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiOTc2M2ViNzAtNGJmOS00NDAzLTg0YmUtMmJkNDAxMThlN2YyIiwidW5pcXVlX25hbWUiOiJtaW5pZmllZGNvZGVAZGV2ZWxvcGVyY2FsZWIuY29tIiwidXBuIjoibWluaWZpZWRjb2RlQGRldmVsb3BlcmNhbGViLmNvbSIsInV0aSI6ImdmTjA3MDNPckVXMXRtMlhaeWo0QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiYzBIalp4NGNONURXRTRrakY0SmMyWnlMaXVrY3p2SUl0NmkzcXM0MENiMCJ9LCJ4bXNfdGNkdCI6MTY0OTUyNTQyN30.RUEfoG99TnZQyp_3vpgbr1bAPbHXtsk0Uf1ERuc3huJoS6l8K1xFlZfwHzP5A9zT4teOGpyJP5wNOQN3g1cQKXgi4pCrFnoG2bLSftukF5svfXL2FY-LUvMh2guKsmb4vK1T2yO84cdJ8YH-1GzVdFVG-XG6AKT6mVvfZDqdtU2tlynTzwsf4jJpdHiCH9ssSXnq-yOLCQ1OZfDKGsJZizq_p7c_1hQRmkd_JM_BBODKRpENqYubQQxmTMSzrPO94cyzK63ClOOFS6yybk9E7f1B_sXHPQWLSly8t6PmAkEjUlfK-NjnJcWGKc2q0-iROVGO5Kjpi2rlqYfYCBSySg'
            }    
        }

        fetch(API_URL, options)
            .then(data => {
                let reader = data.body.getReader()

                return new ReadableStream({
                    start(controller) {
                        return pump()
                        function pump() {
                            return reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close()
                                    return
                                }

                                console.log(value)
                                controller.enqueue(value)
                                return pump()
                            })
                        }
                    }
                })
            })
            .then(stream => new Response(stream).text())
            .then(response => console.log(response))
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