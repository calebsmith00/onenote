import { AuthenticatedTemplate, useMsal } from '@azure/msal-react'
import { useState } from 'react'
import { createTemplate } from '../graphRequests'

export default function CreateTemplate() {
    const { instance, accounts } = useMsal()
    const [ template, setTemplate ] = useState({})

    const handleChange = e => {
        setTemplate({
            ...template,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        createTemplate(instance, accounts[0], template)
    }

    return (
        <>
            <AuthenticatedTemplate>
                <form style={{display: 'flex', flexDirection: 'column', width: "50%"}} onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Template Name" onChange={handleChange} />
                    <input type="text" name="group" placeholder="Template Group" onChange={handleChange} />
                    <input type="text" name="link" placeholder="Template Link Access (edit, view, both)" onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
            </AuthenticatedTemplate>
        </>
    )
}