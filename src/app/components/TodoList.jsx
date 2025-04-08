"use client";

import { useState, useEffect } from 'react';
import { getTodos, deleteTodo } from '../services/api';
import TodoItem from './TodoItem';
import { FiRefreshCw, FiList, FiAlertCircle } from 'react-icons/fi';

const TodoList = ({ onTodoSelect, selectedTodoId, onRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos(page);
      setTodos(data.todos);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      // If the deleted todo was selected, clear the selection
      if (selectedTodoId === todoId) {
        onTodoSelect(null);
      }
      // Refresh the todo list
      fetchTodos();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const handleRefresh = () => {
    fetchTodos();
    if (onRefresh) onRefresh();
  };

  return (
    <div className="w-full bg-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-300">
        <div className="flex items-center">
          <FiList size={20} className="text-gray-800 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">My Todos</h2>
        </div>
        <button 
          onClick={handleRefresh}
          className="p-2 text-gray-700 hover:bg-gray-300 rounded-full transition duration-200"
          title="Refresh List"
        >
          <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 bg-white rounded-lg border border-gray-300">
          <div className="flex flex-col items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-gray-700 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-700 font-medium">Loading your todos...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-8 bg-gray-100 rounded-lg border border-gray-300">
          <div className="flex flex-col items-center justify-center">
            <FiAlertCircle size={32} className="text-gray-800 mb-3" />
            <p className="text-gray-800 font-medium mb-2">{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 flex items-center"
            >
              <FiRefreshCw size={16} className="mr-2" />
              Try Again
            </button>
          </div>
        </div>
      ) : todos.length > 0 ? (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem 
              key={todo._id} 
              todo={todo} 
              onClick={onTodoSelect}
              onDelete={handleDelete}
              isActive={selectedTodoId === todo._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg border border-gray-300">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p className="text-gray-700 font-medium mb-2">No todos found</p>
            <p className="text-gray-500 text-sm">Create your first todo to get started</p>
          </div>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button 
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium ${
                page === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === pageNum
                    ? 'z-10 bg-gray-800 border-gray-800 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TodoList;