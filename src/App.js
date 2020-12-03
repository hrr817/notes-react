import React, {useState, useCallback, useEffect} from 'react'
import {AnimateSharedLayout, AnimatePresence} from "framer-motion"
import './App.css';

/* Data Import*/
import {NotesData, TasksData} from './data'

/* Components */
import Navbar from './Navbar' 
import Notes from './Notes' 
import Tasks from './Tasks' 
import Viewer from './Viewer'
import EditNote from './Component/EditNote';
import FloatButton from './Component/FloatButton';

export const StateContext = React.createContext()

let newData = null;
if(localStorage.getItem('data') === null) {
  localStorage.setItem('data', JSON.stringify({tab: 'NOTES-CONTAINER', NotesData: [...NotesData], TasksData: [...TasksData]}))
} 

newData = localStorage.getItem('data')

function App() {

  const data = JSON.parse(newData)
 
  const [notes, setNotes] = useState(data.NotesData)
  const [tasks, setTasks] = useState(data.TasksData)
  
  const [tab, changeTab] = useState((data.tab === "NOTES-CONTAINER" || data.tab === "TASKS-CONTAINER")? data.tab : 'NOTES-CONTAINER')
  const [text, changeText] = useState('')
  const [placeholderForNotes, changePlaceholderForNotes] = useState('')
  const [query, changeQuery] = useState('')
  const [showSearch, changeSearch] = useState(false)
  const [currentNote, changeCurrentNote] = useState(null)
  const [floatWindow, changeFloatWindow] = useState(false)

  // Create Function Only Once, to prevent unnecessary renders
  const setTab = useCallback((val) => { changeTab(val) }, [])
  const setQuery = useCallback((val) => { changeQuery(val) }, [])
  const setSearch = useCallback((val) => { changeSearch(val) }, [])
  const setCurrentNote = useCallback((val) => { changeCurrentNote(val) }, [])
  const setText = useCallback((val) => { changeText(val) }, [])
  const setFloatWindow = useCallback((val) => { changeFloatWindow(val) }, [])
  const setPlaceholderForNotes = useCallback((val) => { changePlaceholderForNotes(val) }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({tab: tab, NotesData: [...notes], TasksData: [...tasks]}))
  }, [notes, tasks, tab])

  return (
    <AnimateSharedLayout>
    <div className="app-grid">
      <Navbar query={query} currentNote={currentNote} notes={notes} showSearch={showSearch} 
      tab={tab} text={text} setCurrentNote={setCurrentNote} setNotes={setNotes} setSearch={setSearch} 
      setTab={setTab} setText={setText} setQuery={setQuery} setPlaceholderForNotes={setPlaceholderForNotes}/>
      <section>
        {/* Notes */}
        <AnimatePresence>
        {tab === 'NOTES-CONTAINER' && <Notes notes={notes} query={query} setTab={setTab} setCurrentNote={setCurrentNote}/>}  
        </AnimatePresence>
        
        {/* Tasks */}
        <AnimatePresence>
        {tab === 'TASKS-CONTAINER' && <Tasks tasks={tasks} query={query} floatWindow={floatWindow} setFloatWindow={setFloatWindow} setTasks={setTasks}/>}  
        </AnimatePresence> 

        {/* Editor */}
        <AnimatePresence>
        {tab === 'EDITOR' && <EditNote text={text} setText={setText} currentNote={currentNote} setCurrentNote={setCurrentNote} placeholderForNotes={placeholderForNotes}/>}  
        </AnimatePresence> 

        {/* Viewer */}
        <AnimatePresence>
        {tab === 'VIEWER' && <Viewer currentNote={currentNote}/>}  
        </AnimatePresence> 

      </section>
      <FloatButton tab={tab} floatWindow={floatWindow} 
        setTab={setTab} setCurrentNote={setCurrentNote} 
        setText={setText} setFloatWindow={setFloatWindow}/>
    </div>  
    </AnimateSharedLayout>
  );
}

export default React.memo(App);