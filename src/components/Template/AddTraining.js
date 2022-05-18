import { useState } from 'react'
import { inputNeeded } from './templateFields'
import './Template.scss'

export default function AddTraining() {
    const [training, setTraining] = useState({})
    const [inputFields, setInputFields] = useState({})

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

        setInputFields({
            ...inputFields,
            [name]: value
        })
    }

    return (
        <>
            <h1>Add some trainings</h1>
            {/* TRAINING CREATION FORM */}
            <form className="template-form" onSubmit={handleSubmit}>
                {getInputFields(handleInputChange)}

                <button type="submit">Submit</button>
            </form>
        </>
    )
}