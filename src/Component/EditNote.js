import React, {useRef, useEffect} from 'react'

const EditNote = ({text, setText, currentNote}) => {
    const ref = useRef()

    useEffect(() => {
        if(currentNote !== null) {
            setText(currentNote.text)
        }
        ref.current.focus()
    }, [])
    
    return (
        <div className="editor">
            <textarea className="scroll" ref={ref} onChange={e => setText(e.target.value)} value={text}></textarea>
        </div>
    )
}

export default React.memo(EditNote)
