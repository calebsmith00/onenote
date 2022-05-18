import { useState } from 'react'
import './Template.scss'

export default function CreateTemplate() {
    const [template, setTemplate] = useState({})

    const handleChange = e => {
        const { name, value } = e.target

        setTemplate({
            ...template,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        sessionStorage.setItem('template', JSON.stringify(template))
    }

    return (
        <>
            <form className="template-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Template Name" className="template-input" onChange={handleChange} name="template-title" />
                <input type="text" placeholder="Number of Sections" className="template-input" onChange={handleChange} name="template-sections" />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}