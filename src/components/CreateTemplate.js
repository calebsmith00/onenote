import { useMsal } from '@azure/msal-react'
import { useState } from 'react'
import { inputNeeded } from './Template/templateFields'
import './Template/Template.scss'

export default function CreateTemplate() {
    const { instance, accounts } = useMsal()
    const [inputFields, setInputFields] = useState({})

    const getInputFields = handleChange => {
        return inputNeeded.map(field => (
            <input key={field.id} className="template-input" type="text" placeholder={field.placeholder} name={field.name} onChange={handleChange} />
        ))
    }

    const handleInputChange = e => {
        let { name, value } = e.target

        setInputFields({
            ...inputFields,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div>
            <h1>This is where templates are created</h1>
            <p>A template is a set of data that outlines what training a new-hire needs to take to complete the onboarding process.</p>
            {/* TEMPLATE CREATION FORM */}
            <form className="template-form" onSubmit={handleSubmit}>
                {getInputFields(handleInputChange)}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}