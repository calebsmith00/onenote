import { getNotebooks } from "../graphRequests"
import { useMsal } from "@azure/msal-react"
import { useEffect, useState } from 'react'

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
                        return <p key={section.id}>{notebook.displayName} - {section.displayName}</p>
                    })
                })
            }
        </>
    )
}