import React from 'react'
/* SVG */
import CloseSVG from '../svg/close.svg'
import CreateSVG from '../svg/create.svg'
import BackSVG from '../svg/back.svg'
import AddSVG from '../svg/add.svg'

const FloatButton= ({tab, floatWindow, setTab, setCurrentNote, setText, setFloatWindow}) => {

    const clickHandler = () => {
        switch(tab) {
            case 'NOTES-CONTAINER':
                setTab('EDITOR')
                break;
            case 'TASKS-CONTAINER':
                setFloatWindow(!floatWindow)
                break;
            case 'EDITOR':
            case 'VIEWER':
                setText('')
                setCurrentNote(null)
                setTab('NOTES-CONTAINER')
                break;
            default:
                console.log(tab + ' not found')
                break;
        }

    }

    const iconUrl = () => {
        switch(tab) {
            case 'EDITOR':
                return `url('${CloseSVG}') center center no-repeat`
            case 'VIEWER':
                return `url('${BackSVG}') center center no-repeat`
            case 'NOTES-CONTAINER':
                return floatWindow? `url('${BackSVG}') center center no-repeat` : `url('${CreateSVG}') center center no-repeat`
            case 'TASKS-CONTAINER':
                return floatWindow? `url('${BackSVG}') center center no-repeat` : `url('${AddSVG}') center center no-repeat`
            default:
                console.log(tab + ' not found')
                break
        }
    }

    return (
        <div className="float-button-container" onClick={() => clickHandler()}>
            <button style={{background: iconUrl()}}></button>
        </div>)
}
export default React.memo(FloatButton)
