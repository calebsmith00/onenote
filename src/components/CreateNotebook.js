import { getUsers } from "../graphRequests"
import { useMsal } from "@azure/msal-react"

export default function CreateNotebook() {
    const { instance, accounts } = useMsal()

    const handleSubmit = e => {
        e.preventDefault()

        getUsers(instance, accounts[0])
    }

    return (
        <>
            <h1>Create notebook</h1>

            <button type="submit" onClick={handleSubmit}>Request users</button>
        </>
    )
}