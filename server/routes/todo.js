const express =require ('express');
const { createTodo, getTodos, deleteTodo, toggleTodo,updateTodo  } =require('../controllers/todoController.js');
const protect =require( '../middleware/authMiddleware.js');

const router = express.Router();

// Protected routes
router.post('/', protect, createTodo);
router.get('/', protect, getTodos);
router.delete('/:id', protect, deleteTodo);
router.put('/:id', protect, updateTodo);        // Optional
router.put('/toggle/:id', protect, toggleTodo);    // Optional

module.exports = router;
