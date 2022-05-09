import { getNotebooks } from "../graphRequests"
import { useMsal } from "@azure/msal-react"

export default function Notebooks() {
    const { instance, accounts } = useMsal()

    return (
        <>  
            <h1>Notebooks</h1>

            <button onClick={() => getNotebooks(instance, accounts[0])}>Retrieve notebooks</button>
        </>
    )
}