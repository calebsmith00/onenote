import { AuthenticatedTemplate, useMsal } from '@azure/msal-react'
import { useState } from 'react'
import { createTemplate } from '../graphRequests'
import styles from '../styles/Table.scss'

export default function CreateTemplate() {
    const { instance, accounts } = useMsal()
    const [ template, setTemplate ] = useState({})
    const [ training, setTraining ] = useState({
        "task-name": "",
        "mentor": "",
        "mentor-signoff": "",
        "prerequisites": "",
    })
    const [ trainingList, setTrainingList ] = useState([])

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

    const handleTrainingChange = e => {
        setTraining({
            ...training,
            [e.target.name]: e.target.value
        })
    }

    const handleTrainingSubmit = e => {
        e.preventDefault()

        setTrainingList([
            ...trainingList,
            training
        ])

        setTraining({
            "task-name": "",
            "mentor": "",
            "mentor-signoff": "",
            "prerequisites": "",
        })
    }

    return (
        <>
            <AuthenticatedTemplate>
                <h1>Template Details:</h1>
                <form style={{display: 'flex', flexDirection: 'column', width: "30%"}} onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Template Name" onChange={handleChange} />
                    <input type="text" name="group" placeholder="Template Group" onChange={handleChange} />
                    <input type="text" name="link" placeholder="Template Link Access (edit, view, both)" onChange={handleChange} />

                    <br />
                    <button type="submit">Submit</button>
                </form>

                <h1>Template Trainings:</h1>
                <form style={{display: 'flex', flexDirection: 'column', width: '30%'}} onSubmit={handleTrainingSubmit}>
                    <input type="text" name="task-name" placeholder="Task Name" onChange={handleTrainingChange} value={training["task-name"]} />
                    <input type="text" name="mentor" placeholder="Mentor" onChange={handleTrainingChange} value={training["mentor"]} />
                    <input type="text" name="mentor-signoff" placeholder="Mentor Sign-Off" onChange={handleTrainingChange} value={training["mentor-signoff"]} />
                    <input type="text" name="prerequisites" placeholder="Prerequisites" onChange={handleTrainingChange} value={training["prerequisites"]} />

                    <br />
                    <button type="submit">Submit</button>
                </form>

                <h1>Template Preview</h1>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Request / Task</th>
                            <th>Date Submitted</th>
                            <th>Date Completed</th>
                            <th>Mentor</th>
                            <th>Mentor Sign-Off</th>
                            <th>Prerequisites</th>
                            <th>Notes / Comments</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trainingList.map(task => {
                            return (
                                <tr>
                                    <td>None</td>
                                    <td>{task["task-name"]}</td>
                                    <td>Today</td>
                                    <td>Tomorrow</td>
                                    <td>{task["mentor"]}</td>
                                    <td>{task["mentor-signoff"]}</td>
                                    <td>{task["prerequisites"]}</td>
                                    <td>Some notes</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </AuthenticatedTemplate>
        </>
    )
}