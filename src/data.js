import uuid from 'react-uuid'
const date = new Date()
const kyou = `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`

export const NotesData = [
    {id: uuid(),
    date: kyou,
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam libero repudiandae sed dolorem quia. Impedit aliquam saepe sapiente eaque tempora aut asperiores, necessitatibus doloribus, nisi ab molestiae ad magni possimus.`},
    {id: uuid(), 
    date: kyou,
    text: `This app uses browser's storage to save notes, clearing browser data will result in losing notes.`},
    {id: uuid(), 
    date: kyou,
    text: `Check out some sample notes. When viewing note, tap on word to see its meaning.`},
    {id: uuid(), 
    date: kyou,
    text: `It uses Dictionary API to get the words meaning, make sure you've a working connection.`},
    {id: uuid(),
    date: kyou,
    text: `Welcome to Notes! \nThis is my first ever React App. \nIt is simple, minimal and elegant.`}
]

export const TasksData = [
    {id: uuid(), 
    created: kyou,
    text: `Eat the curry before monday`,
    done: false
    },
    {id: uuid(), 
    created: kyou,
    text: `Go buy milk`,
    done: true
    },
    {id: uuid(), 
    created: kyou,
    text: `Start learning guitar`,
    done: false
    },
    {id: uuid(), 
    created: kyou,
    text: `Call your grandparents`,
    done: true
    },
    {id: uuid(), 
    created: kyou,
    text: `Look for an apartment`,
    done: false
    }
]
