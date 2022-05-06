import { AuthenticatedTemplate } from '@azure/msal-react'

export default function CreateTemplate() {
    return (
        <>
            <AuthenticatedTemplate>
                <form>
                    <input type="text" name="template-name" placeholder="Template Name" />
                    <input type="text" name="template-group" placeholder="Template Group" />
                    <input type="text" name="template-link" placeholder="Template Link Access (edit, view, both)" />
                </form>
            </AuthenticatedTemplate>
        </>
    )
}