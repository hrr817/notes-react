import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import NoteBox from './Component/NoteBox'

function Notes({notes, query, setTab, setCurrentNote}) {
    const [sortedNotes, setSortedNotes] = useState([])
    let delay = -0.15;

    useEffect(() => {
        if(notes.length !== 0) {
            const temp = [...notes];
            setSortedNotes(temp.filter(item => (item.text.toLowerCase().search(query.toLowerCase()) !== -1) && item).reverse())
        }
    }, [notes, query])

    return (
            <motion.div className="notes-container scroll hide-scroll"
                initial={{ x: '-100vw'}} 
                animate={{ x: 0}}
                exit={{ x: '-100vw'}}
                transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60}}>
                {notes.length === 0 && 
                <motion.div className="message" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60}}> 
                <span>You have not made any notes</span> 
                </motion.div>}

                {notes.length !== 0 && sortedNotes.map(data => {
                    return <NoteBox key={data.id} data={data} 
                    setTab={setTab} setCurrentNote={setCurrentNote} delay={delay += 0.15}/>
                    })}
            </motion.div>
    )
}

export default Notes
