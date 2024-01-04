import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_LIST, DELETE_LIST } from '../../store/reducers/listReducer';


import Add from '../AddTask/Add';
import CalendarPage from '../Calendar/Calendar';
import List from '../ListPage/List';
import Settings from '../Settings/Settings';
import Today from '../Today/Today';
import Upcoming from '../Upcoming/Upcoming';
import Wall from '../Wall/Wall';
import "./MainPage.scss";

function MainPage() {
  // Get information from Reducer
  let lists = useSelector(state => state?.lists.lists)
  let tasks = useSelector(state => state?.lists.tasks)
  let walls = useSelector(state => state?.lists.walls)
  const dispatch = useDispatch()

  // For open the page
  const [page, setPage] = useState('Today')
  const [background, setBackground] = useState("")

  // For open the module and add New List
  const [addModule, setAddModule] = useState(false)
  const [newList, setNewListVal] = useState("")


  // For show the Add page
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  // For list banner color
  const [selectedColor, setSelectedColor] = useState(null);
  const colorOptions = ["#ff6b6b", "#da77f2", "#9775fa", "#5c7cfa", "#66d9e8", "#8ce99a", "#ffd43b", "#ff922b"];

  // Give info list
  const [listId, setlistId] = useState(null)

  const AddList = () => {
    const lowername = newList.toLocaleLowerCase()
    if (newList.trim() === "" || selectedColor === null) return null;
    else if (lists.some(list => list.title === lowername)) return null;
    else {
      dispatch(ADD_LIST({ title: lowername, color: selectedColor }))
      setAddModule(false)
      setNewListVal('')
      setSelectedColor(null)
    }
  }
  const DeleteList = (id) => {
    dispatch(DELETE_LIST({ id: id }))
  }
  const ChangePage = () => {
    switch (page) {
      case "Upcoming":
        return <Upcoming setShowAddTask={setShowAddTask} setSelectedTask={setSelectedTask} showAddTask={showAddTask} />
      case 'Today':
        return <Today setShowAddTask={setShowAddTask} setSelectedTask={setSelectedTask} />
      case 'List':
        return <List setShowAddTask={setShowAddTask} setSelectedTask={setSelectedTask} listId={listId} />
      case 'Wall':
        return <Wall />
      case 'Calendar':
        return <CalendarPage />
      case 'Settings':
        return <Settings background={background} setBackground={setBackground} />
      default:
        break;
    }
  }
  const SignOut = () => {
    localStorage.removeItem("CurrentUser")
  }

  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;
  const [taskNumber, setTaskNumber] = useState(0)

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


  return (
    <div className='MainPage' style={{ backgroundColor: background, width: '100%' }}>
      <div className="MainPage-container">
        <div className="MainPage-block" style={{ justifyContent: showAddTask || page === 'Today' || page === 'List' || page === 'Settings' ? `space-between` : `` }}>
          <div className="MainPage-block-menu" >
            <div className="MainPage-block-menu-logo">
              <h2>Menu</h2>
              <button>
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
            <div className="MainPage-block-menu-search">
              <label htmlFor='search'>
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>
              <input type="text" id='search' name='search' autoComplete='none' placeholder='Search' />
            </div>
            <div className="MainPage-block-menu-tasks">
              <h4 id='menu-little-logo'>Tasks</h4>
              <ul className='MainPage-menu-tasks-ul'>
                <li>
                  <div onClick={() => setPage('Upcoming')}>
                    <i className="fa-solid fa-angles-right"></i>
                    <span>upcoming</span>
                  </div>
                  <div className='notification'><span>{tasks.length}</span></div>
                </li>
                <li>
                  <div onClick={() => setPage('Today')}>
                    <i className="fa-solid fa-list-check"></i>
                    <span>today</span>
                  </div>
                  <div className='notification'><span>{taskNumber}</span></div>
                </li>
                <li>
                  <div onClick={() => setPage('Calendar')}>
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>calendar</span>
                  </div>
                  <div className='notification'></div>
                </li>
                <li>
                  <div onClick={() => setPage('Wall')}>
                    <i className="fa-solid fa-sheet-plastic"></i>
                    <span>sticky wall</span>
                  </div>
                  <div className='notification'><span>{walls.length}</span></div>
                </li>
              </ul>
            </div>
            <div className="MainPage-block-menu-lists">
              <h4 id='menu-little-logo'>lists</h4>
              <ul className="MainPage-menu-lists-ul">
                {lists.map((list, index) => (
                  list && (
                    <li key={index} onClick={() => { setPage('List'), setlistId(list.id) }}>
                      <div>
                        <button id='delete-list' onClick={() => DeleteList(list.id)}><i className="fa-solid fa-xmark"></i></button>
                        <span id="list-color" style={{ backgroundColor: list.color }}></span>
                        <span>{list.title}</span>
                      </div>
                      <div className='notification'><span>{list.tasks.length}</span></div>
                    </li>
                  )
                ))}

              </ul>
              <div className='Main-menu-lists-add' onClick={() => setAddModule(true)}>
                <i className="fa-solid fa-plus"></i>
                <span>Add New List</span>
              </div>
              <div className="List-module" style={{ display: addModule ? "block" : "none" }}>
                <div className="List-module-block">
                  <div className="List-module-inner">
                    <button id='module-cancel' onClick={() => { setAddModule(false), setNewListVal(''), setSelectedColor(null) }}><i className="fa-solid fa-xmark"></i></button>
                    <p>Add New List</p>
                    <input type="text" name='list' id="list" placeholder='List Name' value={newList} onChange={(e) => setNewListVal(e.target.value)} autoComplete="off" />
                    <div>
                      {colorOptions.map((color, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: color,
                            border: selectedColor === color ? '1px solid #000' : 'none',
                          }}
                          onClick={() => setSelectedColor(color)}
                        ></span>
                      ))}
                    </div>
                    <div>
                      <button id='add-list' className='btn btn-outline-primary save-button' onClick={AddList}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="MainPage-block-menu-bottom">
              <div className='settings' onClick={() => setPage('Settings')}>
                <i className="fa-solid fa-sliders"></i>
                <span>Settings</span>
              </div>
              <Link to="/"><div className='sign-out' onClick={SignOut}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Sign out</span>
              </div></Link>
            </div>
          </div>
          <div className='MainPage-block-main' >
            {ChangePage()}
          </div>
          <div className="MainPage-block-add">
            <Add ShowAddTask={showAddTask} SetShowAddTask={setShowAddTask} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
          </div>
        </div>
      </div>
    </div >
  )
}

export default MainPage