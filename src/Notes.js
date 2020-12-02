import React from 'react'
import NoteBox from './Component/NoteBox'

function Notes({notes, query, deletePhase, setNotes, setTab, setCurrentNote, setDeletePhase}) {

    const displayNotes = () => {
        if(notes.length === 0) {
             return <div className="message"> <span>You have not made any notes</span> </div>
        } else {
            const temp = [...notes]
            const show = temp.filter(item => (item.text.toLowerCase().search(query.toLowerCase()) !== -1) && item )
            return show.reverse().map(data => 
            <NoteBox key={data.id} data={data} notes={notes}
            deletePhase={deletePhase}  setNotes={setNotes} 
            setTab={setTab} setCurrentNote={setCurrentNote} 
            setDeletePhase={setDeletePhase}/>)
        }
    }
    
    return (
        <div className="notes-container scroll">
            {displayNotes()}
        </div>
    )
}

export default Notes
