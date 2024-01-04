import { useDispatch, useSelector } from 'react-redux';
import { CHECKED_TASK } from '../../store/reducers/listReducer';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Upcoming.scss';

function Upcoming({ setShowAddTask, setSelectedTask, showAddTask }) {
  const dispatch = useDispatch();
  let tasks = useSelector(state => state?.lists.tasks)
  let lists = useSelector(state => state?.lists.lists)

  //today
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  //tomorrow
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const tomorrow = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  console.log(tomorrow);

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

  const getCurrentWeekNumber = () => {
    const startOfWeek = new Date(new Date().getFullYear(), 0, 1);
    const days = Math.floor((new Date() - startOfWeek) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfWeek.getDay() + 1) / 7);
    return weekNumber;
  };

  const taskWeekNumber = (date) => {
    const startOfWeek = new Date(new Date().getFullYear(), 0, 1);
    const days = Math.floor((new Date(date) - startOfWeek) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfWeek.getDay() + 1) / 7);

    return getCurrentWeekNumber() - weekNumber;

  };
  const isTaskInCurrentWeek = (date) => {
    return taskWeekNumber(date) === 0;
  };


  return (
    <div className='Come'>
      <div className="Come-container">
        <div className="Come-logo">
          <h1>Upcoming</h1>
          <span>1</span>
        </div>
        <div className="Come-block" style={{ width: showAddTask ? '500px' : '800px' }}>
          <div className="Come-block-today" style={{ width: showAddTask ? '500px' : '780px' }}>
            <h3>Today</h3>
            <div className="Come-block-today-add" style={{ width: showAddTask ? '450px' : '750px' }} onClick={() => handleAddTask()}>
              <i className="fa-solid fa-plus"></i>
              <span>Add New Task</span>
            </div>
            <ul className='Come-block-today-ul' style={{ width: showAddTask ? '450px' : '750px' }}>
              {
                tasks.map((task) => {
                  if (task.date === today && !task.checked) {
                    return (
                      <li key={task.id || 'default-key'} onClick={() => handleAddShow(task)} style={{ width: showAddTask ? '450px' : '750px' }}>
                        <div className='task-flex' style={{ width: showAddTask ? '430px' : '730px' }}>
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
                tasks.map((task) => {
                  if (task.date === today && task.checked) {
                    return (
                      <li key={task.id || 'default-key'} onClick={() => handleAddShow(task)} style={{ width: showAddTask ? '450px' : '750px' }}>
                        <div className='task-flex' style={{ width: showAddTask ? '430px' : '730px' }}>
                          <div>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
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
                              }}
                            >{task.text}</span>
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
            </ul>
          </div>
          <div className="Come-block-tomorrow">
            <h3>Tomorrow</h3>
            <div className="Come-block-tomorrow-add" onClick={() => handleAddTask()}>
              <i className="fa-solid fa-plus"></i>
              <span>Add New Task</span>
            </div>
            <ul className='Come-block-tomorrow-ul'>
              {
                tasks.map((task) => {
                  if (task.date === tomorrow && !task.checked) {
                    return (
                      <li key={task.id || 'default-key'} onClick={() => { handleAddShow(task) }}>
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
                tasks.map((task) => {
                  if (task.date === tomorrow && task.checked) {
                    return (
                      <li key={task.id || 'default-key'} onClick={() => { handleAddShow(task) }}>
                        <div className='task-flex'>
                          <div>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
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
                              }}
                            >{task.text}</span>
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
            </ul>
          </div>
          <div className="Come-block-week">
            <h3>This Week</h3>
            <div className="Come-block-week-add" onClick={() => handleAddTask()}>
              <i className="fa-solid fa-plus"></i>
              <span>Add New Task</span>
            </div>
            <ul className='Come-block-week-ul'>
              {
                tasks.map((task) => {
                  if (isTaskInCurrentWeek(task.date) && !task.checked) {
                    return (
                      <li key={task.id || 'default-key'} onClick={() => { handleAddShow(task) }}>
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
                          <div className="task-tools-date">
                            <div>
                              <i className="fa-solid fa-calendar-xmark"></i>
                              <span>{task.date}</span>
                            </div>
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
                tasks.map((task) => {
                  if (isTaskInCurrentWeek(task.date) && task.checked) {
                    return (
                      <li key={task.id || 'default-key'} onClick={() => { handleAddShow(task) }}>
                        <div className='task-flex'>
                          <div>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
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
                              }}
                            >{task.text}</span>
                          </div>
                          <div>
                            <i className="fa-solid fa-chevron-right"></i>
                          </div>
                        </div>
                        <div className='task-tools'>
                          <div className="task-tools-date">
                            <div>
                              <i className="fa-solid fa-calendar-xmark"></i>
                              <span>{task.date}</span>
                            </div>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
