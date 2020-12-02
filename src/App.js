import React, {useState, useCallback, useEffect} from 'react'
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
  const [query, changeQuery] = useState('')
  const [showSearch, changeSearch] = useState(false)
  const [currentNote, changeCurrentNote] = useState(null)
  const [deletePhase, changeDeletePhase] = useState(false)
  const [floatWindow, changeFloatWindow] = useState(false)

  // Create Function Only Once, to prevent unnecessary renders
  const setTab = useCallback((val) => { changeTab(val) }, [])
  const setQuery = useCallback((val) => { changeQuery(val) }, [])
  const setSearch = useCallback((val) => { changeSearch(val) }, [])
  const setCurrentNote = useCallback((val) => { changeCurrentNote(val) }, [])
  const setText = useCallback((val) => { changeText(val) }, [])
  const setDeletePhase = useCallback((val) => { changeDeletePhase(val) }, [])
  const setFloatWindow = useCallback((val) => { changeFloatWindow(val) }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({tab: tab, NotesData: [...notes], TasksData: [...tasks]}))
  }, [notes, tasks, tab])

  useEffect(() => {
    if(notes.length === 0 || tab !== 'NOTES-CONTAINER') setDeletePhase(false)
  }, [notes.length, tab, setDeletePhase])

  const showTab = () => {
    switch(tab){
      case 'NOTES-CONTAINER':
        return <Notes notes={notes} query={query} deletePhase={deletePhase} setNotes={setNotes}
        setTab={setTab} setCurrentNote={setCurrentNote} setDeletePhase={setDeletePhase}/>
      case 'TASKS-CONTAINER':
        return <Tasks tasks={tasks} query={query} floatWindow={floatWindow} setFloatWindow={setFloatWindow} setTasks={setTasks}/>
      case 'EDITOR':
        return <EditNote text={text} setText={setText} currentNote={currentNote} setCurrentNote={setCurrentNote}/>  
      case 'VIEWER':
        return <Viewer currentNote={currentNote}/> 
      default: 
        console.log(`${tab} does not exist`)
        break;
    }
  }
  
  return (
          <div className="app-grid">
            <Navbar query={query} currentNote={currentNote} notes={notes} showSearch={showSearch} 
            tab={tab} text={text} deletePhase={deletePhase}
            setCurrentNote={setCurrentNote} setNotes={setNotes} setSearch={setSearch} 
            setTab={setTab} setText={setText} setQuery={setQuery} setDeletePhase={setDeletePhase}/>
            <section> {showTab()} </section>
            <FloatButton tab={tab} floatWindow={floatWindow} 
              setTab={setTab} setCurrentNote={setCurrentNote} 
              setText={setText} setFloatWindow={setFloatWindow}/>
          </div>
  );
}

export default React.memo(App);