import { useMsal } from '@azure/msal-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
    const { instance, accounts } = useMsal()
    const [userId, setUserId] = useState(undefined)

    useEffect(() => {
        if (!accounts[0]) return

        setUserId(accounts[0].localAccountId)
    }, [instance, accounts])

    return (
        <div>
            <h1>Home</h1>

            <Link to={`user/${userId}/onenote/notebooks`}>Notebooks</Link>
        </div>
    )
}