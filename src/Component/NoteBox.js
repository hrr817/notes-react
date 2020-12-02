import React, {useState, useEffect} from 'react'
import './NoteBox.css'
import trashIcon from '../svg/trash.svg'

/* Custom Hook */
import useLongPress from '../CustomHooks/useLongPress'

function NoteBox({data, notes, deletePhase, setNotes, setTab, setCurrentNote, setDeletePhase}) {
    const {id, text, date} = data

    const onLongPress = () => {
        setDeletePhase(true)
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 400,
    };

    const onClick = () => {
        setCurrentNote({id, text, date})
        setTab('VIEWER')
    }

    const removeNote = (uniqueID) => {
        const temp = [...notes]
        let index = null
        let p1 = []
        let p2 = []
        let newArray;
        if(temp.length < 2) return newArray = []

        for(let i = 0; i < temp.length; i++){
            if(temp[i].id === id){
                index = i
                break
            }
        }
        p1 = temp.slice(0, index)
        p2 = temp.slice(index + 1, temp.length)
        newArray = p1.concat(p2)
        return newArray
    }

    const deleteBtn = () => {
        setNotes(removeNote(id))
    }

    const events = useLongPress(onLongPress, onClick, defaultOptions);
    const [longPressEvent, setLongPressEvent] = useState(events)


    useEffect(() => {
        if(deletePhase) setLongPressEvent(null)
        else if(!deletePhase) setLongPressEvent(events)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletePhase])

    return (
        <div className="note-box">
            <div className="note-box-inside" {...longPressEvent}>
                {deletePhase && <div className="icon" onClick={() => deleteBtn()}> <span style={{background: 'url('+trashIcon+') center center no-repeat'}}></span> </div>}    
                <pre className="para">
                    {text} 
                </pre>
                <span> {date} </span>
            </div>
        </div>
    )
}

export default React.memo(NoteBox)
