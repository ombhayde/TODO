const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;