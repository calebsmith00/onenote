import { useEffect, useState } from 'react'
import { inputNeeded } from './templateFields'
import './Template.scss'

export default function AddTraining() {
    const [training, setTraining] = useState({})
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        const sessionTemplate = sessionStorage.getItem('template')
        if (!sessionTemplate) return

        setTemplates(JSON.parse(sessionTemplate))
    }, [])

    const getInputFields = handleChange => {
        return inputNeeded.map(field => (
            <input key={field.id} className="template-input" type="text" placeholder={field.placeholder} name={field.name} onChange={handleChange} />
        ))
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleInputChange = e => {
        let { name, value } = e.target

        setTraining({
            ...training,
            [name]: value
        })
    }

    const renderTemplates = () => {
        return templates.map((template, index) => (
            <option key={index} value={template["template-title"]}>{template["template-title"]}</option>
        ))
    }

    return (
        <>
            <h1>Add some trainings</h1>
            {/* TRAINING CREATION FORM */}
            <form className="template-form" onSubmit={handleSubmit}>
                <select>
                    {/* GET ALL <option> FIELDS */}
                    {renderTemplates()}
                </select>

                {/* GET ALL <input> FIELDS */}
                {getInputFields(handleInputChange)}

                <button type="submit">Submit</button>
            </form>
        </>
    )
}