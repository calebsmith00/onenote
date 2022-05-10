import { getUsers } from "../graphRequests"
import { useMsal } from "@azure/msal-react"
import { useEffect, useState } from "react"

export default function CreateNotebook() {
    const { instance, accounts } = useMsal()
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(instance, accounts[0])
            .then(response => setUsers(response))
            .catch(err => console.error(err))

    }, [instance])

    return (
        <>
            <h1>Create notebook</h1>
        </>
    )
}