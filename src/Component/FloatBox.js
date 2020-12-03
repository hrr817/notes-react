import React, {useRef, useEffect, useState} from 'react'
import uuid from 'react-uuid'
import {motion} from 'framer-motion'
import './FloatBox.css'

const FloatBox = ({tasks, floatWindow, setTasks, setFloatWindow}) => {

    const [placeholder, setPlaceholder] = useState('')

    const ref = useRef()
    useEffect(() => {
        ref.current.focus()
    },[])

    const clickHandler = () => {
        const value = ref.current.value
        if(value === '') {
            setPlaceholder('Try writing something...')
            return
        }
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
        <motion.div className="float-box-container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{type: 'spring', bounce: 0.1, mass: 1, stiffness: 55 }}>
            <motion.div
            initial={{ opacity: 0, scale: 0}} 
            animate={{ opacity: 1, scale: 1}}
            exit={{ opacity: 0, scale: 0}}
            transition={{type: 'spring', bounce: 0.1, mass: 1, stiffness: 55 }}>
            <textarea ref={ref} placeholder={[placeholder]}></textarea>
            <div className="add-button-container">
                <button onClick={() => clickHandler()}>Add</button>
            </div>
            </motion.div>
        </motion.div>
    )
}

export default FloatBox
