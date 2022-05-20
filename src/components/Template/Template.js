import { useMsal } from '@azure/msal-react'
import { useState } from 'react'
import CreateTemplate from './CreateTemplate'


export default function Template() {
    const { instance, accounts } = useMsal()

    return (
        <div>
            <h1>This is where templates are created</h1>
            <p>A template is a set of data that outlines what training a new-hire needs to take to complete the onboarding process.</p>
            {/* TEMPLATE CREATION FORM */}
            <CreateTemplate />


        </div>
    )
}