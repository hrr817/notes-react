import React, {useEffect, useState} from 'react'
import TaskBox from './Component/TaskBox'
import FloatBox from './Component/FloatBox'
import {AnimatePresence, motion} from 'framer-motion'

function Tasks({tasks, setTasks, query, floatWindow, setFloatWindow}) {
    const [sortedTasks, setSortedTasks] = useState([])
    let delay = -0.15;

    useEffect(() => {
        if(tasks.length !== 0) {
            const temp = [...tasks];
            let completedTasks = [];
            let uncompletedTasks = [];
            temp.forEach(task => task.done? completedTasks.push(task) : uncompletedTasks.push(task));
            setSortedTasks([...completedTasks, ...uncompletedTasks]);
        }
    }, [tasks])

    return (
        <>
        <motion.div className="tasks-container scroll"
            initial={{ x: '100vw'}} 
            animate={{ x: 0}}
            exit={{ x: '100vw'}}
            transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60}}>
        {(tasks.length === 0) && <motion.div className="message"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60}}> 
            <span>You haven't created any tasks</span> 
        </motion.div>}

        <AnimatePresence>
            {(tasks.length !== 0) &&
            sortedTasks.filter(task => (task.text.toLowerCase().search(query.toLowerCase()) !== -1) && task)
            .reverse().map(data => 
            <TaskBox key={data.id} data={data} setTasks={setTasks} tasks={tasks} delay={delay += 0.15}/>) }
        </AnimatePresence>
        </motion.div>

        <AnimatePresence>
        {floatWindow && <FloatBox tasks={tasks} floatWindow={floatWindow} setTasks={setTasks} setFloatWindow={setFloatWindow}/>}
        </AnimatePresence>
        </>
    )
}

export default React.memo(Tasks)