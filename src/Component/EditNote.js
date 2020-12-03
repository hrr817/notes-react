import React, {useRef, useEffect} from 'react'
import {motion} from 'framer-motion'

const EditNote = ({text, setText, currentNote, placeholderForNotes}) => {
    const ref = useRef()

    useEffect(() => {
        if(currentNote !== null) {
            setText(currentNote.text)
        }
        ref.current.focus()
    }, [])
    
    return (
        <motion.div className="editor"
        initial={{ opacity: 0}} 
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60}}>
            <textarea className="scroll" ref={ref} onChange={e => setText(e.target.value)} value={text}
            placeholder={placeholderForNotes}></textarea>
        </motion.div>
    )
}

export default React.memo(EditNote)
