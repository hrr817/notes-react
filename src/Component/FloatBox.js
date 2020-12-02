import React, {useRef, useEffect} from 'react'
import uuid from 'react-uuid'
import './FloatBox.css'

const FloatBox = ({tasks, floatWindow, setTasks, setFloatWindow}) => {

    const ref = useRef()
    useEffect(() => {
        ref.current.focus()
    },[])

    const clickHandler = () => {
        const value = ref.current.value
        if(value=== '') return
        const date = new Date()
        let newTask = {
            id: uuid(),
            created: `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`,
            text: value,
            done: false
        }
        const newTasklist = [...tasks, newTask]
        setTasks(newTasklist)
        setFloatWindow(!floatWindow)
    }

    return (
        <div className="float-box-container">
            <textarea ref={ref}></textarea>
            <div>
                <button onClick={() => clickHandler()}>Add</button>
            </div>
        </div>
    )
}

export default FloatBox
