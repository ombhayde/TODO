"use client";

import { format } from 'date-fns';
import { FiEdit, FiTrash2, FiClock } from 'react-icons/fi';

const TodoItem = ({ todo, onClick, isActive, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the onClick of the parent div
    if (confirm("Are you sure you want to delete this todo?")) {
      onDelete(todo._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent triggering the onClick of the parent div
    onClick(todo._id); // This will open the todo for editing
  };

  // Function to truncate text with ellipsis if it's too long
  const truncate = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div 
      onClick={() => onClick(todo._id)}
      className={`p-4 mb-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isActive 
          ? 'bg-indigo-50 border-l-4 border-indigo-500 shadow-sm' 
          : 'bg-white border border-gray-200 hover:border-indigo-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className={`text-lg font-semibold mb-2 ${isActive ? 'text-indigo-700' : 'text-gray-800'}`}>
            {truncate(todo.title, 60)}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{todo.description}</p>
          <div className="flex items-center text-xs text-gray-500">
            <FiClock size={14} className="mr-1" />
            {format(new Date(todo.createdAt), 'MMM d, yyyy • h:mm a')}
          </div>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={handleEdit} 
            className="p-2 text-indigo-500 hover:bg-indigo-100 rounded-full transition duration-200"
            title="Edit Todo"
          >
            <FiEdit size={18} />
          </button>
          <button 
            onClick={handleDelete} 
            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition duration-200"
            title="Delete Todo"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;