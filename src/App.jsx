import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete, MdEdit } from "react-icons/md";
import './App.css'; // Import the CSS file

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);

  // Load todos from local storage on mount
  useEffect(() => {
    const exist = localStorage.getItem("todos");
    if (exist) {
      const storedTodos = JSON.parse(exist);
      settodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Focus input when editing
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [editingId]);

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    settodo(t.todo);
    setEditingId(id);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleDelete = (e, id) => {
    settodos(todos.filter(item => item.id !== id));
  };

  const handleClear = () => {
    settodos([]);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    settodos(todos =>
      todos.map(item =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const handleAddOrEdit = () => {
    if (todo.trim() === "") return;
    if (editingId) {
      settodos(todos =>
        todos.map(item =>
          item.id === editingId ? { ...item, todo } : item
        )
      );
      setEditingId(null);
    } else {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    settodo('');
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleAddOrEdit();
    }
  };

  return (
    <>
      <Navbar />
      <div className="todo-app-container">
        <div className="addtodo modern-card">
          <h2 className="section-title">Add a ToDo</h2>
          <div className="input-row">
            <input
              ref={inputRef}
              onChange={handleChange}
              type="text"
              className="todo-input"
              value={todo}
              onKeyDown={handleEnter}
              placeholder="What's next?"
            />
            <button
              onClick={handleAddOrEdit}
              className="primary-btn"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="todo-list-header">
          <h2 className="section-title">Your ToDo's</h2>
          <button className="secondary-btn" onClick={handleClear}>Clear All</button>
        </div>

        <div className="todos-list">
          {todos.length === 0 && <div className='no-todos'>No Todo's to Display</div>}
          {todos.map(item => (
            <div key={item.id} className={`todo-item modern-card animate-slide-in`}>
              <label className="checkbox-label">
                <input
                  name={item.id}
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <span className="custom-checkbox"></span>
              </label>
              <div className={`todo-text ${item.isCompleted ? "completed" : ""}`}>
                {item.todo}
              </div>
              <div className="action-btns">
                <button
                  onClick={(e) => { handleEdit(e, item.id) }}
                  className='icon-btn'
                  title="Edit"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={(e) => { handleDelete(e, item.id) }}
                  className='icon-btn'
                  title="Delete"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
