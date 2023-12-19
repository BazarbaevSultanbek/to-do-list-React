import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CHECKED_TASK } from '../../store/reducers/listReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Today.scss'

function Today({ setShowAddTask, setSelectedTask }) {
    let tasks = useSelector(state => state?.lists.tasks)
    let lists = useSelector(state => state?.lists.lists)
    const dispatch = useDispatch()
    const today = new Date().getFullYear() + `-` + (new Date().getMonth() + 1) + `-` + String(new Date().getDate()).padStart(2, `0`);
    const [taskNumber, setTaskNumber] = useState(0)


    const handleAddTask = () => {
        setSelectedTask(null)
        setShowAddTask(() => true);
    }
    const handleAddShow = (task) => {
        setSelectedTask(task);
        setShowAddTask(true);
    };
    const AddcheckedTask = (status, taskId) => {
        dispatch(CHECKED_TASK({ checked: status, id: taskId }))
        setShowAddTask(false);
    }
    const handleCheckedTask = (task) => {
        setSelectedTask(task);
        setShowAddTask(true);
    }

    // Number of Today's tasks
    const TaskNumber = () => {
        let count = 0
        tasks.map((task) => {
            if (task.date === today && !task.checked) {
                count++
            }
        })
        setTaskNumber(count)
    }
    useEffect(() => {
        TaskNumber();
    }, [tasks]);
    ////

    return (
        <div className='Today'>
            <div className="Today-container">
                <div className="Today-logo">
                    <h1>Today</h1>
                    <span>{taskNumber}</span>
                </div>
                <div className="Today-block">
                    <div className="Today-block-add" onClick={() => handleAddTask()}>
                        <i className="fa-solid fa-plus"></i>
                        <span>Add New Task</span>
                    </div>
                    <ul className='Today-block-ul'>
                        {
                            tasks.map((task) => {
                                if (task.date === today && !task.checked) {
                                    return (
                                        <li key={task.id || 'default-key'} onClick={() => handleAddShow(task)}>
                                            <div className='task-flex'>
                                                <div>
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => { AddcheckedTask(e.target.checked, task.id) }} />
                                                    <span>{task.text}</span>
                                                </div>
                                                <div>
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </div>
                                            </div>
                                            <div className='task-tools'>
                                                <div className="task-tools-time">
                                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                                    <span>{task.time[0].hour}:{task.time[0].minute}</span>
                                                </div>
                                                {
                                                    lists.map((list) => {
                                                        if (String(list.id) === task.list) {
                                                            return (

                                                                <div key={list.id} className='task-tools-list'>
                                                                    <span style={{ backgroundColor: list.color }}></span>
                                                                    <p>{list.title}</p>
                                                                </div>

                                                            );
                                                        }
                                                    })
                                                }
                                                <div className='task-tools-subtask'>
                                                    <p style={{ display: task.subtask.length !== 0 ? "block" : "none" }}><span>{task.subtask.length !== 0 ? task.subtask.length : ""}</span></p>
                                                    <span>{task.subtask.length !== 0 ? `Subtasks` : ""}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                } else return null;
                            })
                        }
                        {
                            tasks.map(task => {
                                if (task.date === today && task.checked) {
                                    return (
                                        <li key={task.id || 'default-key'} onClick={() => handleCheckedTask(task)}>
                                            <div className='task-flex'>
                                                <div>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                        style={{
                                                            background: 'rgb(193, 193, 193)',
                                                            color: "white",
                                                            border: "none"
                                                        }}
                                                        checked={task.checked}
                                                        onChange={(e) => { AddcheckedTask(e.target.checked, task.id) }} />
                                                    <span
                                                        style={{
                                                            color: 'grey',
                                                            textDecoration: 'line-through'
                                                        }}>{task.text}</span>
                                                </div>
                                                <div>
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </div>
                                            </div>
                                            <div className='task-tools'>
                                                <div className="task-tools-time">
                                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                                    {task.time[0].hour}:{task.time[0].minute}
                                                </div>
                                                {
                                                    lists.map((list) => {
                                                        if (String(list.id) === task.list) {
                                                            return (
                                                                <div key={list.id} className='task-tools-list'>
                                                                    <span style={{ backgroundColor: list.color }}></span>
                                                                    <p>{list.title}</p>
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                }
                                                <div className='task-tools-subtask'>
                                                    <p style={{ display: task.subtask.length !== 0 ? "block" : "none" }}><span>{task.subtask.length !== 0 ? task.subtask.length : ""}</span></p>
                                                    <span>{task.subtask.length !== 0 ? `Subtasks` : ""}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Today