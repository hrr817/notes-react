import React from 'react'
import {motion} from 'framer-motion'
import './CustomButton.css'

function CustomButton( { className = "default-button", type = "text", value = "Button", alt = "Image", size=['1rem', '1rem'], eventHandlers = {}, name = "" } ) {

    const buttonStyle = {
        background: 'url('+value+') center center no-repeat'
    }

    return (    
        <motion.div className={className}
        initial={{ y: -200 }} 
        animate={{ y: 0 }}
        exit={{ y: -200 }}
        whileTap={{scale: 0.9}}
        whileHover={{scale: 1.1}}
        transition={{type: 'spring', bounce: 0.1, mass: 0.8, stiffness: 50 }}>
            <button name={name} {...eventHandlers} style={buttonStyle}> 
            { type === 'text' && value}
            </button>
        </motion.div>
    )
}

export default React.memo(CustomButton)
