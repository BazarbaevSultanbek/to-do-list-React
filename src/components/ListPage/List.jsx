import { useDispatch, useSelector } from "react-redux";
import { CHECKED_TASK } from "../../store/reducers/listReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./List.scss";
import { useEffect } from "react";

function List({ setShowAddTask, setSelectedTask, listId }) {
    let lists = useSelector((state) => state?.lists.lists);
    const dispatch = useDispatch()
    const today = new Date().getFullYear() + `-` + (new Date().getMonth() + 1) + `-` + String(new Date().getDate()).padStart(2, `0`);

    const handleAddTask = () => {
        setSelectedTask(null);
        setShowAddTask(() => true);
    };
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
    return (
        <div className="List">
            <div className="List-container">
                <div className="List-container">
                    <div className="List-logo">
                        <h1>
                            {lists.map((item) => (item.id === listId ? item.title : ""))}
                        </h1>
                        <span>
                            {lists.map((item) => item.id === listId ? item.tasks.length : "")}
                        </span>
                    </div>
                    <div className="List-block">
                        <div className="List-block-add" onClick={() => handleAddTask()}>
                            <i className="fa-solid fa-plus"></i>
                            <span>Add New Task</span>
                        </div>
                        <ul className="List-block-ul">
                            {
                                lists.map((list) => {
                                    if (list.id !== listId) return null;
                                    else return list.tasks.map((task) => {
                                        return (
                                            !task.checked ?
                                                <li key={task.id || 'default-key'} onClick={() => handleAddShow(task)}>
                                                    <div className='task-flex'>
                                                        <div>
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => AddcheckedTask(e.target.checked, task.id)} />
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
                                                        <div className="task-tools-date">
                                                            {task.date !== today ? (
                                                                <div>
                                                                    <i className="fa-solid fa-calendar-xmark"></i>
                                                                    <span>{task.date}</span>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className='task-tools-subtask'>
                                                            <p style={{ display: task.subtask.length !== 0 ? "block" : "none" }}><span>{task.subtask.length !== 0 ? task.subtask.length : ""}</span></p>
                                                            <span>{task.subtask.length !== 0 ? `Subtasks` : ""}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                : null
                                        )

                                    })

                                })
                            }
                            {
                                lists.map((list) => {
                                    if (list.id === listId) return list.tasks.map((task) => (
                                        task.checked ?
                                            <li key={task.id || 'default-key'} onClick={() => handleCheckedTask(task)}>
                                                <div className='task-flex'>
                                                    <div>
                                                        <input className="form-check-input"
                                                            type="checkbox"
                                                            id="flexCheckDefault"
                                                            style={{
                                                                background: 'rgb(193, 193, 193)',
                                                                color: "white",
                                                                border: "none"
                                                            }}
                                                            onChange={(e) => AddcheckedTask(e.target.checked, task.id)}
                                                            checked={task.checked}
                                                        />
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
                                                        <i class="fa-solid fa-clock-rotate-left"></i>
                                                        <span>{task.time[0].hour}:{task.time[0].minute}</span>
                                                    </div>
                                                    <div className="task-tools-date">
                                                        {task.date !== today ? (
                                                            <div>
                                                                <i class="fa-solid fa-calendar-xmark"></i>
                                                                <span>{task.date}</span>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className='task-tools-subtask'>
                                                        <p style={{ display: task.subtask.length !== 0 ? "block" : "none" }}>
                                                            <span>{task.subtask.length !== 0 ? task.subtask.length : ""}</span>
                                                        </p>
                                                        <span>{task.subtask.length !== 0 ? `Subtasks` : ""}</span>
                                                    </div>
                                                </div>

                                            </li>
                                            : null
                                    ))

                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
