import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Wall.scss'
import { ADD_WALL, DELETE_WALL, EDIT_WALL } from '../../store/reducers/listReducer';
import { useEffect } from 'react';


function Wall() {
    const walls = useSelector(state => state?.lists.walls)
    const dispatch = useDispatch()
    /// for add New Wall
    const [showModule, setShowModule] = useState(false)
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('')
    const [selectedWall, setSelectedWall] = useState(null)
    const colorOptions = ["#ff6b6b", "#da77f2", "#5c7cfa", "#8ce99a", "#ff922b", "#f15bb5", "#4bb5c1", "#d0a761", "#9dd8c8", "#ff6347", "#c1c1c1", "#b19cd9", "#f78fb3", "#6cd4ff", "#ffd700", "#ffb6c1", , "#6a0572", "#219ebc", "#f8edeb"];

    const AddWall = () => {
        if (title.trim() === 0 || title.length === 0 || color.trim() === 0 || color.length === 0) return null
        else {
            dispatch(ADD_WALL({ title: title, text: text, color: color, id: Math.floor(Math.random() * 1000000) }))
            CancelWall()
        }
    }
    const CancelWall = () => {
        setShowModule(false)
        setTitle('')
        setText('')
        setColor('')
    }
    const EditWall = () => {
        if(title.trim() === 0 ||  title.length === 0 || color.length === 0) return null;
        else {
            dispatch(EDIT_WALL({
                title:title,
                text:text,
                color:color,
                id:selectedWall.id,
            }))
            CancelWall();
            setSelectedWall(null)
        }
    }
    const DeleteWall = (id) => {
        dispatch(DELETE_WALL({ id: id }))
    }
    useEffect(() => {
        if (selectedWall) {
            setTitle(selectedWall.title);
            setText(selectedWall.text);
        } else {
            setTitle('')
            setText('')
            setColor('')
        }
    }, [selectedWall])

    return (
        <div className="Wall">
            <div className="Wall-container">
                <div className="Wall-logo">
                    <h1>Sticky Wall</h1>
                    <span>{walls.length}</span>
                </div>
                <div className="Wall-block">
                    <ul className='Wall-block-ul'>
                        {
                            walls.map((item) => (
                                <li key={item.id} style={{ backgroundColor: item.color }}>
                                    <div className='Wall-item'>
                                        <h2>{item.title}</h2>
                                        <div className='Wall-item-navi'>
                                            <button id='edit_wall' onClick={() => {setSelectedWall(item), setShowModule(true)}}><i className="fa-solid fa-pen"></i></button>
                                            <button id='del_wall' onClick={() => DeleteWall(item.id)}><i className="fa-solid fa-xmark"></i></button>
                                        </div>
                                    </div>
                                    <p>{item.text}</p>
                                </li>
                            ))
                        }
                        <li className="Wall-block-add" onClick={() => setShowModule(true)}>
                            <button>+</button>
                        </li>
                    </ul>
                </div>
                <div className="Wall-module" style={{ display: showModule ? 'block' : 'none' }}>
                    <div className="Wall-module-block">
                        <div className="Wall-module-inner">
                            <div className="Wall-module-inner-logo">
                                <p>Add New Wall</p>
                            </div>
                            <div className="Wall-module-inner-navi">
                                <div className="Wall-module-navi-title">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name='title' placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                                </div>
                                <div className="Wall-module-navi-text">
                                    <label htmlFor="title">Text</label>
                                    <textarea name="text" id="text_wall" cols="30" rows="10" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                                </div>
                                <div className="Wall-module-navi-color">
                                    <label htmlFor="title">Color</label>
                                    <div className="Color-options">
                                        {colorOptions.map((back, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    backgroundColor: back,
                                                    border: color === back ? '1px solid #000' : 'none',
                                                }}
                                                onClick={() => setColor(back)}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                                <div className="Wall-module-navi-btn">
                                    <button className="btn btn-outline-primary" onClick={() => CancelWall()}>{selectedWall === null ? "Cancel Wall" : "Cancel Edit"}</button>
                                    <button className="btn btn-outline-primary" onClick={() => selectedWall === null ? AddWall() : EditWall()}>{selectedWall === null ? "Add Wall" : "Save changes"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wall