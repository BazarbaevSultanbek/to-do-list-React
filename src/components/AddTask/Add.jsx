import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TASK, CHANGE_TASK, DELETE_TASK, ADD_SUB, DELETE_SUBTASK, NEW_SUB_CHECKED, CANCEL_SUB, UNCHECKED_TASK } from '../../store/reducers/listReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Add.scss'


//// checked in lists : done
//// upcoming : done
//// addd time
//// sticky wall

function Add({ ShowAddTask, SetShowAddTask, selectedTask, setSelectedTask }) {

    /// Reducer variables
    let lists = useSelector(state => state?.lists.lists)
    let tasks = useSelector(state => state?.lists)
    let subTasks = useSelector(state => state?.lists.subtasks)
    const dispatch = useDispatch()
    ////
    console.log(tasks);

    /// exist task constants
    const [task, setTask] = useState('')
    const [desc, setDesc] = useState('default')
    const [taskId, setTaskId] = useState(null)
    const [statusId, setStatus] = useState(null)
    const [date, setDate] = useState('')
    const [SubTask, setSubTask] = useState(null)
    const [checkedTask, setCheckedTask] = useState(null)

    const [subModule, setSubModule] = useState(false)
    const [newSubTask, setNewSubTaskVal] = useState('')


    //////

    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)

    const Time = () => {
        return [{
            hour: String(hour).padStart(2, '0'),
            minute: String(minute).padStart(2, '0')
        }];
    };

    // Task functions
    const addNewTask = () => {
        if (task.trim() === "" || date.trim() === "" || task.length === 0 || date.length === 0 || hour.length > 2 || minute.length > 2 || hour > 23 || minute > 59 || minute.length === 0 || hour.length === 0) return null;
        else {
            dispatch(ADD_TASK({ text: task.trim(), desc: desc.trim(), list: statusId, date: date, time: Time() }))
            setTask('')
            setDesc('')
            setDate('')
            setHour(0)
            setMinute(0)
            setStatus('default')

        }
    }
    const ChangeTask = () => {
        if (task.trim() === "" || date.trim() === "" || task.length === 0 || date.length === 0 || hour.length > 2 || minute.length > 2 || hour > 23 || minute > 59 || minute.length === 0 || hour.length === 0) return null;
        else {
            dispatch(CHANGE_TASK({ text: task.trim(), desc: desc.trim(), list: statusId, date: date, id: selectedTask.id, sub: SubTask, time: Time() }))
            setTask('')
            setDesc('')
            setDate('')
            setHour(0)
            setMinute(0)
            setStatus(null)
            setSubTask(null)
            SetShowAddTask(false)
        }
    }
    const CancelTask = () => {
        SetShowAddTask(false);
        setTask('')
        setDesc('')
        setDate('')
        setHour(0)
        setMinute(0)
        setTaskId(null)
        setStatus(null)
        setSubTask(null)
        setSelectedTask(null)
        dispatch(CANCEL_SUB())
    }
    const delTask = () => {
        dispatch(DELETE_TASK({ id: selectedTask.id }))
        setTask('')
        setDesc('')
        setDate('')
        setHour(0)
        setMinute(0)
        setStatus(null)
        setSubTask(null)
    }

    const DelBtnText = () => {
        if (selectedTask !== null && !selectedTask.checked) {
            return 'Delete Task'
        } else if (checkedTask) {
            return 'Cancel'
        } else {
            return 'Cancel Task'
        }
    }
    const SaveBtnText = () => {
        if (selectedTask !== null && !selectedTask.checked) {
            return 'Save changes'
        } else if (checkedTask) {
            return 'Mark as Undone'
        } else {
            return 'Add Task'
        }
    }
    const UncheckedTask = (taskId) => {
        SetShowAddTask(false)
        dispatch(UNCHECKED_TASK(taskId))
    }
    // Subtasks functions
    const addSubTask = () => {
        if (newSubTask.trim() === "" || newSubTask.length === 0) return null;
        else {
            dispatch(ADD_SUB({ text: newSubTask.trim() }))
            setSubModule(false)
            setNewSubTaskVal('')

        }
    }
    const SubTaskChecked = (status, id) => {
        setSubTask(SubTask.map((subtask) => ({
            ...subtask,
            checked: subtask.id === id ? status : subtask.checked
        })))
    }
    const delSubTask = (id) => {
        dispatch(DELETE_SUBTASK({ id: id }))
        setSubTask((prevSubTask) => prevSubTask.filter((subtask) => subtask.id !== id));
    }
    const NewSubChecked = (status, id) => {
        dispatch(NEW_SUB_CHECKED({ status: status, id: id }))
    }
    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask.text);
            setDesc(selectedTask.desc);
            setTaskId(selectedTask.id)
            setStatus(selectedTask.list);
            setDate(selectedTask.date);
            setHour(selectedTask.time[0].hour)
            setMinute(selectedTask.time[0].minute)
            setSubTask(selectedTask.subtask);
            setCheckedTask(selectedTask.checked);
        } else {
            setTask('');
            setDesc('');
            setTaskId(null)
            setStatus(null);
            setDate('');
            setHour(0)
            setMinute(0)
            setSubTask('');
            setCheckedTask(false);
        }
    }, [selectedTask]);


    return (
        <div className='Add' style={{ display: ShowAddTask ? 'block' : 'none' }}>
            <div className="Add-container">
                <div className="Add-block">
                    <div className="Add-block-logo">
                        <h2>Task:</h2>
                        <button onClick={() => CancelTask()}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="Add-block-task">
                        <input type="text" placeholder='Task' onChange={(e) => setTask(e.target.value)} value={task} readOnly={checkedTask} />
                    </div>
                    <div className="Add-block-desc">
                        <textarea name="desc" id="desc" cols="30" rows="10" placeholder='Description' onChange={(e) => setDesc(e.target.value)} value={desc} readOnly={checkedTask}></textarea>
                    </div>
                    <div className="Add-block-navi">
                        <ul>
                            <li><span>List</span></li>
                            <li><span>Due date</span></li>
                            <li><span>Time</span></li>
                        </ul>
                        <ul>
                            <li>
                                <select name="list" id="list" onChange={(e) => setStatus(e.target.value)} value={statusId !== null ? statusId : "default"} disabled={checkedTask}>
                                    <option value="default">default</option>
                                    {
                                        lists.map((list) => (
                                            list && (
                                                <option key={list.id} value={list.id}>{list.title}</option>
                                            )
                                        ))
                                    }
                                </select>
                            </li>
                            <li><input type="date" onChange={(e) => setDate(e.target.value)} value={date} readOnly={checkedTask} /></li>
                            <li id='time'>
                                <input type="number" id='time_input' min={0} max={23} onChange={(e) => setHour(e.target.value)} value={hour} readOnly={checkedTask} />
                                <span>:</span>
                                <input type="number" id='time_input' min={0} max={59} onChange={(e) => setMinute(e.target.value)} value={minute} readOnly={checkedTask} />
                            </li>
                        </ul>
                    </div>
                    <div className="Add-block-sub">
                        <h2>Subtasks:</h2>
                        <div className="Add-block-sub-plus" onClick={() => !checkedTask ? setSubModule(true) : ""}>
                            <i className="fa-solid fa-plus"></i>
                            <span>Add New Subtask</span>
                        </div>
                        <div className="Add-block-sub-list">
                            <ul>
                                {
                                    subTasks.map((item) => (
                                        <li key={item.id}>
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="flexCheckDefault"
                                                    onChange={(e) => NewSubChecked(e.target.checked, item.id)}
                                                />
                                                <span
                                                    style={{
                                                        textDecoration: item.checked ? 'line-through' : 'none',
                                                        color: item.checked ? 'grey' : 'black'
                                                    }}>{item.text}</span>
                                            </div>
                                            <button onClick={() => delSubTask(item.id)}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </li>
                                    ))
                                }
                                {
                                    /// subTasks from exist Task
                                    SubTask !== null && SubTask.length !== 0 ? SubTask.map((subtask) => (
                                        subtask && (
                                            <li key={subtask.id}>
                                                <div>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`flexCheckDefault-${subtask.id}`}
                                                        readOnly={checkedTask}
                                                        onChange={(e) => { SubTaskChecked(e.target.checked, subtask.id) }}
                                                        checked={subtask.checked}
                                                    />
                                                    <span style={{
                                                        textDecoration: subtask.checked ? 'line-through' : 'none',
                                                        color: subtask.checked ? 'grey' : 'black'
                                                    }}>{subtask.text}</span>
                                                </div>
                                                <button onClick={() => !checkedTask ? delSubTask(subtask.id) : ""}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </li>
                                        )
                                    ))
                                        : null
                                }
                            </ul>
                        </div>
                        <div className="sub-module" style={{ display: subModule ? "block" : "none" }}>
                            <div className="sub-module-block">
                                <div className="sub-module-inner">
                                    <button id='module-cancel' onClick={() => setSubModule(false)}><i className="fa-solid fa-xmark"></i></button>
                                    <p>Add New SubTask</p>
                                    <input type="text"
                                        placeholder='SubTask Name'
                                        onChange={(e) => setNewSubTaskVal(e.target.value)}
                                        autoComplete="off"
                                        value={newSubTask} />
                                    <div>
                                        <button id='add-sub' className='btn btn-outline-primary save-button' onClick={addSubTask}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Add-block-bottom">
                        <button type="button" className="btn btn-outline-primary delete-button" onClick={selectedTask !== null && !checkedTask ? delTask : checkedTask === true ? CancelTask : CancelTask}>{DelBtnText()}</button>
                        <button type="button" className="btn btn-outline-primary save-button" onClick={() => selectedTask !== null ? ChangeTask() : checkedTask === true ? () => UncheckedTask(taskId) : addNewTask()}>{SaveBtnText()}</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add