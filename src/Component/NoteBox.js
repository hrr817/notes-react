import React from 'react'
import './NoteBox.css'
import {motion} from 'framer-motion'

function NoteBox({data, setTab, setCurrentNote, delay}) {
    const {id, text, date} = data

    const onClick = () => {
        setCurrentNote({id, text, date})
        setTab('VIEWER')
    }

    return (
        <motion.div className="note-box"
        initial={{ opacity: 0, x: '-100vw', scale: 0}}
        animate={{ opacity: 1, x: 0, scale: 1}}
        exit={{ opacity: 0, x: '-100vw', scale: 0}}
        whileTap={{scale: 0.9}}
        transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60, delay: delay}}>
            <div className="note-box-inside" onClick={() => onClick()}> 
                <pre className="para">
                    {text} 
                </pre>
                <span> {date} </span>
            </div>
        </motion.div>
    )
}

export default React.memo(NoteBox)
