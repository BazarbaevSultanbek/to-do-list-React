import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calendar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { CHECKED_TASK } from '../../store/reducers/listReducer';

function CalendarPage() {
  const [value, onChange] = useState<Date | Date[]>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.lists.tasks);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hasTasksForDate = (date: Date) => {
    const formattedDate = formatDate(date);
    const tasksForDate = tasks.filter((task) => task.date === formattedDate);
    return tasksForDate.length > 0;
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderTaskList = () => {
    if (!selectedDate) {
      return null;
    }

    const formattedDate = formatDate(selectedDate);
    const tasksForDate = tasks.filter((task) => task.date === formattedDate);

    if (tasksForDate.length === 0) {
      return <p>No events</p>;
    }

    return (
      <ul>
        {tasksForDate.map((task) => (
          <li key={task.id}>
            <div>
              <input type="checkbox" className="form-check-input" id="flexCheckDefault"
                style={{
                  background: task.checked ? 'rgb(193, 193, 193)' : 'var(--bs-form-check-bg)',
                  border: task.checked ? "none" : 'var(--bs-border-width) solid var(--bs-border-color)'
                }}
                onChange={(e) => AddcheckedTask(e.target.checked, task.id)}
                checked={task.checked} />
              <span style={{
                color: task.checked ? 'grey' : "black",
                textDecoration: task.checked ? 'line-through' : 'none'
              }}>{task.text}</span>
            </div>
            <div className='task-tools'>
              <div className="task-tools-time">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>{task.time[0].hour}:{task.time[0].minute}</span>
              </div>
              <div className='task-tools-subtask'>
                <span style={{ display: task.subtask.length !== 0 ? "block" : "none" }}><span>{task.subtask.length !== 0 ? task.subtask.length : ""}</span></span>
                <span>{task.subtask.length !== 0 ? `Subtasks` : ""}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const AddcheckedTask = (status: boolean, taskId: number) => {
    dispatch(CHECKED_TASK({ checked: status, id: taskId }));
  };
  return (
    <div className='Calendar'>
      <div className="Calendar-container">
        <h1 className='Calendar-logo'>Calendar</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Calendar
              onChange={(value) => onChange(value as Date | Date[])}
              value={value as any}
              tileContent={({ date, view }) =>
                view === 'month' && hasTasksForDate(date) ? <div className="dot" /> : null
              }
              onClickDay={(date) => handleDayClick(date as Date)}
            />
          </div>
          {selectedDate && (
            <div className="Calendar-tasks">
              <h2>Tasks</h2>
              {renderTaskList()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;

interface RootState {
  lists: {
    tasks: Task[];
  };
}

interface Task {
  time: any;
  subtask: any;
  checked: any;
  text: string;
  date: string;
  id: number;
}
