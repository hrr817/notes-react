import React from 'react'
import NoteBox from './Component/NoteBox'

function Notes({notes, query, setTab, setCurrentNote}) {

    const displayNotes = () => {
        if(notes.length === 0) {
             return <div className="message"> <span>You have not made any notes</span> </div>
        } else {
            const temp = [...notes]
            const show = temp.filter(item => (item.text.toLowerCase().search(query.toLowerCase()) !== -1) && item )
            return show.reverse().map(data => 
            <NoteBox key={data.id} data={data} 
            setTab={setTab} setCurrentNote={setCurrentNote} />)
        }
    }
    
    return (
        <div className="notes-container scroll hide-scroll">
            {displayNotes()}
        </div>
    )
}

export default Notes
