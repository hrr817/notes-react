import React, {useEffect} from 'react'
import uuid from 'react-uuid'
import CustomButton from './Component/CustomButton'
import InputText from './Component/InputText'

/* Stylesheet/CSS */
import './Navbar.css'

/* SVGS */
import NoteSVG from './svg/note.svg'
import TaskSVG from './svg/task.svg'
import SearchSVG from './svg/search.svg'
import TrashSVG from './svg/trash.svg'
import SaveSVG from './svg/save.svg'
import EditSVG from './svg/edit.svg'
import CloseSVG from './svg/close.svg'
import Close2SVG from './svg/close-2.svg'

function Navbar({query, currentNote, notes, showSearch, tab, text, deletePhase, setCurrentNote, setNotes, setSearch, setTab, setText, setQuery, setDeletePhase}) {
    useEffect(() => {
        if(notes.length < 3) {
            setQuery('')
            setSearch(false)
        }
    }, [notes.length, setSearch, setQuery]);

    useEffect(() => {
        if(showSearch === false) setQuery('')
    }, [showSearch, setQuery]);

    const clickHandler = e => {
        e.preventDefault()
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
        if(text === '') return

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
        setNotes(newArray)
        setText('')
        setCurrentNote(null)
        setTab('NOTES-CONTAINER')
    }


    const NavButtonEvents = {onClick: clickHandler}
    const SearchButtonEvents = {onClick: () => setSearch(!showSearch)}

    return (
        <nav>
            <div> {/* Blank div */} </div>

            {/* Nav Buttons */}
            <div className="center">
                {((!showSearch && tab === 'NOTES-CONTAINER') || (!showSearch && tab === 'TASKS-CONTAINER')) && !deletePhase &&
                <> 
                    <CustomButton name="NOTES-CONTAINER" 
                        className='btn-container' 
                        type="img" 
                        value={NoteSVG} 
                        eventHandlers={NavButtonEvents}/>
                    <CustomButton name="TASKS-CONTAINER" 
                        className="btn-container" 
                        type="img" 
                        value={TaskSVG} 
                        eventHandlers={NavButtonEvents}/>
                    
                </>}
            </div>

            <div className="right">
                <div className="search-container">
                {/* Search Input */}
                {((showSearch && (notes.length > 2) && (tab === 'NOTES-CONTAINER' || tab === 'TASKS-CONTAINER'))) && 
                <InputText query={query} setQuery={setQuery}/>}
                {((notes.length > 2 && (tab === 'NOTES-CONTAINER' || tab === 'TASKS-CONTAINER'))) &&  
                        <CustomButton className='btn-container' 
                            type="img" 
                            value={showSearch? CloseSVG : SearchSVG} 
                            eventHandlers={SearchButtonEvents}/>}                           
                </div>

                {/* Extra Buttons */}
                    {tab === 'VIEWER' && 
                    <CustomButton className="btn-container" 
                        type="img" value={EditSVG} 
                        eventHandlers={{onClick: () => editNote()}}/>}
                    {tab === 'VIEWER' && 
                    <CustomButton className="btn-container" 
                        type="img" value={TrashSVG} 
                        eventHandlers={{onClick: () => deleteNote()}}/>}
                    {tab === 'EDITOR' && 
                    <CustomButton className="btn-container" 
                        type="img" value={SaveSVG} 
                        eventHandlers={{onClick: () => saveNote()}}/>}
                    {tab === 'NOTES-CONTAINER' && deletePhase && 
                    <CustomButton className="btn-container" 
                        type="img" value={Close2SVG} 
                        eventHandlers={{onClick: () => setDeletePhase(false)}}/>}       
            </div>
        </nav>

        /* <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */
    )
}

export default React.memo(Navbar)
