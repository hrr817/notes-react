import React from 'react'
import {AnimatePresence, motion} from 'framer-motion'

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
                setTab('NOTES-CONTAINER')
                break;
        }

    }


    return (
        <motion.div className="float-button-container" onClick={() => clickHandler()}
        initial={{ y: 100}} 
        animate={{ y: 0}}
        exit={{ y: 100}}
        whileTap={{ scale: 0.9 }}
        transition={{type: 'spring', bounce: 0.1, mass: 1, stiffness: 55 }}>
            <AnimatePresence>
                {tab === 'EDITOR' && 
                <motion.button style={{background: `url('${closeIcon.src}') center center no-repeat`}}
                initial={{ opacity: 0, scale: 0}} 
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0, scale: 0}}>
                </motion.button> }
            </AnimatePresence>

            <AnimatePresence>
                {tab === 'VIEWER' && 
                <motion.button style={{background: `url('${backIcon.src}') center center no-repeat`}}
                initial={{ opacity: 0, scale: 0}} 
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0, scale: 0}}>
                </motion.button>}
            </AnimatePresence>

            <AnimatePresence>
                {tab === 'NOTES-CONTAINER' && floatWindow && 
                <motion.button style={{background: `url('${backIcon.src}') center center no-repeat`}}
                initial={{ opacity: 0, scale: 0}} 
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0, scale: 0}}>
                </motion.button>}
            </AnimatePresence>

            <AnimatePresence>
                {tab === 'NOTES-CONTAINER' && !floatWindow &&
                <motion.button style={{background: `url('${createIcon.src}') center center no-repeat`}}
                initial={{ opacity: 0, scale: 0}} 
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0, scale: 0}}>
                </motion.button>}
            </AnimatePresence>

            <AnimatePresence>
                {tab === 'TASKS-CONTAINER' && floatWindow && 
                <motion.button style={{background: `url('${backIcon.src}') center center no-repeat`}}
                initial={{ opacity: 0, scale: 0}} 
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0, scale: 0}}>
                </motion.button>}
            </AnimatePresence>

            <AnimatePresence>
                {tab === 'TASKS-CONTAINER' && !floatWindow &&
                <motion.button style={{background: `url('${addIcon.src}') center center no-repeat`}}
                initial={{ opacity: 0, scale: 0}} 
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0, scale: 0}}>
                </motion.button>}
            </AnimatePresence>
        </motion.div>)
}
export default React.memo(FloatButton)
