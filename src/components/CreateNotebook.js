function getElements() {
    let elements = document.querySelectorAll("tr > td")

    elements.forEach(element => { 
        if (element.textContent == "") return
        console.log(`${element.className} = ${element.textContent}`)
    })
}

const tableHeaders = [
    {className: "status", text: "Status"},
    {className: "request", text: "Request"},
    {className: "request-submitted", text: "Request Date"},
    {className: "request-completed", text: "Request Completed"},
    {className: "mentor", text: "Mentor"},
    {className: "prereq", text: "Prerequisites"},
    {className: "notes", text: "Notes/Comments"}
]

const tableRows = [
    [
        {className: "status", text: <input type="checkbox" />},
        {className: "request", text: "GroupMe"},
        {className: "request-submitted", text: "05/04/2022"},
        {className: "request-completed", text: "05/04/2022"},
        {className: "mentor", text: "Caleb Smith"},
        {className: "prereq", text: "None"},
        {className: "notes", text: "None"}
    ],

    [
        {className: "status", text: <input type="checkbox" />},
        {className: "request", text: "Training Video"},
        {className: "request-submitted", text: "05/04/2022"},
        {className: "request-completed", text: "05/04/2022"},
        {className: "mentor", text: "Anthony Cossio"},
        {className: "prereq", text: "None"},
        {className: "notes", text: "None"}
    ]
]

export default function CreateNotebook() {
    return (
    <>
        <table>
            <thead>
                <tr>
                    {tableHeaders.map(header => {
                        return <th className={header.className}>{header.text}</th>
                    })}
                </tr>

                {tableRows.map(row => {
                    return (
                        <tr>
                            {row.map(column => {
                                return <td className={column.className}>{column.text}</td>
                            })}
                        </tr>
                    )
                })}
            </thead>
        </table>

        <br />

        <button onClick={getElements}>Gather elements</button>
    </>
    )
}