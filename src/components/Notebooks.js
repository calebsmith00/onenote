export default function Notebooks() {
    async function fetchNotebooks() {
        // If the provider exists, pull data from OneNote including notebooks and sections.
        // We pass the notebook ID to a URL parameter
        // so that the user can view page content when they click the link directing them to a notebook.
        // GET /me/onenote/notebook/:notebook

        // if (provider) {
        //     let graphClient = provider.graph.client
        //     let userDetails = await graphClient.api("me/onenote/notebooks?$expand=sections($select=pages),sectionGroups($expand=sections)").get() 

        //     if (userDetails) setNotebooks(userDetails.value)
        // }
    }

    return (
        <div>
            
            <h1>Notebooks</h1>

            <button onClick={fetchNotebooks}>Retrieve notebooks</button>
        </div>
    )
}