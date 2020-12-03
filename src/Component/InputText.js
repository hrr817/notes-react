import React, {useEffect, useRef} from 'react'
import { motion } from 'framer-motion'

function InputText({query, setQuery}) {

    const ref = useRef()
    useEffect(() => {
        ref.current.focus()
    }, [])

    return (<motion.input ref={ref} 
        type="text" 
        className="search-input" 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', mass: 0.8, stiffness: 60 }}/>
        )
}

export default InputText
