const Todo = require('../models/todoModel');

// Get todos with pagination
const getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTodos = await Todo.countDocuments();
    const totalPages = Math.ceil(totalTodos / limit);

    res.json({
      todos,
      currentPage: page,
      totalPages,
      totalTodos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const todo = await Todo.create({
      title,
      description,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single todo
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    
    const updatedTodo = await todo.save();
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    await todo.deleteOne();
    
    res.json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};