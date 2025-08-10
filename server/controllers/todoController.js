const Todo =require( "../models/Todo.js");

// Create new todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const newTodo = new Todo({
      user: req.user.id,   // From auth middleware
      text,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while creating todo" });
  }
};

// Get all todos of the logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching todos" });
  }
};

// Optional: Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!todo) return res.status(404).json({ error: "Todo not found or not authorized" });

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while deleting todo" });
  }
};

// Inside controllers/todoController.js

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.text = req.body.text || todo.text;
    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating todo" });
  }
};


// Optional: Toggle completed
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while toggling todo" });
  }
};
