import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import { callMyAPI } from '../graph'

export default function Notebook() {
    const { instance, accounts } = useMsal()
    const [notebooks, setNotebooks] = useState([])

    useEffect(() => {
        if (!instance || !accounts[0]) return // Validate existance of user's token
        const userId = accounts[0].localAccountId

        const options = {
            userId,
            endpoint: `api/user/${userId}/retrieve-notebooks`
        }

        callMyAPI(options)
            .then(response => response.json())
            .then(notebooks => setNotebooks(notebooks))
            .catch(err => console.error(err))
    }, [instance, accounts])

    const displayNotebooks = () => {
        if (notebooks.length < 1) return

        // Map through sections
        const getSections = (displayName, sections) => {
            return sections.map(section => {
                return <li key={section.id}>{displayName} - {section.displayName}</li>
            })
        }

        // Map through notebooks
        const notebookElements = notebooks.map(notebook => {
            return (
                <React.Fragment key={notebook.id}>
                    {getSections(notebook.displayName, notebook.sections)}
                </React.Fragment>
            )
        })

        return notebookElements
    }

    return (
        <>
            <ul>{displayNotebooks()}</ul>
        </>
    )
}