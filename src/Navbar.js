import React, {useEffect} from 'react'
import { motion, AnimatePresence } from "framer-motion"
import uuid from 'react-uuid'
import CustomButton from './Component/CustomButton'
import InputText from './Component/InputText'

/* Stylesheet/CSS */
import './Navbar.css'


/* SVG */
import NoteSVG from './svg/note.svg'
import TaskSVG from './svg/task.svg'
import SearchSVG from './svg/search.svg'
import TrashSVG from './svg/trash.svg'
import SaveSVG from './svg/save.svg'
import EditSVG from './svg/edit.svg'
import CloseSVG from './svg/close.svg'

/* Cache Image Files */
const noteIcon = new Image()
noteIcon.src = NoteSVG
const taskIcon = new Image()
taskIcon.src = TaskSVG
const searchIcon = new Image()
searchIcon.src = SearchSVG
const trashIcon = new Image()
trashIcon.src = TrashSVG
const saveIcon = new Image()
saveIcon.src = SaveSVG
const editIcon = new Image()
editIcon.src = EditSVG
const closeIcon = new Image()
closeIcon.src = CloseSVG

function Navbar({query, currentNote, notes, showSearch, tab, text, setCurrentNote, setNotes, setSearch, setTab, setText, setQuery, setPlaceholderForNotes}) {
    
    useEffect(() => {
        if(notes.length < 3) {
            setQuery('')
            setSearch(false)
        }
    }, [notes.length, setSearch, setQuery]);

    useEffect(() => {
        if(showSearch === false) setQuery('')
    }, [showSearch, setQuery]);

    const tabChange = e => {
        const tab = e.target.name
        setTab(tab)
    }

    const removeNote = id => {
        const temp = [...notes]
        let index = null
        let p1 = []
        let p2 = []
        let newArray;
        if(temp.length < 2) return newArray = []

        for(let i = 0; i < temp.length; i++){
            if(temp[i].id === id){
                index = i
                break
            }
        }
        p1 = temp.slice(0, index)
        p2 = temp.slice(index + 1, temp.length)
        newArray = p1.concat(p2)
        return newArray
    }

    const deleteNote = () => {
        if(currentNote === null) return
        const newArray = removeNote(currentNote.id)
        setNotes(newArray)
        setText('')
        setCurrentNote(null)
        setTab('NOTES-CONTAINER')
    }

    const editNote = () => {
        setTab('EDITOR')
    }

    const saveNote = () => {
        if(text === '') {
            setPlaceholderForNotes('Try writing something...')
            return
        }

        let newArray = [...notes]
        let note = null
        if(currentNote !== null){ 
            newArray = removeNote(currentNote.id) 
        }

        const date = new Date()
        const newDate = `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`
        note = {
            id: uuid(),
            date: newDate,
            text: text
        }

        newArray.push(note)
        setPlaceholderForNotes('')
        setNotes(newArray)
        setText('')
        setCurrentNote(null)
        setTab('NOTES-CONTAINER')
    }

    const SearchButtonEvents = {onClick: () => setSearch(!showSearch)}

    const easeTransition = {type: 'spring', bounce: 0.1, mass: 0.8, stiffness: 50 }

    return (
        <nav>
            {/* Nav Buttons */}
                <AnimatePresence>
                {((!showSearch && tab === 'NOTES-CONTAINER') || (!showSearch && tab === 'TASKS-CONTAINER')) &&
                <motion.div style={{display: 'flex', flexDirection:'row'}}
                initial={{ opacity: 0, y: -200 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -200 }}
                transition={easeTransition} > 
                    <CustomButton name="NOTES-CONTAINER" 
                        className='btn-container' 
                        type="img" 
                        value={noteIcon.src} 
                        eventHandlers={{onClick: tabChange}}/>
                    <CustomButton name="TASKS-CONTAINER" 
                        className="btn-container" 
                        type="img" 
                        value={taskIcon.src} 
                        eventHandlers={{onClick: tabChange}}/>
                </motion.div> }
                </AnimatePresence>

            <div className="right">
                <div className="search-container">
                {/* Search Input */}
                <AnimatePresence>
                {((showSearch && (notes.length > 2) && (tab === 'NOTES-CONTAINER' || tab === 'TASKS-CONTAINER'))) && 
                <InputText query={query} setQuery={setQuery}/>}
                </AnimatePresence>
                <AnimatePresence>
                {((notes.length > 2 && (tab === 'NOTES-CONTAINER' || tab === 'TASKS-CONTAINER'))) &&  
                        <CustomButton className='btn-container' 
                            type="img" 
                            value={showSearch? closeIcon.src : searchIcon.src} 
                            eventHandlers={SearchButtonEvents}/>}
                </AnimatePresence>                         
                </div>

                {/* Extra Buttons */}
                    {tab === 'VIEWER' && 
                    <CustomButton className="btn-container" 
                        type="img" value={editIcon.src} 
                        eventHandlers={{onClick: editNote}}/>}
                    {tab === 'VIEWER' && 
                    <CustomButton className="btn-container" 
                        type="img" value={trashIcon.src} 
                        eventHandlers={{onClick: deleteNote}}/>}
                    {tab === 'EDITOR' && 
                    <CustomButton className="btn-container" 
                        type="img" value={saveIcon.src} 
                        eventHandlers={{onClick: saveNote}}/>}   
            </div>
        </nav> 
        )
}

export default React.memo(Navbar)
