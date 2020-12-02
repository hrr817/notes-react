import React, {useEffect} from 'react'
import './CustomButton.css'

const defaultAnim = {
    to: {
        opacity: 1
    },
    from: {
        opacity: 0
    },
    hover: {
        to: {opacity: 0.85},
        from: {opacity: 1}
    },
    reset: {
        to: {opacity: 1}
    },
    config: {mass: 1, tension: 150, friction: 14}
}

function CustomButton( { className = "default-button", type = "text", value = "Button", alt = "Image", size=['1rem', '1rem'], eventHandlers = {}, anim = defaultAnim, name = "" } ) {
    useEffect(() => {
        // do something here
    }, []);

    const buttonStyle = {
        background: 'url('+value+') center center no-repeat'
    }

    const {onClick, onMouseEnter, onMouseLeave} = eventHandlers

    const clickAnim = e =>  { 
        // do something here
        
        if(onClick !== undefined) onClick(e)
    }

    const hoverAnim = e => {      
        // do something here

        if(onMouseEnter !== undefined) onMouseEnter(e)
    }

    const resetStyle = e => {    
        // do something here

        if(onMouseLeave !== undefined) onMouseLeave(e)
    }

    const events = {'onClick': clickAnim, 'onMouseEnter': hoverAnim, 'onMouseLeave': resetStyle}
    return (    
        <div className={className}>
            <button name={name} {...events} style={buttonStyle}> 
            { type === 'text' && value}
            </button>
        </div>
    )
}

export default React.memo(CustomButton)
