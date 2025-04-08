"use client";

import { useState, useEffect } from 'react';
import { getTodo, updateTodo, deleteTodo } from '../services/api';
import { format } from 'date-fns';
import { FiTrash2, FiSave, FiAlertCircle } from 'react-icons/fi';

const TodoDetail = ({ todoId, onUpdate, onDelete }) => {
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (todoId) {
      fetchTodoDetail();
    } else {
      setTodo(null);
      setTitle('');
      setDescription('');
    }
  }, [todoId]);

  const fetchTodoDetail = async () => {
    try {
      setLoading(true);
      const data = await getTodo(todoId);
      setTodo(data);
      setTitle(data.title);
      setDescription(data.description);
    } catch (error) {
      console.error('Error fetching todo detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      setSaving(true);
      await updateTodo(todoId, { title, description });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!todoId) return;
    
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(todoId);
        if (onDelete) onDelete(todoId);
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo. Please try again.');
      }
    }
  };

  if (!todoId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-gray-400 mb-3">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <p className="text-gray-700 text-lg font-medium">Select a todo to view details</p>
        <p className="text-gray-500 mt-2">Click on any todo from the list</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center space-x-3">
          <svg className="animate-spin h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-700 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="h-full flex items-center justify-center bg-red-50 rounded-lg border border-red-200 p-8">
        <div className="flex items-center text-red-600">
          <FiAlertCircle size={24} className="mr-2" />
          <p className="font-medium">Todo not found or was deleted</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h2 className="text-xl font-bold text-black">Todo Details</h2>
        <div className="flex items-center">
          <p className="text-sm text-gray-500 mr-4">
            Created: {format(new Date(todo.createdAt), 'MMM d, yyyy')}
          </p>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition duration-200"
            title="Delete Todo"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
        />
      </div>

      <div className="flex items-center justify-between">
        {saving ? (
          <p className="text-sm text-gray-700 flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving changes...
          </p>
        ) : saveSuccess ? (
          <p className="text-sm text-green-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Changes saved successfully!
          </p>
        ) : (
          <div></div>
        )}
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-lg shadow-sm flex items-center transition duration-200"
        >
          <FiSave size={18} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default TodoDetail;