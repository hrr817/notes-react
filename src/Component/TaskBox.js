import React from 'react'
import {motion} from 'framer-motion'
import './TaskBox.css'

const TaskBox = ({data, tasks, setTasks, delay}) =>  {
    const {id, done, text, created} = data

    const changeHandler = () => {
        const temp = [...tasks]
        let index = undefined
        let toggledTask = {}
        for(let i = 0; i < temp.length; i++) {
            if(tasks[i].id === id){
                index = i
                toggledTask = {id: id, text: text, created: created, done: !done}
            }
        }
        temp.splice(index, 1, toggledTask)
        setTasks(temp)
    }

    const removeTask = () => {
        const temp = [...tasks]
        let index = null
        let p1 = []
        let p2 = []
        let newArray = [];
        if(temp.length < 2) setTasks(newArray)

        for(let i = 0; i < temp.length; i++){
            if(temp[i].id === id){
                index = i
                break
            }
        }
        p1 = temp.slice(0, index)
        p2 = temp.slice(index + 1, temp.length)
        newArray = p1.concat(p2)
        setTasks(newArray)
    }

    return (
        <motion.div className={`task-box ${done && 'done'}`}
        initial={{ opacity: 0, scale: 0}}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: 0}}
        whileTap={{scale: 0.9}}
        transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60, delay: delay}}>
            <span className="checkbox"> <input type="checkbox" onChange={(e) => changeHandler(e)} checked={done}/> </span>
            <span className="text"> {text} </span>
            <span className="delete"> <button onClick={() => removeTask()}> × </button> </span>
        </motion.div>
    )
}

export default React.memo(TaskBox)