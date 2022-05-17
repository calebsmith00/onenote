import { getNotebooks } from "../graphRequests"
import { useMsal } from "@azure/msal-react"
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function Notebooks() {
    const { instance, accounts } = useMsal()
    const [notebooks, setNotebooks] = useState([])

    useEffect(() => {
        let notebookResponse = getNotebooks(instance, accounts[0])

        notebookResponse
            .then(notebook => setNotebooks(notebook))
            .catch(err => console.error(err))
    }, [instance, accounts])

    const parseNotebooks = cb => {
        if (!notebooks) return

        return notebooks.map(notebook => {
            return cb(notebook, notebook.sections)
        })
    }

    return (
        <>
            <h1>Notebooks</h1>

            {
                parseNotebooks((notebook, sections) => {
                    return sections.map(section => {
                        return (
                            <React.Fragment key={section.id}>
                                <p>
                                    <Link to={`notebook/${notebook.id}`}>
                                        {notebook.displayName}
                                    </Link>
                                    -
                                    <Link to={`notebook/${notebook.id}/${section.id}`}>
                                        {section.displayName}
                                    </Link>
                                </p>
                            </React.Fragment>
                        )
                    })
                })
            }
        </>
    )
}