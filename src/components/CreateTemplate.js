import { useMsal } from '@azure/msal-react'
import { useState } from 'react'
import { inputNeeded } from './Template/templateFields'
import './Template/Template.scss'

export default function CreateTemplate() {
    const { instance, accounts } = useMsal()
    const [template, setTemplate] = useState({})

    const getInputFields = () => {
        return inputNeeded.map(field => (
            <input key={field.id} className="template-input" type="text" placeholder={field.placeholder} name={field.name} />
        ))
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(e.target.name)
    }

    return (
        <div>
            <h1>This is where templates are created</h1>
            <p>A template is a set of data that outlines what training a new-hire needs to take to complete the onboarding process.</p>
            {/* TEMPLATE CREATION FORM */}
            <form className="template-form" onSubmit={ }>
                {getInputFields()}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}