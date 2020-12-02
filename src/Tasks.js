import React from 'react'
import TaskBox from './Component/TaskBox'
import FloatBox from './Component/FloatBox'

function Tasks({tasks, setTasks, query, floatWindow, setFloatWindow}) {
    
    const displayTasks = () => {
        if(tasks.length === 0) {
            return <div className="message"> <span>You haven't created any tasks</span> </div>
        } else {
            const temp = [...tasks]
            let completedTasks = []
            let uncompletedTasks = []
            temp.forEach(task => task.done? completedTasks.push(task) : uncompletedTasks.push(task))
            const newArray = [...completedTasks, ...uncompletedTasks]

            return newArray.filter(task => (task.text.toLowerCase().search(query.toLowerCase()) !== -1) && task)
            .reverse().map(data => 
            <TaskBox key={data.id} data={data} setTasks={setTasks} tasks={tasks}/>)
        }
    }
    return (
        <>
        <div className="tasks-container scroll">
            {displayTasks()}
        </div>
        {floatWindow && <FloatBox tasks={tasks} floatWindow={floatWindow} setTasks={setTasks} setFloatWindow={setFloatWindow}/>}
        </>
    )
}

export default React.memo(Tasks)