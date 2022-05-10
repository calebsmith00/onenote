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

    }, [instance, accounts])

    const handleSubmit = e => {
        e.preventDefault()

    }

    return (
        <>
            <h1>Notebook Creation</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="users">Select a user: </label>
                <select name="users" id="users">
                {
                    users.map(user => <option key={user.id}>{user.displayName} ({user.mail})</option>)
                }
                </select>

                <button type="submit">Create notebook</button>
            </form>
            
        </>
    )
}