import React, { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (todo) => {
    if (todo.trim() === "") {
      return; // Do nothing if the input is empty
    }

    const newTodo = {
      id: Math.random().toString(),
      todo: todo,
      completed: false,
    };

    const updatedList = [...list, newTodo];
    setList(sortList(updatedList));
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(input);
    }
  };

  const toggleComplete = (id) => {
    const updatedList = list.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setList(sortList(updatedList));
  };

  const deleteTodo = (id) => {
    const updatedList = list.filter(item => item.id !== id);
    setList(sortList(updatedList));
  };

  const sortList = (list) => {
    return list.sort((a, b) => a.completed - b.completed);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1 className="app-title">Todo List</h1>
        <div className="input-container">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task..."
          />
          <button onClick={() => addTodo(input)}>Add</button>
        </div>
        {/* Render list-container only if there are items in the list */}
        {list.length > 0 && (
          <div className="list-container">
            <ul>
              {list.map((item) => (
                <li 
                  key={item.id} 
                  className={`todo-item ${item.completed ? 'completed' : ''}`}
                  onClick={() => toggleComplete(item.id)}
                >
                  <input 
                    type="checkbox" 
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                    className="todo-checkbox"
                  />
                  <span
                    style={{ 
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'grey' : 'black',
                      flex: 1
                    }}
                  >
                    {item.todo}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from toggling the completion
                      deleteTodo(item.id);
                    }}
                    className="delete-button"
                  >
                    &times; {/* Unicode multiplication symbol for the delete button */}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
