import React, { useState, useEffect } from "react";
import API from "../services/api"; // ✅ Your custom axios instance
import "./../styles/todo.css";

const TODO = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await API.get("/todos"); // ✅ Use API instead of axios
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      if (!text.trim()) return;

      if (editingId) {
        await API.put(`/todos/${editingId}`, { text });
      } else {
        await API.post("/todos", { text });
      }

      setText("");
      setEditingId(null);
      fetchTodos();
    } catch (err) {
      console.error("Error saving todo", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await API.put(`/todos/toggle/${id}`, { completed: !completed }); // ✅ /toggle endpoint
      fetchTodos();
    } catch (err) {
      console.error("Error toggling todo", err);
    }
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditingId(todo._id);
  };

  return (
    <div className="todo-container">
      <h2>📝 Your Daily TODO</h2>

      <div className="todo-input">
        <input
          type="text"
          value={text}
          placeholder="Enter your task..."
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? "done" : ""}>
              <span onClick={() => handleToggle(todo._id, todo.completed)}>
                {todo.text}
              </span>
              <div className="actions">
                <button onClick={() => handleEdit(todo)}>✏️</button>
                <button onClick={() => handleDelete(todo._id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TODO;
