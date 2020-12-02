import React from 'react'

/* SVG */
import CloseSVG from '../svg/close.svg'
import CreateSVG from '../svg/create.svg'
import BackSVG from '../svg/back.svg'
import AddSVG from '../svg/add.svg'

/* Cache Image Files */
const closeIcon = new Image()
closeIcon.src = CloseSVG
const createIcon = new Image()
createIcon.src = CreateSVG
const backIcon = new Image()
backIcon.src = BackSVG
const addIcon = new Image()
addIcon.src = AddSVG

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
                return `url('${closeIcon.src}') center center no-repeat`
            case 'VIEWER':
                return `url('${backIcon.src}') center center no-repeat`
            case 'NOTES-CONTAINER':
                return floatWindow? `url('${backIcon.src}') center center no-repeat` : `url('${createIcon.src}') center center no-repeat`
            case 'TASKS-CONTAINER':
                return floatWindow? `url('${backIcon.src}') center center no-repeat` : `url('${addIcon.src}') center center no-repeat`
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
