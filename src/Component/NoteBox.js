import React from 'react'
import './NoteBox.css'

function NoteBox({data, setTab, setCurrentNote}) {
    const {id, text, date} = data

    const onClick = () => {
        setCurrentNote({id, text, date})
        setTab('VIEWER')
    }

    return (
        <div className="note-box">
            <div className="note-box-inside" onClick={() => onClick()}> 
                <pre className="para">
                    {text} 
                </pre>
                <span> {date} </span>
            </div>
        </div>
    )
}

export default React.memo(NoteBox)
