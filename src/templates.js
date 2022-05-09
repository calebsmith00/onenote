export let trainings = [

    {
        id: 0,
        templateId: 0,
        title: "",
        mentor: "",
        dateSubmit: undefined,
        dateComplete: undefined,
        prerequisites: [], // Should this be an array of strings or array of objects?
    },

    {
        id: 1,
        templateId: 0,
        title: "",
        mentor: "",
        dateSubmit: undefined,
        dateComplete: undefined,
        prerequisites: [],
    }

]

export let templates = [

    {
        id: 0,
        group: "Help Hangar Tech",
        trainings: []
    },

    {
        id: 1,
        group: "Level 3",
        trainings: []
    }

]

function mergeTrainings() {
    templates = templates.map(template => {
        trainings.forEach(training => {
            if (training.templateId === template.id) template.trainings.push(training)
        })

        return template
    })
}

mergeTrainings()