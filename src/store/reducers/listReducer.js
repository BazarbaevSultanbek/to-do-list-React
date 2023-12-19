import { createSlice } from "@reduxjs/toolkit";

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    subtasks: [],
    tasks: [],
    lists: [],
    walls: [],
  },
  reducers: {
    /// LIST
    ADD_LIST(state, action) {
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            title: action.payload.title,
            id: Math.floor(Math.random() * 1000000),
            tasks: [],
            color: action.payload.color,
          },
        ],
      };
    },
    DELETE_LIST(state, action) {
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload.id),
        tasks: state.tasks.map(task => ({
          ...task,
          list: task.list === action.payload.id ? "default" : task.list,
        }))
      }
    },


    ///// SUBTASK
    ADD_SUB(state, action) {
      return {
        ...state,
        subtasks: [
          ...state.subtasks,
          {
            text: action.payload.text,
            checked: false,
            id: Math.floor(Math.random() * 1000000),
          },
        ],
      };
    },
    DELETE_SUBTASK(state, action) {
      return {
        ...state,
        subtasks: state.subtasks.filter(
          (subtask) => subtask.id !== action.payload.id
        ),
        tasks: state.tasks.map((task) => {
          return {
            ...task,
            subtask: task.subtask.filter(
              (item) => item.id !== action.payload.id
            ),
          };
        }),
      };
    },
    NEW_SUB_CHECKED(state, action) {
      return {
        ...state,
        subtasks: state.subtasks.map((item) => ({
          ...item,
          checked: item.id == action.payload.id ? action.payload.status : item.checked,
        }))
      }
    },
    CANCEL_SUB(state, action) {
      return {
        ...state,
        subtasks: [],
      }
    },

    ///// TASK
    ADD_TASK(state, action) {
      const newTask = {
        text: action.payload.text,
        desc: action.payload.desc,
        list: action.payload.list,
        date: action.payload.date,
        time: action.payload.time,
        subtask: state.subtasks,
        checked: false,
        id: Math.floor(Math.random() * 1000000),
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask], // Use the spread operator to create a new array.
        lists: state.lists.map((list) => {
          if (list.id === parseFloat(action.payload.list)) {
            return {
              ...list,
              tasks: [...list.tasks, newTask], // Use the spread operator here as well.
            };
          } else {
            return list;
          }
        }),
        subtasks: [],
      };
    },
    CHANGE_TASK(state, action) {
      const updatedTask = {
        text: action.payload.text,
        desc: action.payload.desc,
        list: action.payload.list,
        date: action.payload.date,
        time: action.payload.time,
        subtask: [...state.subtasks, ...action.payload.sub],
        checked: false,
        id: action.payload.id,
      };

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? updatedTask : task
        ),
        lists: state.lists.map((list) => {
          if (list.id === parseFloat(action.payload.list)) {
            return {
              ...list,
              tasks: list.tasks.some((task) => task.id === action.payload.id)
                ? list.tasks.map((task) =>
                  task.id === action.payload.id ? updatedTask : task
                )
                : [...list.tasks, updatedTask],
            };
          } else {
            return {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== action.payload.id),
            };
          }
        }),
        subtasks: [],
      };
    },
    DELETE_TASK(state, action) {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        lists: state.lists.map((list) => {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== action.payload.id),
          };
        }),
      };
    },
    CHECKED_TASK(state, action) {
      return {
        ...state,
        tasks: state.tasks.map((task) => ({
          ...task,
          checked: task.id === action.payload.id ? action.payload.checked : task.checked,
        })),
        lists: state.lists.map((list) => ({
          ...list,
          tasks: list.tasks.map((task) => ({
            ...task,
            checked: task.id === action.payload.id ? action.payload.checked : task.checked,
          })),
        })),
      };
    },
    UNCHECKED_TASK(state, action) {
      return {
        ...state,
        tasks: state.tasks.map((task) => ({
          ...task,
          checked: task.id === action.payload.id ? false : task.checked,
        })),
        lists: state.lists.map((list) => ({
          ...list,
          tasks: list.tasks.map((task) => ({
            ...task,
            checked: task.id === action.payload.id ? false : task.checked,
          })),
        })),
      };
    },
    ///// Walls
    ADD_WALL(state, action) {
      return {
        ...state,
        walls: [...state.walls, action.payload]

      }
    },
    DELETE_WALL(state, action) {
      return {
        ...state,
        walls: state.walls.filter(wall => wall.id !== action.payload.id)
      }
    },
    EDIT_WALL(state, action) {
      const update_wall = {
        title : action.payload.title,
        text : action.payload.text,
        color : action.payload.color,
        id : action.payload.id
      }
      return {
        ...state,
        walls: state.walls.map((wall) => {
         return  wall.id === action.payload.id ?  update_wall : wall;
        })
      }
    },
  },
});







export const { ADD_LIST, DELETE_LIST, ADD_TASK, ADD_SUB, CHANGE_TASK, DELETE_TASK, DELETE_SUBTASK, CHECKED_TASK, NEW_SUB_CHECKED, CANCEL_SUB, UNCHECKED_TASK, ADD_WALL, DELETE_WALL, EDIT_WALL } = listsSlice.actions;
export default listsSlice.reducer;
